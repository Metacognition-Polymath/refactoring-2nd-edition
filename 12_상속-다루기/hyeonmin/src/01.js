/*
- 두 서브클래스에서 같은 일을 수행하는 메서드가 존재하는 상황

1. 똑같은 동작을 하는 메서드인지 체크
2. 참조 필드 확인 및 슈퍼클래스에서도 호출, 참조가 가능한지 체크
3. 두 메서드의 시그니처를 통일해준다. (함수 선언 바꾸기)
4. 서브클래스 중 하나의 메서드를 복사해 슈퍼클래스에 붙여넣는다.
5. 서브클래스의 해당 메서드를 삭제하고 테스트한다.
*/

class SubclassResponsibilityError extends Error {}
class Party {
  get monthlyCost() {
		throw new SubclassResponsibilityError();
	}

  get annualCost() {
    return this.monthlyCost * 12
  }
}

class Employee extends Party {
	get monthlyCost() {
		return 10
	}
}
class Department extends Party {
	get monthlyCost() {
		return 20
	}
}

const e = new Employee()
const d = new Department()
console.log(e.annualCost, d.annualCost)