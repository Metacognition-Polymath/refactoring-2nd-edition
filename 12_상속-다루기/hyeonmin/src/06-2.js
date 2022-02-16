/**
 * - 이전 예시에서 간접 상속하는 경우.
 * => 이번에는 직원의 서브클래스로 '아르바이트'와 '정직원'이라는 클래스가 이미 있어서 Employee를 직접 상속하는 방식으로는 타입 코드 문제에 대처할 수 없다고 해보자.
 *
 * 1. 타입 코드를 객체로 바꾸기
 * 2. 앞선 예시와 같은 방식으로 직원 유형을 차분히 리팩터링.
 */

class EmployeeType {
	get capitalizedType() {
		return (
			this.toString().charAt(0).toUpperCase() +
			this.toString().slice(1).toLowerCase()
		);
	}
}
class Engineer extends EmployeeType {
	toString() {
		return `engineer`;
	}
}
class Manager extends EmployeeType {
	toString() {
		return `manager`;
	}
}
class Salesperson extends EmployeeType {
	toString() {
		return `salesperson`;
	}
}

class Employee {
	#name;
	#type;
	constructor(name, type) {
		this.#name = name;
		this.type = type;
	}

	get type() {
		return this.#type;
	}
	set type(arg) {
		this.#type = Employee.createEmployeeType(arg);
	}
	static createEmployeeType(aString) {
		switch (aString) {
			case "engineer":
				return new Engineer();
			case "manager":
				return new Manager();
			case "salesperson":
				return new Salesperson();
			default:
				throw new Error(`${aString}라는 직원 유형은 없습니다.`);
		}
	}
	toString() {
		return `${this.#name} is a ${this.type.capitalizedType}`;
	}
}

console.log(new Employee("roy", "engineer").toString());
console.log(new Employee("jay", "manager").toString());
console.log(new Employee("kay", "salesperson").toString());
// console.log(new Employee("tei", "nobody").toString());
