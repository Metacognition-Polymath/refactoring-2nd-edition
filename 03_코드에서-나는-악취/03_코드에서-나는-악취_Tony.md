# 03. 코드에서 나는 악취

"냄새 나면 당장 갈아라." - 켄트 벡 할머니의 육아 원칙

'적용 방법'을 아는 것과 '제때 적용'할 줄 아는 것은 다르다.

리팩터링하면 해결할 수 있는 문제의 징후를 제시

이번 장(또는 부록 B)을 읽고 코드가 풍기는 냄새(악취)가 무엇인지 찾자

그런 다음 해법으로 제시한 리팩터링 기법을 이 책의 6~12장에서 찾아 읽고 그 냄새를 없애는데 도움이 될지 생각해본다

#### 느낀점

- 각 기법마다 예시 코드를 하나씩 봐야겠다.
  - 함수 추출하기 -> 6.1절을 봐서 코드를 직접 보기

## 3.1 기이한 이름(Mysterious Name)

- 함수, 모듈, 변수, 클래스 등은 그 이름만 보고도 각각이 무슨 일을 하고 어떻게 사용해야 하는지 명확히 알 수 있도록 엄청나게 신경써서 이름을 지어야 한다.
- 마땅한 이름이 떠오르지 않는다면 설계에 더 근본적인 문제가 숨어 있을 가능성이 높다
- 혼란스러운 이름을 잘 정리하다 보면 코드가 훨씬 간결해질 때가 많다
- e.g., 함수 선언 바꾸기(6.5절), 변수 이름 바꾸기(6.7절), 필드 이름 바꾸기(9.2절)

```js
// 6.1 함수 추출하기
// 전
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  // 세부 사항 출력
  console.log(`고객명 : ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}

// 후
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
  }
}

// 변수 이름 바꾸기(6.7절)
let a = height * width; // before
let area = height * width; // after

// 필드 이름 바꾸기(9.2절)
class Organization { // before
  get name() {...}
}

class Organization { // after
  get title() {...}
}
```

## 3.2 중복 코드(Duplicated Code)

- 똑같은 코드 구조가 여러 곳에서 반복된다면 하나로 통합하여 더 나은 프로그램을 만들 수 있다
- e.g., 함수 추출하기(6.1절), 문장 슬라이드 하기(8.6절), 메서드 올리기(12.1절)

```js
// 8.6 문장 슬라이드 하기 : 관련된 코드들이 가까이 모여 있는 것
// before
const pricingPlan = retrievePricingPlan();
const order = retrieveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;

// after
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retrieveOrder();
let charge;

// 12.1 메서드 올리기
// before
class Employ {...}

class Salesperson extends Employee {
  get name() {...}
}

class Engineer extends Employee {
  get name() {...}
}

// after
class Employee {
  get name() {...}
}

class Salesperson extends Employee {...}
class Engineer extends Employee {...}
```

## 3.3 긴 함수(Long Function)

- 코드를 이해하고, 공유하고, 선택하기 쉬워진다는 장점은 함수를 짧게 구성할 때 나오는 것이다.
- 함수 이름을 잘 지어두면 본문 코드를 볼 이유가 사라진다
- 주석을 달만한 부분은 무조건 함수로 만든다
- 함수이름은 동작 방식이 아닌 '의도'가 드러나게 짓는다
- 함수로 묶는 코드는 여러 줄 일 수도 있고 단 한 줄일 수도 있다
- 함수를 짧게 만드는 작업의 99%는 `함수 추출하기`(6.1절)가 차지 한다.
- 매개 변수와 임시 변수를 많이 사용한다면
  - `임시 변수를 질의 함수로 바꾸기`(7.4절)
  - `매개변수 객체 만들기`(6.8절)
  - `객체 통째로 넘기기`(11.9절)

```js
// `임시 변수를 질의 함수로 바꾸기`(7.4절) : 별 차이를 모르겠는데?
// before
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000)
  return basePrice * 0.95;
else
  return basePrice * 0.98;

// after
get basePrice() {this._quantity * this._itemPrice;}
...
if (this.basePrice > 1000)
  return this.basePrice * 0.95;
