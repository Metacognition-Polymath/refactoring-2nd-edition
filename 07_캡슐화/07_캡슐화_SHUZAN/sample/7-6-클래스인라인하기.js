//인라인하기 전 (Before Refactor)
{
  export class Person {
    constructor() {
      this._telephoneNumber = new TelephoneNumber(areaCode, number);
    }
    get officeAreaCode() {
      return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
      this._telephoneNumber.areaCode = arg;
    }
    get officeNumber() {
      return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
      this._telephoneNumber.number = arg;
    }
  }

  class TelephoneNumber {
    constructor() {}

    get officeAreaCode() {
      return this._officeAreaCode;
    }
    set officeAreaCode(arg) {
      this._officeAreaCode = arg;
    }
  }
}

//인라인 후 (After Refactor)
{
  export class Person {
    constructor() {
      this._telephoneNumber = new TelephoneNumber(areaCode, number);
    }
    get officeAreaCode() {
      return this._officeAreaCode;
    }
    set officeAreaCode(arg) {
      this._officeAreaCode = arg;
    }
    get officeNumber() {
      return this._officeNumber;
    }
    set officeNumber(arg) {
      this._officeNumber = arg;
    }
  }
}
