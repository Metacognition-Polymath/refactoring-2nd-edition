/**
 * 7.7 위임 숨기기에서 위임 메서드를 없애면 됨.
 */

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }

  set department(arg) {
    this._department = arg;
  }
}

class Departement {
  constructor() {}
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    return (this._manager = arg);
  }
}

const aPerson = new Person();
const manager = aPerson.department.manager;
