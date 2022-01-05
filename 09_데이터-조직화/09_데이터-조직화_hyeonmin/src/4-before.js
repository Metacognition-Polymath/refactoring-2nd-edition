class TelephoneNumber {
	constructor() {
		this._areaCode
		this._number
	}
  get areaCode() {
    return this._areaCode
  }
  set areaCode(arg) {
    this._areaCode = arg
  }
  get number() {
    return this._number
  }
  set number(arg) {
    this._number = arg
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
    this._telephoneNumber.areaCode = arg
  }
  get officeNumber() {
    return this._telephoneNumber.number
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg
  }
}

const p = new Person()
p.officeAreaCode = '312'
p.officeNumber = '555-0142'
console.log(p.officeAreaCode, p.officeNumber)