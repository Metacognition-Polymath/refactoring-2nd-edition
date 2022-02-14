/**
 *   간접 상속
 *    아르바이트와 정직원 > 직접 상속 방식 타입 코드 문제 대처할수 없음. 직원 유형 변경 기능 유지하고싶음.
 * */
class Employee {
  _type: 'engineer' | 'manager' | 'salesperson';
  private readonly _name: string;

  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(type) {
    if (['engineer', 'manager', 'salesperson'].indexOf(type) === -1) {
      return new Error(`${this._type}라는 직원 유형은 없습니다.`)
    }
  }

  get typeString() {
    return this._type.toString()
  }

  get type() {
    return this._type
  }

  set type(arg) {
    this._type = Employee.createEmployeeType(arg).toString() /** toString() 으로 같은 같들을 반환한다 */
  }

  /** 바로 앞 예시와 같은 방식으로 직원 유형을 차분히 리팩터링해보자 */
  static createEmployeeType(aString) {
    switch (aString) {
      case 'engineer':
        return new Engineer(aString);
      case 'manager':
        return new Manager(aString);
      case 'salesperson':
        return new SalesePerson(aString);
    }
  }

  get capitalizedType() {
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toUpperCase()
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`
  }
}

/**
 *  할 일은 타입 코드를 객체로 바꾸긱다(기본형을 객체로 바꾸기)
 * */
class EmployeeType {
  /** 지워도 문제없지만. 낫두는걸 선호하고 공통적인 메소드 뽑는걸 선호한다고한다 */
  private readonly _value: any;

  constructor(aString) {
    this._value = aString;
  }

  toString() {
    return this._value;
  }

  get capitalizedName() {
    return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toUpperCase()
  }
}

class Engineer extends EmployeeType {
  toString(): any {
    return 'Engineer'
  }
}

class Manager extends EmployeeType {
  toString(): any {
    return 'manager'
  }
}

class SalesePerson extends EmployeeType {
  toString(): any {
    return 'salesPerson'
  }
}