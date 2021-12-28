class CustomerContract {
	constructor(startDate, discountRate) {
		this._startDate = startDate;
		this._discoiuntRate = discountRate;
	}
	
	get discountRate() { return this._discoiuntRate }
	set discountRate(arg) { return this._discoiuntRate = arg }
}

// 1.  가장 먼저 할 일은 이 필드를 캡슐화하는 것이다
class Customer {
	constructor(name, discountRate) {
		this._name = name;
		this._contract = new CustomerContract(dateToday(), this.discountRate)
		//  힐인율을 수정하는 세터를 만들고 싶지 않아. 세터 속성이 아니라 메서드를 만들었다
		this._setDiscountRate = discountRate;
	}
	// 자바스크립를 사용하고 잇어서 소스 필드를 미리 선언할 필요는 없었다.
	get discountRate() { return this._contract.discountRate; }
	_setDiscountRate(aNumber) { this._contract.discountRate = aNumber; } // 캡슐화
	
	becomePreferred(){
		this._setDiscountRate(this._contract.discountRate + 0.03);
		// 남은일들
	}
	applyDiscount(amount){
		return amount.subtract(amount.multiply(this.discountRate));
	}
}