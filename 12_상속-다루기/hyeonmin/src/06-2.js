/**
 * - 이전 예시에서 간접 상속하는 경우.
 * => 이번에는 직원의 서브클래스로 '아르바이트'와 '정직원'이라는 클래스가 이미 있어서 Employee를 직접 상속하는 방식으로는 타입 코드 문제에 대처할 수 없다고 해보자.
 */

class Employee {
  #name
  #type
  constructor(name, type) {
    this.validateType(type)
    this.#name = name
    this.#type = type
  }
  validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) throw new Error(`${arg}라는 직원 유형은 없습니다.`)
  }
  get type() {
    return this.#type
  }
  set type(arg) {
    this.#type = arg
  }
  get capitalizedType() {
    return this.#type.charAt(0).toUpperCase() + this.#type.slice(1).toLowerCase()
  }
  toString() {
    return `${this.#name} is a ${this.capitalizedType}`
  }
}

console.log(new Employee('roy', 'engineer').toString())
console.log(new Employee('jay', 'manager').toString())
console.log(new Employee('kay', 'salesperson').toString())
console.log(new Employee('tei', 'nobody').toString())