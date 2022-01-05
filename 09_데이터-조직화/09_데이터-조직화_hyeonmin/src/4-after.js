class TelephoneNumber {
	constructor(areaCode, number) {
		this._areaCode = areaCode;
		this._number = number;
	}
  get areaCode() {
    return this._areaCode
  }
  get number() {
    return this._number
  }

	equals(other) {
		if (!(other instanceof TelephoneNumber)) return false;
		return this.areaCode === other.areaCode && this.number === other.number;
	}
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber()
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode
  }
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
  get officeNumber() {
    return this._telephoneNumber.number
  }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

const p = new Person();
p.officeAreaCode = '031';
p.officeNumber = '123-4321';
console.log(p.officeAreaCode, p.officeNumber)