else
  return this.basePrice * 0.98;

// `매개변수 객체 만들기`(6.8절)
// before
function amountInvoiced(startDate, endDate) {...}
function amountReceived(startDate, endDate) {...}
function amountOverdue(startDate, endDate) {...}

// after
function amountInvoiced(aDateRange) {...}
function amountReceived(aDateRange) {...}
function amountOverdue(aDateRange) {...}

// `객체 통째로 넘기기`(11.9절)
// before
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  // 긴 코드 생략
}

// after
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

#### 추출할 코드 덩어리

- 추출할 코드 덩어리 -> 주석을 참고 -> 주석은 코드만으로는 목적을 이해하기 어려운 부분에 달려있는 경우가 많다
  - 함수 이름을 주석 내용을 토대로 짓는다
  - 코드가 단 한줄이어도 따로 설명할 필요가 있다면 함수로 추출하는 게 좋다

#### 조건문이나 반복문

- 조건문 : `조건문 분해하기`(10.1절)
- 거대한 switch문 : case문 마다 `함수 추출하기`(6.1절)
  - 각 case의 본문을 함수 호출문 하나로 바꾼다
- 같은 조건을 기준으로 나뉘는 switch문이 여러개라면 `조건문을 다형성으로 바꾸기`(10.4절)
- 반복문도 그 안의 코드와 함께 추출해서 독립된 함수로 만든다.
- 추출한 반복문 코드에 적합한 이름이 떠오르지 않는다면 -> 성격이 다른 두 가지 작업이 섞여 있기 때문일 수 있다
  - `반복문 쪼개기`(8.7절)

```js
// `조건문 분해하기`(10.1절)
// before
if (!aDate.isBefore(plan.summerStart) ** !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge;

// after
if (summer())
  charge = summerCharge();
else
  charge = regularCharge();

// `조건문을 다형성으로 바꾸기`(10.4절)
// before
switch (bird.type) {
  case '유럽 제비':
    return "보통이다";
  case '아프리카 제비':
    return (bird.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
  case '노르웨이 파랑 앵무':
    return (bird.voltage > 100) ? "그을렸다" : "예쁘다";
  default:
    return "알 수 없다";
}

// after
class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}
class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
  }
}
class NorwegianBlueParrot {
  get plumage() {
    return (this.voltage > 100) ? "그을렸다" : "예쁘다";
  }
}

// `반복문 쪼개기`(8.7절)
// before
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.length;

// after
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}
let averageAge = 0;
for (const p of people) {
  averageAge += p.age;
}
averageAge = averageAge / people.length;
```

## 3.4 긴 매개변수 목록

- 함수에 필요한 것들을 모조리 매개변수 -> 이해하기 어려울 때가 많음
- 다른 매개변수에서 값을 얻어올 수 있는 매개변수 : `매개변수를 질의 함수로 바꾸기`(11.5절) => 제거 가능
- 사용 중인 데이터 구조에서 값들을 뽑아 각각을 별개의 매개변수로 전달하는 코드 : `객체 통째로 넘기기`(11.4)
- 항상 함께 전달되는 매개변수 : `매개변수 객체 만들기`(6.8절)
- 함수의 동작 방식을 정하는 플래그 역할의 매개변수 : `플래그 인수 제거하기`(11.3절)

#### 클래스는 매개변수 목록을 줄이는 데 효과적인 수단

- 특히 여러 개의 함수가 특정 매개변수의 값을 공통으로 사용할 때 유용
  - `여러 함수를 클래스로 묶기`(6.9절)
- 함수형프로그래밍 : 부분 적용 함수(partially applied function)

## 3.5 전역 데이터

- 전역 데이터는 코드베이스 어디에서든 건드릴 수 있고 값을 누가 바꿨는지 찾아낼 매커니즘이 없다는 게 문제
  - 버그는 끊임없이 발생하는데 그 원인이 되는 코드를 찾아내기가 굉장히 어려움
  - 클래스 변수와 싱글톤에서도 같은 문제가 발생
    - [ ] 싱글톤 ?
  - `변수 캡슐화하기`(6.6절)
    - 데이터를 함수로 감싸는 것, 접근자 함수들을 클래스나 모듈에 집어넣고 그 안에서만 사용할 수 있도록 접근 범위를 최소로 줄이는 것

