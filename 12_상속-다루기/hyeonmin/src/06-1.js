/**
 * - 직원들의 유형을 타입 필드로 다루는 클래스를 리팩터링 하는 예제
 *
 * 1. 타입 코드 변수를 자가 캡슐화한다.
 * 2. 타입 코드 중 하나를 선택하여 서브클래싱한다.
 * 3. 생성자를 팩터리 함수로 바꿔서 선택 로직을 담을 별도 장소를 마련한다.
 * 4. 새로 만든 서브클래스를 사용하기 위한 선택 로직을 팩터리에 추가
 * 5. 테스트 후, 남은 유형들에게 같은 작업을 반복한다.
 * 6. 모든 유형에 적용했다면, 타입 코드 필드와 슈퍼클래스의 게터를 제거한다.
 * 7. 테스트 후 검증 로직도 제거한다. switch문이 사실상 똑같은 검증을 수행해주기 때문.
 */

class Employee {
	#name;
	constructor(name) {
		this.#name = name;
	}
	get name() {
		return this.#name;
	}
  toString() {
    return `${this.#name} is a `
  }
}

class Engineer extends Employee {
	toString() {
		return `${super.toString()}engineer`;
	}
}
class Manager extends Employee {
	toString() {
		return `${super.toString()}manager`;
	}
}
class Salesperson extends Employee {
	toString() {
		return `${super.toString()}salesperson`;
	}
}

function createEmployee(name, type) {
	switch (type) {
		case "engineer": return new Engineer(name);
		case "manager": return new Manager(name);
		case "salesperson": return new Salesperson(name);
		default: throw new Error(`${arg}라는 직원 유형은 없습니다.`);
	}
}

const roy = createEmployee("roy", "engineer");
const jay = createEmployee("jay", "manager");
const kay = createEmployee("kay", "salesperson");
// const tei = createEmployee("tei", "nobody");

console.log(roy.toString());
console.log(jay.toString());
console.log(kay.toString());