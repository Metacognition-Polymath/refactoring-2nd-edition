# 11. API 리팩터링

- API : 모듈 또는 함수의 연결부
- 좋은 API : 데이터를 갱신 / 조회 -> 명확히 구분
  - 섞여 있다면 => 질의 함수와 변경 함수 분리하기(11.1)
- 값 하나 때문에 여러개로 나뉜 함수들 : 함수 매개변수화 하기(11.2)
- 어떤 매개변수가 함수의 동작 모드를 전환 용도로만 쓰인다면 -> 플래그 인수 제거하기(11.3)
- 데이터 구조가 함수 사이를 건너 다니면서 필요 이상으로 분해될 때 -> 객체 통째로 넘기기(11.4)
- 매개변수로 건네 피호출 함수가 판단할지 아니면 호출함수가 직접 정할지 - 진리는 없음
  - 매개변수를 질의 함수로 바꾸기(11.5)
  - 질의 함수를 매개변수로 바꾸기(11.6)

#### 클래스

- 가급적 불변이길 원하므로
  - 세터 제거하기(11.7)
- 호출자에 새로운 객체를 만들어 반환하려 할 때, 생성자의 능력만으로 부족할 때
  - 생성자를 팩터리 함수로 바꾸기(11.8)

#### 수 많은 데이터를 받는 복잡한 함수를 잘게 쪼개는 문제

- 함수를 명령으로 바꾸기(11.9)
  -> 함수를 객체로 변환
  -> 함수의 본문에서 함수를 추출하기가 수월해짐
  -> 함수를 단순화하여 명령 객체가 더 이상 필요 없어진다면 => 명령을 함수로 바꾸기(11.10) : 함수로 되돌릴 수 있음

## 11.1 질의 함수와 변경 함수 분리하기

### 11.1.1 질의 함수와 변경 함수 분리하기 - 개요

```js
// before
function getTotalOutstandingAndSendBill() {
  const result = customer.invoice.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}

// after
function totalOutstanding() {
  return customer.invoice.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

### 11.1.2 질의 함수와 변경 함수 분리하기 - 배경

- 외부에서 관찰할 수 있는 겉보기 부수효과(observable side effect)가 전혀 없이 값을 반환해주는 함수를 추구해야한다.
- 겉보기 부수효과가 있는 함수와 없는 함수는 명확히 구분하는 것이 좋다.
  - '질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다'는 규칙을 따르는 것
    - 명령-질의 분리(command-query-separation)
- 값을 반환하면서 부수효과도 있는 함수 발견 -> `상태를 변경하는 부분`과 `질의 하는 부분`을 분리
- 겉보기 부수효과의 이해를 돕기 위한 예 : 캐싱
  - 객체의 상태를 변경하지만 밖에서 관찰할 수 없음
- 겉보기 부수효과 없이 어떤 순서로 호출하든 모든 호출에 항상 똑같은 값을 반환하게 해야한다.

### 11.1.3 질의 함수와 변경 함수 분리하기 - 절차

1. 대상 함수를 복제하고 질의(읽기) 목적에 충실한 이름을 짓는다.

- 함수 내부를 살펴 무엇을 반환하는지 찾는다.
- 어떤 변수의 값을 반환한다면 그 변수 이름이 훌륭한 단초가 될 것이다.

2. 새 질의 함수에서 부수효고를 모두 제거한다.
3. 정적 검사를 수행한다.
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다.
   호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고,
   원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다.
   하나 수정할 때마다 테스트한다.
5. 원래 함수에서 질의 관련 코드를 제거한다.
6. 테스트한다.

## 11.2 함수 매개변수화하기

## 11.2.1 함수 매개변수화하기 - 개요

```js
// before
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}

// after
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

## 11.2.2 함수 매개변수화하기 - 배경

- 두 함수의 로직이 아주 비슷하고 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다.

## 11.2.3 함수 매개변수화하기 - 절차