## 3.6 가변 데이터

- 데이터 변경 후 예상치 못한 결과나 골치 아픈 버그로 이어지는 경우
  - 아주 드문 조건 -> 찾아내기 어려움
- 이런 이유로 함수형 프로그래밍에서는 데이터는 절대 변하지 않고, 데이터를 변경하려면 반드시 (원래 데이터는 그대로 둔 채)
  - 변경하려는 값에 해당하는 복사본을 만들어서 반환한다는 개념을 기본으로 삼음
- `변수 캡슐화하기`(6.6절) : 정해놓은 함수를 거쳐야만 값을 수정할 수 있도록 함
  - => 값이 어떻게 수정되는지 감시하거나 코드를 개선하기 쉬움
- 하나의 변수에 용도가 다른 값들을 저장하느라 값을 갱신하는 경우
  - => `변수 쪼개기`(9.1절) : 용도별로 독립 변수에 저장하여 값 갱신이 문제를 일으킬 여지를 없앤다
- 갱신 로직은 다른 코드와 떨어뜨려 놓는 것
  - => `문장 슬라이드하기`(8.6절) + `함수 추출하기`(6.1절) : 무언가를 갱신하는 코드로부터 부작용이 없는 코드를 분리
- API를 만들 때
  - `질의 함수와 변경 함수 분리하기`(11.1절) : 꼭 필요한 경우가 아니라면 부작용이 있는 코드를 호출할 수 없게 함
- `세터 제거하기`(11.7절) : 변수의 유효범위를 줄임
- 값을 다른 곳에서 설정할 수 있는 가변 데이터 => 혼동과 버그와 야근을 초래함
  - => `파생 변수를 질의 함수로 바꾸기`(9.3절)

```js

```

- 변수의 유효범위가 넓어지면
  - `여러 함수를 클래스로 묶기`(6.9절) + `여러 함수를 변환 함수로 묶기`(6.10절)
    - => 변수를 갱신하는 코드들의 유효범위를 (클래스나 변환(transform)으로) 제한한다.

```js
// 6.9 여러 함수를 클래스로 묶기
function base(aReading) {...}
function taxableCharge(aReading) {...}
function calculateBaseCharge(aReading) {...}

class Reading {
  base() {...}
  taxableCharge() {...}
  calculateBaseChare() {...}
}

// 6.10 여러 함수를 변환 함수로 묶기
function base(aReading) {...}
function taxableCharge(aReading) {...}

function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}
```

- 구조체 처럼 내부 필드에 데이터를 담고 있는 변수 -> `참조를 값으로 바꾸기`(9.4절)
  - => 내부 필드를 직접 수정하지 말고 구조체를 통째로 교체하는 편이 낫다

## 3.7 뒤엉킨 변경

- 소프트웨어의 구조 : 변경하기 쉬운 형태로 조직
- 코드 수정 필요 시 -> 고쳐야할 딱 한군데만 수정할 수 있길 바람

  - 아니라면 뒤엉킨 변경과 산탄총 수술 필요

- 뒤엉킨 변경 : 단일 책임 원칙(Single Responsibility Principle, SRP)이 제대로 지켜지지 않을 때 나타난다

  - 하나의 모듈이 서로 다른 이유들로 인해 여러가지 방식으로 변경되는 일이 많을 때 발생

- e.g., DB에서 데이터를 가져와서 금융 상품 로직에서 처리해야하는 일
  - 순차적으로 실행되는게 자연스러운 맥락
  - -> 다음 맥락에 필요한 데이터를 특정 데이터 구조에 담아 전달하는 식으로 단계를 분리(`단계 쪼개기` 6.11절)

```js
// 6.11 단계 쪼개기
// before
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// after
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);
function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return {
    productID: values[0].split("-")[1],
    quantity: parseInt(values[1]),
  };
}
function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
```

