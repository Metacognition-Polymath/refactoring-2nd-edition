/**
 * - 공통된 기능을 사용하는 두 클래스에 대한 예제.
 * - 연간 비용과 월간 비용이라는 개념, 그리고 이름이 공통됨을 확인.
 * - 두 클래스로부터 슈퍼클래스를 추출하면 이 공통된 동작들을 더 명확하게 드러낼 수 있다.
 *
 * 1. 빈 슈퍼클래스를 만들고, 두 클래스가 이를 확장하도록 한다.
 * 2. 생성자 본문 올리기, 메서드 올리기, 필드 올리기를 차례로 적용
 * 3. 공통된 모든 동작들에 대해 일괄적으로 적용
 */

class Party {
	constructor(name) {
		this._name = name;
	}
	get name() {
		return this._name;
	}

	get annualCost() {
		return this.monthlyCost * 12;
	}
}
class Employee extends Party {
	#id;
	#monthlyCost;
	constructor(name, id, monthlyCost) {
		super(name);
		this.#id = id;
		this.#monthlyCost = monthlyCost;
	}
	get monthlyCost() {
		return this.#monthlyCost;
	}
	get id() {
		return this.#id;
	}
}

class Department extends Party {
	#staff;
	constructor(name, staff) {
		super(name);
		this.#staff = staff;
	}
	get staff() {
		return this.#staff;
	}
	get monthlyCost() {
		return this.#staff
			.map((e) => e.monthlyCost)
			.reduce((sum, cost) => sum + cost, 0);
	}
	get headCount() {
		return this.staff.length;
	}
}

const roy = new Employee("Roy", "123", 100);
const jay = new Employee("Jay", "456", 200);
const sales = new Department("Sales", [roy, jay]);

console.log(roy.annualCost);
console.log(jay.annualCost);
console.log(sales.annualCost);