1. 비슷한 함수 중 하나를 선택한다.
2. 함수 선언 바꾸기(6.5)로 리터럴(고정된 값, 상수)들을 매개변수로 추가한다.
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
4. 테스트한다.
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다.
   하나 수정할 때 마다 테스트한다.
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다.
   하나 수정할 때 마다 테스트한다.

## 11.3 플래그 인수 제거하기

### 11.3.1 플래그 인수 제거하기 - 개요

```js
// before
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._width = value;
    return;
  }
}

// after
function setHeight(value) {
  this._height = value;
}
function setWidth(value) {
  this._width = value;
}
```

### 11.3.2 플래그 인수 제거하기 - 배경

- 플래그 인수(flag argument)란 호출되는 함수가 실행할 로직을 호출하는 쪾에서 선택하기 위해 전달하는 인수
- 플래그 인수는 열거형(enum)일 수도 있다.
- 문자열을 쓰기도 한다.
- 플래그 인수를 싫어하는 이유 : 호출할 수 있는 함수들이 무엇이고 어떻게 호출해야 하는지를 이해하기가 어려워지기 때문

### 11.3.3 플래그 인수 제거하기 - 절차

1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.

- 주가 되는 함수에 깔끔한 분배 조건문이 포함되어 있다면 조건문 분해하기(10.1)로 명시적 함수들을 생성하자.
- 그렇지 않다면 래핑 함수 형태로 만든다.

2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

## 11.4 객체 통째로 넘기기

### 11.4.1 객체 통째로 넘기기 - 개요

```js
// before
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, hight))

// after
if (aPlan.withinRange(aRoom.daysTempRange))
```

// TODO : 읽고 정리하기

## 11.5 매개변수를 질의 함수로 바꾸기

### 11.5.1 매개변수를 질의 함수로 바꾸기 - 개요

```js
// before
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
  // 연휴 계산...
}

// after
availableVacation(anEmployee);
function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  // 연휴 계산...
}
```

// TODO : 정리하기

## 11.6 질의 함수를 매개변수로 바꾸기

### 11.6.1 질의 함수를 매개변수로 바꾸기 - 개요

```js
// before
targetTemperature(aPlan);

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature; // 외부에 있는 전역적인 값을 사용하는 것으로 보임(전역 변수 등)
  // 생략
}

// after
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {
  // 생략
}
```

## 11.7 세터 제거하기

### 11.7.1 세터 제거하기 - 개요

# API 리팩터링

- API : 모듈과 함수를 끼워 맞추는 연결부
- 개인의견) API는 리팩터링도 중요하겠지만 문서화가 더 중요한 것 같다.

## 11.8 생성자를 팩터리 함수로 바꾸기

- 팩터리 함수 : 객체를 리턴하는 함수(new 없이)

### 11.8.1 개요

```js
// before
leadEngineer = new Employee(document.leadEngineer, "E");

// after
leadEngineer = createEngineer(document.leadEngineer);
```

### 11.8.2 배경

- 생성자 : 객체를 초기화하는 특별한 용도의 함수
  - 새로운 객체를 생성할 때 주로 생성자를 호출
  - 생성자에는 일반 함수에는 없는 제약이 붙기도 함
    - e.g. 자바, 그 생성자를 정의한 클래스의 인스턴스를 반환
      - 1. 서브 클래스의 인스턴스나 프락시를 반환할 수는 없다.
      - 2. 생성자의 이름도 고정되어, 기본 이름보다 더 적절한 이름이 있어도 사용할 수 없다.
      - 3. 생성자를 호출하려면 특별한 연산자(많은 언어서에서 new를 사용)를 사용
  - 팩터리 함수에는 이런 제약이 없다.

### 11.8.3 절차

1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 하나씩 수정할 때 마다 테스트한다.
4. 생성자의 가시 범위가 최소가 되도록 제한한다.

### 11.8.4 예시

- 직원 유형을 다루는 예시
  - 참고 : https://github.com/roy-jung/refactoring/blob/master/ch11/08.js

