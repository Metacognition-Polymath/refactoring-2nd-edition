/*
- 다른 리팩터링을 수행한 뒤 특정 매개변수가 더는 필요 없어졌을 때가 있는데, 바로 이번 리팩터링을 적용하는 가장 흔한 사례.
- 함수 간소화를 위해, 임시 변수를 질의 함수로 바꾸기 적용
- 매개변수를 참조하는 코드를 모두 함수 호출로 변경
- 함수 선언 바꾸기로 매개변수 제거
*/

class Order {
	quantity;
	itemPrice;
	constructor() {}

	get finalPrice() {
		const basePrice = this.quantity * this.itemPrice;
		return this.discountedPrice(basePrice);
	}

	get discountLevel() {
		return (this.quantity > 100) ? 2 : 1;
	}

	discountedPrice(basePrice) {
		switch (this.discountLevel) {
			case 1:
				return basePrice * 0.95;
			case 2:
				return basePrice * 0.9;
			default:
				return basePrice;
		}
	}
}
