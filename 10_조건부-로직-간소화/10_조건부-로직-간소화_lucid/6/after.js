
class Customer {
	constructor(aDiscountRate) {
		console.assert(aDiscountRate === null || aDiscountRate >= 0 , `discount Rate 는 ${this.discountRate} 가 아닌 양수이어야야합니다`);
		
		this.discountRate = aDiscountRate;
	}
	
	applyDiscount(aNumber) {
		if (!this.discountRate) {
			return aNumber;
		}
		console.assert(this.discountRate >= 0 , `discount Rate 는 ${this.discountRate} 가 아닌 양수이어야야합니다`);
		return (this.discountRate) ? aNumber - (this.discountRate * aNumber) : aNumber;
	}
}

const customer = new Customer(-5);

const discountValue = customer.applyDiscount(-2)
console.log(discountValue)