```js
// Employee 클래스
class Employee {
  #name;
  #typeCode;
  constructor(name, typeCode) {
    this.#name = name;
    this.#typeCode = typeCode;
  }
  get name() {
    return this.#name;
  }
  get type() {
    return this.#typeCode;
  }
  static get legalTypeCodes() {
    return {
      E: "Engineer",
      M: "Manager",
      S: "Salesperson",
    };
  }
}

// 위 클래스를 사용하는 코드
const client1 = () => {
  const document = { name: "재남", empType: "M", leadEngineer: "로이" };
  const candidate = new Employee(document.name, document.empType);
  const leadEngineer = new Employee(document.leadEngineer, "E");
  return { candidate: candidate.name, leadEngineer: leadEngineer.name };
};
```

1. [팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.]

```js
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
```

2. [생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.]

- 한 번에 하나씩, 생성자 대신 팩터리 함수를 사용하게 바꾼다.

```js
// before
const client1 = () => {
  const document = { name: "재남", empType: "M", leadEngineer: "로이" };
  const candidate = new Employee(document.name, document.empType);
  const leadEngineer = new Employee(document.leadEngineer, "E");
  return { candidate: candidate.name, leadEngineer: leadEngineer.name };
};

// after
const client1 = () => {
  const document = { name: "재남", empType: "M", leadEngineer: "로이" };
  const candidate = createEmployee(document.name, document.empType);
  const leadEngineer = createEmployee(document.leadEngineer, "E");
  return {
    candidate: candidate.name,
    candidateType: candidate.type,
    leadEngineer: leadEngineer.name,
  };
};

// better
function createEngineer(name) {
  return new Employee(name, "E");
}

const leadEngineer = createEngineer(document.leadEngineer);
```

- 함수에 문자열 리터럴을 건네는 건 악취로 봐야 한다.
- 그 대신 직원 유형을 팩터리 함수의 이름에 녹이는 방식을 권한다.

## 11.9 함수를 명령으로 바꾸기

- 반대 리팩터링 : 명령을 함수로 바꾸기(11.10절)

### 함수를 명령으로 바꾸기 - 개요

- 예시 코드와 같음

```js
// before
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;

  // 긴 코드 생략
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
    // 긴 코드 생략
  }
}
```

#### 명령(command)

- 용어 중 여러가지 의미로 사용되는 게 많다.
- 11.9에서 명령은 요청을 캡슐화한 객체(디자인 패턴 중 명령패턴에서 말하는 명령과 같다)
- 명령 객체 대신 명령으로 줄여 씀

### 함수를 명령으로 바꾸기 - 배경

- 명령 객체
  - 장점
    - 평범한 함수 메커니즘보다 훨씬 유연하게 함수를 제어하고 표현할 수 있다.
    - (되돌리기,undo 같은) 보조 연산을 제공할 수 있다.
    - 수명주기를 더 정밀하게 제어하는 데 필요한 매개변수를 만들어주는 메서드도 제공할 수 있다.
    - 일급함수를 지원하지 않는 프로그래밍 언어를 사용할 때는 명령을 이용해 일급함수의 기능 대부분을 흉내 낼 수 있다.
  - 단점
    - 복잡성을 키운다.
    - 일급함수와 명령객체 중 선택해야 한다면, 저자는 95% 일급함수를 선택할 것이라고 함
  - 명령 객체를 선택할 때는 명령 객체보다 더 간단한 방식으로는 얻을 수 없는 기능이 필요할 때 뿐이다.
    - Q) 그럼 객체지향으로 클래스를 사용해서 프로그래밍하는 것을 선호한다는 이전 주장과 약간 다른 것 같은데
      언제 클래스를 사용하고 언제 일급함수를 사용하는지 알아봐야겠다.

### 함수를 명령으로 바꾸기 - 예시 코드

- 자바스크림트는 허점이 많은 언어지만 함수를 일급으로 만든 선택은 아주 훌륭했다.
- 굳이 명령을 만들어 해결할 이유가 없지만 사용하는 편이 나을 때가 없는 건 아니다.

  - 복잡한 함수를 잘게 쪼깰 때

