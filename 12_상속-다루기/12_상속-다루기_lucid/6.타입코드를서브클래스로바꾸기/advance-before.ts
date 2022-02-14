/**
 *   간접 상속
 *    아르바이트와 정직원 > 직접 상속 방식 타입 코드 문제 대처할수 없음. 직원 유형 변경 기능 유지하고싶음.
 * */
class Employee {
  _type: 'engineer' | 'manager' | 'salesperson';
  private _name: string;

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
  get type() { return this._type }
  set type(arg){ this._type = arg }

  get capitalizedType(){
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toUpperCase()
  }
  
  toString() {
    return `${this._name} (${this.capitalizedType})`
  }
}

