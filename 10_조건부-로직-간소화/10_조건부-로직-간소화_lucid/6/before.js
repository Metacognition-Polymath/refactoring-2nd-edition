
// 양수라는 가정이 잇으니 코드에는 문제 없다
class Customer {
	constructor() {
		this.discountRate = null;
	}
	applyDiscount(aNumber){
		return (this.discountRate) ? aNumber - (this.discountRate * aNumber) : aNumber;
	}
}