## 3.8 산탄총 수술

|                 |       뒤엉킨 변경        |     산탄총 수술      |
| :-------------: | :----------------------: | :------------------: |
|      원인       | 맥락을 잘 구분하지 못 함 |                      |
|   해법(원리)    |    맥락을 명확히 구분    |                      |
| 발생 과정(현상) |  한 코드에 섞여 들어감   | 여러 코드에 흩뿌려짐 |
| 해법(실제 행동) |      맥락별로 분리       |    맥락별로 모음     |

- 코드를 변경할 때 자잘하게 수정해야하는 클래스가 많을 때,
- 변경할 부분이 코드 전반에 퍼져 있다면
  - `함수 옮기기` 8.1절
  - `필드 옮기기` 8.2절
- 비슷한 데이터를 다루는 함수가 많다면
  - `여러 함수를 변환 함수로 묶기` 6.9 절
- 데이터 구조를 보강(enrich)하는 함수들에는
  - `여러 함수를 변환 함수로 묶기` 6.10절
- 묶은 함수들의 출력 결과를 묶어서 다음 단계의 로직으로 전달할 수 있다면 => `단계 쪼개기` 6.11절 적용

- 어설프게 분리된 로직 => `함수 인라인하기` 6.2절 or `클래스 인라인하기` 7.6절
  - 이건 아직 잘 모르겠다

## 3.9 기능 편애

- 프로그램 모듈화
  - 코드를 여러 영역으로 나눈 뒤 - 영역 안에서 이뤄지는 상호작용은 최대한 늘리고
  - 영역 사이에서 이뤄지는 상호작용은 -> 최소로 줄이는 데 주력
- 기능 편애(냄새)
  - 어떤 함수가 자신이 속한 모듈의 함수나 데이터 보다
  - 다른 모듈의 함수나 데이터와 상호작용할 일이 더 많을 때 풍기는 냄새
  - e.g., 외부 객체의 게터 메서드 대여섯 개를 호출하도록 작성된 함수
  - `함수 옮기기` 8.1절
  - 함수의 일부에서만 기능 편애 => `함수 추출하기` 6.1절 + `함수 옮기기` 8.1절

## 3.10 데이터 뭉치

- 데이터 항목 -> 여러 곳에서 뭉쳐 다님 0> 보금자리 마련 필요
  - `클래스 추출하기` 7.5절 : 데이터 뭉치를 하나의 객체로 묶는다
  - 메서드 시그니처에 있는 데이터 뭉치 -> `매개 변수 객체 만들기` 6.8절 or `객체 통째로 넘기기` 11.4절
    - 매개변수 수를 줄이기
- 데이터 뭉치인지 판별 -> 데이터 하나 삭제 시 나머지 데이터만으론 의미가 없다면 객체로 묶어야 함

## 3.11 기본형 집착

- 대부분 언어 -> 정수, 부동소수점 수, 문자열 등 다양한 기본형(primitive type)을 제공
- 자신에게 주어진 문제에 딱 맞는 기초 타입을 직접 정의하기
  - e.g., 화폐, 좌표, 구간 등
- `기본형을 객체로 바꾸기` 7.3절
- 기본형으로 표현된 코드가 조건부 동작을 제어하는 타입 코드로 쓰임
  - `타입 코드를 서브클래스로 바꾸기` 12.6절과
  - `조건부 로직을 다형성으로 바꾸기` 10.4절을 차례로 적용
- 자주 함께 몰려다니는 기본형 그룹도 데이터 뭉치
  - `클래스 추출하기` 7.5절
  - `매개변수 객체 만들기` 6.8절

