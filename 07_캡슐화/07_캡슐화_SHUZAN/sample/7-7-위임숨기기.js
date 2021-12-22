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
  //위임 메소드를 통해서 의존성을 줄인다.
  get manager() {
    return this._department.manager;
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
/**
 * 기존 읽기 코드에서 접근자 제거
 */
//const manager = aPerson.department.manager;

const manager = aPerson.manager;