- 건강보험 애플리케이션에서 사용하는 점수 계산 함수

```js
function score = (candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;
  if (medicalExam.isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
  let certificationGrade = "regular";
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = "low";
    result -= 5;
  }
  result -= Math.max(healthLevel - 5, 0);
  return { result, certificationGrade, highMedicalRiskFlag };
};

const scoringGuide = {
  stateWithLowCertification: (state) => state === "CA" || state === "ME",
};
console.log(score({ originState: "CA" }, { isSmoker: true }, scoringGuide));
console.log(score({ originState: "NY" }, { isSmoker: false }, scoringGuide));
```

### 함수를 명령으로 바꾸기 - 절차

1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
2. 방금 생성한 빈 클래스로 함수를 옮긴다.

- 리팩터링이 끝날 때 까지는 원래 함수의 전달 함수 역할로 남겨두자.
- 명령 관련 이름은 사용하는 프로그래밍 언어의 명명규칙을 따른다.
  규칙이 딱히 없다면 "execute"나 "call" 같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자.

3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.

- 복잡한 함수를 잘게 나누는 것
- 단계
  - 모든 지역변수를 필드로 바꾼다.(한번에 하나씩 진행)
  - 이제 함수가 사용하던 변수나 그 유효범위에 구애받지 않고 함수 추출하기(6.1) 같은 리팩터링을 적용할 수 있다.

```js
class Score {
  #candidate;
  #medicalExam;
  #scoringGuide;
  #result;
  #healthLevel;
  #highMedicalRiskFlag;
  #certificationGrade;
  constructor(candidate, medicalExam, scoringGuide) {
    this.#candidate = candidate;
    this.#medicalExam = medicalExam;
    this.#scoringGuide = scoringGuide;
  }
  exec() {
    this.#result = 0;
    this.#healthLevel = 0;
    this.#highMedicalRiskFlag = false;
    this.scoreSmoking();
    this.certificationGrade();
    this.#result -= Math.max(this.#healthLevel - 5, 0);
    return {
      result: this.#result,
      certificationGrade: this.#certificationGrade,
      highMedicalRiskFlag: this.#highMedicalRiskFlag,
    };
  }

  certificationGrade() {
    this.#certificationGrade = "regular";
    if (
      this.#scoringGuide.stateWithLowCertification(this.#candidate.originState)
    ) {
      this.#certificationGrade = "low";
      this.#result -= 5;
    }
  }

  scoreSmoking() {
    if (this.#medicalExam.isSmoker) {
      this.#healthLevel += 10;
      this.#highMedicalRiskFlag = true;
    }
  }
}

const score = (candidate, medicalExam, scoringGuide) => {
  return new Score(candidate, medicalExam, scoringGuide).exec();
};

const scoringGuide = {
  stateWithLowCertification: (state) => state === "CA" || state === "ME",
};
console.log(score({ originState: "CA" }, { isSmoker: true }, scoringGuide));
console.log(score({ originState: "NY" }, { isSmoker: false }, scoringGuide));
```

- 사실 자바스크립트에서 중첩함수는 명령의 합리적인 대안이 될 수 있다.
- 그래도 저자는 명령을 사용하는 이유
  - 저자한테 더 익숙하기도 함
  - 명령을 사용하면 (execute 외의) 서브함수들을 테스트와 디버깅에 활용할 수 있음

## 11.10 명령을 함수로 바꾸기

### 11.10.1 개요

```js
// before
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}

// after
function charge(customer, usage) {
  return customer.rate * usage;
}
```

### 11.10.2 배경

- 명령 객체는 복잡한 연산을 다룰 수 있는 강력한 메커니즘을 제공
- 명령은 함수를 하나 호출해 정해진 일을 수행하는 용도로 주로 쓰임
- 로직이 크게 복잡하지 않다면 명령객체는 장점보다 단점이 크니 평범한 함수로 바꿔주는 게 낫다

### 11.10.3 절차