```js
// `기본형을 객체로 바꾸기` 7.3절
// before
orders.filter((o) => "hight" === o.priority || "rush" === o.priority);
// after
orders.filter((o) => o.priority.higherThan(new Priority("normal")));
// Priority에 getter가 존재해야 되고 higherThan에선 Priority의 getter로 priority를 가져와서 조건식을 return 해야 될 것 같다

// 기본형으로 표현된 코드가 조건부 동작을 제어하는 타입 코드로 쓰임 10.4 + 12.6
// `조건문을 다형성으로 바꾸기`(10.4절)
// before
switch (bird.type) {
  case "유럽 제비":
    return "보통이다";
  case "아프리카 제비":
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  case "노르웨이 파랑 앵무":
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  default:
    return "알 수 없다";
}

// after
class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}
class AfricanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}
class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}

// `타입 코드를 서브클래스로 바꾸기` 12.6절
// before
function createEmployee(name, type) {
  return new Employee(name, type);
}

// after
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
  }
}
```

## 3.12 반복되는 switch문

- switch문 => `조건부 로직을 다형성으로 바꾸기` 10.4절
  - 무조건은 아니고 똑같은 조건부 로직이 여러 곳에서 반복해 등장하는 코드에 적용
- 중복된 switch문의 문제 => 조건절 하나 추가할 때 마다 다른 switch문들도 모두 찾아서 함께 수정해야 함

## 3.13 반복문

- 일금 함수가 지원되는 언어가 많아짐 -> `반복문을 파이프라인으로 바꾸기` 8.8절

```js
// before
const name = [];
for (const i of input) {
  if (i.job === "programmer") names.push(i.name);
}

// after
const names = input.filter((i) => i.job === "programmer").map((i) => i.name);
```

## 3.14 성의없는 요소

- 코드의 구조를 잡을 때 프로그램 요소를 이용
  - 그렇지만 구조가 필요 없을 때도 있음 - 본문 코드를 그대로 쓰는 것 or 실질적으로 메서드가 하나뿐인 클래스
  - `함수 인라인하기` 6.2절, `클래스 인라인하기` 7.6절, (상속을 사용했다면)`계층 합치기` 12.9절

```js
// 6.2 함수 인라인 하기
// before
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

// after
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}

// 7.6 클래스 인라인하기 <-> 반대 : 클래스 추출하기(7.5절)
// before
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}

// after
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}

// 12.9 계층 합치기
// before
class Employee {...}
class Salesperson extends Employee {...}

// after
class Employee {...}
```

## 3.15 추측성 일반화

- '나중에 필요할 거야'라는 생각으로 당장은 필요 없는 모든 종류의 후킹(hooking) 포인트와 특이 케이스 처리 로직을 작성해둔 코드에서 풍기는 냄새
- 이해하거나 관라힉 어려워진 코드
- 실제로 사용하면 다행이지만 그렇지 않는다면 쓸데없는 낭비일 뿐

- 하는일이 거의 없는 추상 클래스 => `계층 합치기` 12.9절
- 쓸데없이 위임하는 코드 => `함수 인라인 하기` 6.2절 or `클래스 인라인하기` 7.6절
- 본문에서 사용되지 않는 매개변수 => `함수 선언 바꾸기` 6.5절

- 추측성 일반화 - 테스트 코드 말고는 사용하는 곳이 없다면 => 테스트 케이스 삭제 후 `죽은 코드 제거하기` 8.9절

## 3.16 임시 필드

- 간혹 특정 상황에서만 값이 설정되는 필드를 가진 클래스
  - 하지만 객체를 가져올 때 모든 필드가 채워져 있으리라 기대하는게 보통임
  - 덩그러니 떨어져 있는 필드 => `클래스 추출하기` 7.5절
  - 임시 필드들이 유효한지를 확인 후 동작하는 조건부 로직 => `특이 케이스 추가하기` 10.5절 : 필드들이 유효하지 않을 때를 위한 대안 클래스를 만들어서 제거

```js
// `클래스 추출하기` 7.5절 <-> 7.6절 클래스 인라인하기
// before
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}

// after
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}

// `특이 케이스 추가하기` 10.5절
// before
if (aCustomer === "미확인 고객") customerName = "거주자";

// after
class UnknownCustomer {
  get name() {
    return "거주자";
  }
}
```

## 3.17 메시지 체인

