class CustomerContract {
	constructor(startDate) {
		this._startDate = startDate;
	}
}

class Customer {
	constructor(name, discountRate) {
		this._name = name;
		this._discountRate = discountRate;
		this._contract = new CustomerContract(dateToday())
	}
	get discountRate() { return this._discountRate; }
	becomePreferred(){
		this._discountRate += 0.03;
		// 남은일들
	}
	applyDiscount(amount){
		return amount.subtract(amount.multiply(this._discountRate));
	}
}