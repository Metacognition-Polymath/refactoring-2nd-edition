const assert = require("assert");

class Account {
	constructor(number, type, interestRate) {
		this._number = number;
		this._type = type;
		assert(interestRate === this._type.interestRate);
		this._interestRate = interestRate;
	}
	
	get interRate() { return this._interestRate; }
}

class AccountType {
	constructor(nameString, type) {
		this._name = nameString;
		this._type = type;
	}
	get interestRate(){ return this._type._interestRate }
}
// 이자율을 공유를 해야한다