- 클라이언트 -> 한 객체를 통해 다른 객체를 얻은 뒤 -> 방금 얻은 객체에 또 다른 객체를 요청하는 식
- 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드
- 클라이언트가 객체 내비게이션 구조에 종속됐음을 의미
  - 내비게이션 중간 단계를 수정하면 클라이언트 코드도 수정해야 됨
    - `위임 숨기기` 7.7절 - 체인을 구성하는 모든 객체에 적용할 수 있지만, 그러다 보면 중간 객체들이 모두 중개자(3.18절)이 돼버리기 쉽다
      - 최종 결과 객체가 어떻게 쓰이는지 부터 살펴보는게 좋다
- `함수 추출하기` 6.1절로 결과 객체를 사용하는 코드 일부를 따로 빼낸 다음 -> `함수 옮기기` 8.1절로 체인을 숨길 수 있는지 살펴봐야 함

```js
// `위임 숨기기` 7.7절
// before
manager = aPerson.department.manager;
// after
manager = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}
```

## 3.18 중개자

- 객체의 대표적인 기능 : 캡슐화(encapsulation)
- 캡슐화 과정에는 위임이 자주 활용된다
- 하지만 지나치면 문제가 된다 !
  - 클래스가 제공하는 메서드 중 절반이 다른 클래스에 구현을 위임하고 있다면?
    - `중재자 제거하기` 7.8절을 활용하여 실제로 일을 하는 객체와 직접 소통하게 하자
    - 위임 메서드를 제거한 후 남는 일이 거의 없다면, 호출하는 쪽으로 인라인 하자(함수 인라인하기 6.2절)

```js
// `중재자 제거하기` 7.8절
// before
manager = aPerson.manager;
class Person {
  get manager() {
    return this.deaprtment.manager;
  }
}

// after
manager = aPerson.department.manager;
```

## 3.19 내부자 거래

- 모듈 사이에 벽을 두껍게 세우기를 좋아하고
- 모듈 사이의 데이터 거래가 많으면 결합도(coupling)가 높아진다고 투덜댄다
- 일이 돌아가게 하려면 거래가 이뤄질 수 밖에 없지만 그 양을 최소로 줄이고 모두 투명하게 처리해야 한다

- 커피 자판기 옆에서 은밀히 데이터를 주고 받는 모듈 => `함수 옮기기`8.1절과 `필드 옮기기` 8.2절
- 여러 모듈이 같은 관심사를 공유 => (공통 부분을 정식으로 처리하는) 제 3의 모듈을 새로 만들거나 `위임 숨기기` 7.7절을 이용하여 다른 모듈이 중간자 역할을 하게 만든다
- 상속 구조 => `서브클래스를 위임으로 바꾸기` 12.10절 or `슈퍼클래스를 위임으로 바꾸기` 12.11절

```js
// 12.10 서브클래스를 위임으로 바꾸기
// before
class Order {
  get daysToShip() {
    return this._werehouse.daysToShip;
  }
}
class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}

// after : 팩터리 메서드랑 비슷하네
class Order {
  get daysToShip() {
    return this._priorityDelegate
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}
class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}

// 12.11 슈퍼클래스를 위임으로 바꾸기
// before
class List {...}
class Stack extends List {...}

// after
class Stack{
  constructor() {
    this._storage = new List();
  }
}
class List {...}
```

## 3.20 거대한 클래스

- 한 클래스가 너무 많은 일을 하려다 보면 필드 수가 상당히 늘어난다
- 그리고 클래스에 필드가 너무 많으면 중복 코드가 생기기 쉽다
- => `클래스 추출하기` 7.5절 : 필드들 일부를 따로 묶는다

#### 한 클래스 안에서 접두어나 접미어가 같은 필드들이 함께 추출할 후보들이다

- 분리할 컴포넌트를 원래 클래스와 상속관계로 만든다면 -> `슈퍼클래스 추출하기` 12.8절 or `타입 코드를 서브클래스로 바꾸기` 12.6절

#### 클래스가 항시 모든 필드를 사용하지 않을 수 있음 -> 앞의 추출 기법들을 여러 차례 수행

#### 클래스 안에서 자체적으로 중복제거(제일 간단한 해결책)

#### 기능 그룹 - 클래스로 추출될 후보

