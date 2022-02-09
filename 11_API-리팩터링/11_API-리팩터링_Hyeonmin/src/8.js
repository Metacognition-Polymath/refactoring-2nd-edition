/*
- 직원의 유형을 다루는 예제

1. 팩터리 함수 만들기
2. 생성자를 호출하는 곳을 팩터리 함수로 교체
3. 함수에 문자열 리터럴을 전달하는 악취 제거
*/

class Employee {
  #name
  #typeCode
  constructor(name, typeCode) {
    this.#name = name
    this.#typeCode = typeCode
  }
  get name() {
    return this.#name
  }
  get type() {
    return this.#typeCode
  }
  static get legalTypeCodes() {
    return {
      E: 'Engineer',
      M: 'Manager',
      S: 'Salesperson',
    }
  }
}

function createEmployee(name, typeCode) {
	return new Employee(name, typeCode);
}

function createEngineer(name) {
	return new Employee(name, 'E');
}

const client1 = () => {
  const document = { name: '재남', empType: 'M', leadEngineer: '로이' }
  const candidate = createEmployee(document.name, document.empType)
  const leadEngineer = createEngineer(document.leadEngineer)
  return { candidate: candidate.name, leadEngineer: leadEngineer.name }
}

console.log(client1())