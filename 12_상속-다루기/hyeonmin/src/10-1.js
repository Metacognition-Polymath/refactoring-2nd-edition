/**
 * - 공연 예약 클래스: Booking
 * - 추가 비용을 다양하게 설정할 수 있는 프리미엄 예약용 서브클래스(PremiumBooking)
 * - 상속을 사용해야 할 다른 이유가 생긴다면, 프리미엄 예약을 상속이 아닌 다른 방식으로 표현해야 한다.
 * - 또한, 기본 예약에서 프리미엄 예약으로 동적 전환이 필요한 경우가 발생할 수도 있다.
 * - 이러한 상황을 맞딱뜨렸다고 가정하고, 서브클래스를 위임으로 바꾸는 리팩터링을 진행해보도록 하자.
 *
 * 1. 생성자를 팩터리 함수로 바꿔서 생성자 호출 부분을 캡슐화한다.
 * 2. 위임 클래스를 새로 만든다. 위임 클래스의 생성자는 서브클래스가 사용하던 매개변수와 예약 객체로의 역참조를 매개변수로 받는다.
 * 3. 새로운 위임을 예약 객체와 연결한다. 프리미엄 예약을 생성하는 팩터리 함수를 수정하면 된다.
 * 4. 구조가 갖춰졌으니 기능을 옮길 차례. 가장 먼저 고민할 부분은 hasTalkback()의 오버라이드 메서드.
 * 5. 함수 옮기기를 적용해 서브클래스의 메서드를 위임으로 옮긴다. 슈퍼클래스의 데이터를 사용하는 부분은 모두 _host를 통하도록 고친다.
 * 6. 모든 기능이 잘 동작하는지 테스트한 후 서브클래스의 메서드를 삭제한다.
 * 7. 위임이 존재하면 위임을 사용하는 분배 로직을 슈퍼클래스 메서드에 추가한다.
 * 8. 서브클래스에만 존재하는 메서드에 대한 처리를 한다.
 * 9. 서브클래스의 동작을 모두 옮겼다면 팩터리 메서드가 슈퍼클래스를 반환하도록 수정한다.
 * 10. 그리고 모든 기능이 잘 동작하는지 테스트한 다음 서브클래스를 삭제한다.
 *
 * 이 리팩터링 그 자체만으로는 코드를 개선한다고 느껴지지 않는다.
 * 위임을 적용하면 분배 로직과 양방향 참조가 더해지는 등 복잡도가 높아지기 때문이다.
 * 그래도 동적으로 프리미엄 예약으로 바꿀 수 있다는 장점이 생겼고, 상속은 다른 목적으로 사용할 수 있게 되었다.
 * 이 장점이 상속을 없애는 단점보다 클 수 있다.
 *
 * "객체 컴포지션이나 클래스 상속 어느 하나만 고집하지 말고 적절히 혼용하라!"
 */

const dayjs = require("dayjs");

class Booking {
	#show;
	#date;
	constructor(show, date) {
		this.#show = show;
		this.#date = date;
	}
	get date() {
		return this.#date;
	}
	get show() {
		return this.#show;
	}
	get hasTalkback() {
		return this._premiumDelegate
			? this._premiumDelegate.hasTalkback
			: this.show.hasOwnProperty("talkback") && !this.isPeakDay;
	}
	get basePrice() {
		let result = this.show.price;
		if (this.isPeakDay) result += Math.round(result * 0.15);
		return (this._premiumDelegate)
			? this._premiumDelegate.extendBasePrice(result)
			: result;
	}
	get _privateBasePrice() {
		let result = this.show.price;
		if (this.isPeakDay) result += Math.round(result * 0.15);
		return result;
	}
	get isPeakDay() {
		return (
			this.date.isAfter(dayjs("2021-07-15")) &&
			this.date.isBefore(dayjs("2021-07-31"))
		);
	}
	get hasDinner() {
		return (this._premiumDelegate)
		? this._premiumDelegate.hasDinner
		: undefined; // 이럴 때는 에러를 던지는 것이 좋다. (언어 특성 상 undefined 반환)
	}
	_bePremium(extras) {
		this._premiumDelegate = new PremiumBookingDelegate(this, extras);
	}
}

class PremiumBookingDelegate {
	constructor(hostBooking, extras) {
		this._host = hostBooking;
		this._extras = extras;
	}
	get hasTalkback() {
		return this._host.show.hasOwnProperty("talkback");
	}
	get basePrice() {
		return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
	}
	extendBasePrice(base) {
		return Math.round(base + this._extras.premiumFee);
	}
	get hasDinner() {
		return this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay;
	}
}

function createBooking(show, date) {
	return new Booking(show, date);
}

function createPreminumBooking(show, date, extras) {
	const result = new Booking(show, date, extras);
	result._bePremium(extras);
	return result;
}

const booking = createBooking(
	{ price: 100, talkback: true },
	dayjs("2021-07-11")
);
const premiumBooking1 = createPreminumBooking(
	{ price: 100, talkback: true },
	dayjs("2021-07-13"),
	{
		dinner: true,
		premiumFee: 10,
	}
);
const premiumBooking2 = createPreminumBooking(
	{ price: 100 },
	dayjs("2021-07-17"),
	{
		dinner: true,
		premiumFee: 10,
	}
);
console.log({
	price: booking.basePrice,
	dinner: booking.hasDinner,
	talkback: booking.hasTalkback,
	peakDay: booking.isPeakDay,
});
console.log({
	price: premiumBooking1.basePrice,
	dinner: premiumBooking1.hasDinner,
	talkback: premiumBooking1.hasTalkback,
	peakDay: premiumBooking1.isPeakDay,
});
console.log({
	price: premiumBooking2.basePrice,
	dinner: premiumBooking2.hasDinner,
	talkback: premiumBooking2.hasTalkback,
	peakDay: premiumBooking2.isPeakDay,
});
