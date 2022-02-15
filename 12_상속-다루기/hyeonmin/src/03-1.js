/**
 * 1. 공통 코드 찾기 (this.#name = name)
 * 2. 생성자 메서드에서의 대입문을 super() 호출 바래 아래로 옮긴다.
 * 3. 공통 코드를 슈퍼클래스로 옮기고, 슈퍼클래스 생성자에 매개변수로 건넨다.
 * 4. 테스트한다.
 */

class Party {
	#name
	constructor(name) {
		this.#name = name;
	}

  get name() {
    return this.#name
  }
}

export class Employee extends Party {
  #id
  #monthlyCost
  constructor(name, id, monthlyCost) {
    super(name);
    this.#id = id
    this.#monthlyCost = monthlyCost
  }
  get monthlyCost() {
    return this.#monthlyCost
  }
}

export class Department extends Party {
  #staff
  constructor(name, staff) {
    super(name)
    this.#staff = staff
  }
  get staff() {
    return this.#staff
  }
}

const d = new Department('dennie', 'good');
console.log(d.name, d.staff);