- `클래스 추출하기` 7.5절
- `슈퍼클래스 추출하기` 12.8절
- `타입 코드를 서브클래스로 바꾸기` 12.6절 - 팩터리 메서드

```js
// 12.8 슈퍼클래스 추출하기
// before
class Department {
  get totalAnnualCost() {...}
  get name() {...}
  get headCount() {...}
}

class Employee {
  get annualCost() {...}
  get name() {...}
  get id() {...}
}

// after
class Party {
  get name() {...}
  get annualCost() {...}
}

class Department extends Party {
  get annualCost() {...}
  get headCount() {...}
}

class Employee extends Party {
  get annualCost() {...}
  get id() {...}
}
```

## 3.21 서로 다른 인퍼에이스의 대안 클래스들

- 클래스를 사용할 때 장점 : 언제든 다른 클래스로 교체할 수 있음
  - 단, 교체하려면 인터페이스가 같아야 한다
  - `함수 선언 바꾸기` 6.5절 => 메서드 시그니처를 일치시킨다
    - 이것만으론 부족함 => `함수 옮기기` 8.1절 - 인터페이스가 같아질 때까지 필요한 동작들을 클래스 안으로 밀어 넣는다
  - 이후 대안 클래스들 사이에 중복 코드가 생기면 `슈퍼클래스 추출하기` 12.8절을 적용할지 고려해본다

## 3.22 데이터 클래스

- 데이터 클래스 : 데이터 필드 + 세터 + 게터 만으로 구성된 클래스

  - 데이터 저장용으로만 쓰임
  - public 필드 => `레코드 캡슐화하기` 7.1절
  - 변경하면 안되는 필드 => `세터 제거하기` 11.7절

- 예외 : 다른 함수를 호출해 얻은 결과 레코드(데이터 객체)
  - 단계 쪼개기의 결과로 나온 중간 데이터 구조 -> 불변 - 굳이 캡슐화할 필요 없음
  - 불변 데이터로 나오는 정보는 게터를 통하지 않고 필드 자체를 공개해도 된다

## 3.23 상속 포기

- 부모의 유산 중 필요없는 부분이 있다면 -> 계층 구조를 잘못 설계한 것
  - 같은 계층에 서브클래스를 하나 만들고 -> `메서드 내리기` 12.4절과 `필드 내리기` 12.5절을 활용
  - 물려받지 않을 부모코드를 모조리 새로 만든 서브 클래스로 넘긴다
- 상속자체가 커플링이 강해서 구린냄새가 나긴하지만 실무에선 참고 유용하게 사용할 때도 있다
  - 90%는 냄새가 미미해서 굳이 씻어내지 않아도 된다
- 상속 포기 냄새 <- 서브 클래스가 부모의 동작은 필요로 하지만, 인터페이스는 따르고 싶지 않을 때
  - 상속 메커니즘에서 벗어나기 : `서브클래스를 위임으로 바꾸기` 12.10절 or `슈퍼클래스를 위임으로 바꾸기` 12.11절

## 3.24 주석

- 주석이 장황하게 달린 원인이 코드를 잘못 작성했기 때문인 경우가 의외로 많다

- 특정 코드 블록이 하는 일에 주석을 남기고 싶다면 -> `함수 추출하기` 6.1절
- 이미 추출 되어 있는 함수임에도 여전히 설명이 필요하다면 -> `함수 선언 바꾸기` 6.5절
- 시스템이 동작하기 위한 선행조건을 명시하고 싶다면 -> `어서션 추가하기` 10.6절

```js
// 10.6 어서션 추가하기(Introduce Assertion)
// before
if (this.discountRate) {
  base = base - this.discountRate * base;
}

// after
assert(this.discountRate >= 0);
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

#### 주석을 남겨야겠다는 생각이 들면, 가장 먼저 주석이 필요 없는 코드로 리팩터링해본다

#### 그 외 주석이 좋은 경우

- 뭘할지 모를 때
- 확실하지 않은 부분
- 코드를 지금처럼 작성한 이유를 설명하는 용도
  - 나중에 코드를 수정해야할 프로그래머에게 도움이 됨
