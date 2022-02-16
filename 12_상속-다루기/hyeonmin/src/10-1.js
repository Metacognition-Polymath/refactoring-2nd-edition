/**
 * - 공연 예약 클래스: Booking
 * - 추가 비용을 다양하게 설정할 수 있는 프리미엄 예약용 서브클래스(PremiumBooking)
 * - 상속을 사용해야 할 다른 이유가 생긴다면, 프리미엄 예약을 상속이 아닌 다른 방식으로 표현해야 한다.
 * - 또한, 기본 예약에서 프리미엄 예약으로 동적 전환이 필요한 경우가 발생할 수도 있다.
 * - 이러한 상황을 맞딱뜨렸다고 가정하고, 서브클래스를 위임으로 바꾸는 리팩터링을 진행해보도록 하자.
 *
 * 1.
 *
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
		return this.show.hasOwnProperty("talkback") && !this.isPeakDay;
	}
	get basePrice() {
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
}

class PremiumBooking extends Booking {
	#extras;
	constructor(show, date, extras) {
		super(show, date);
		this.#extras = extras;
	}
	get hasTalkback() {
		return this.show.hasOwnProperty("talkback");
	}
	get basePrice() {
		return Math.round(super.basePrice + this.#extras.premiumFee);
	}
	get hasDinner() {
		return this.#extras.hasOwnProperty("dinner") && !this.isPeakDay;
	}
}

const booking = new Booking(
	{ price: 100, talkback: true },
	dayjs("2021-07-11")
);
const premiumBooking1 = new PremiumBooking(
	{ price: 100, talkback: true },
	dayjs("2021-07-13"),
	{
		dinner: true,
		premiumFee: 10,
	}
);
const premiumBooking2 = new PremiumBooking(
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
