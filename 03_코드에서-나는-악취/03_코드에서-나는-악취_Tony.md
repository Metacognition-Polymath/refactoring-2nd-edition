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

## 3.8 산탄총 수술

|                 |       뒤엉킨 변경        |     산탄총 수술      |
| :-------------: | :----------------------: | :------------------: |
|      원인       | 맥락을 잘 구분하지 못 함 |                      |
|   해법(원리)    |    맥락을 명확히 구분    |                      |
| 발생 과정(현상) |  한 코드에 섞여 들어감   | 여러 코드에 흩뿌려짐 |
| 해법(실제 행동) |      맥락별로 분리       |    맥락별로 모음     |

## 3.9 기능 편애

## 3.10 데이터 뭉치

## 3.11 기본형 집착

## 3.12 반복되는 switch문

## 3.13 반복문

## 3.14 성의없는 요소

## 3.15 추측성 일반화

## 3.16 임시 필드

## 3.17 메시지 체인

## 3.18 중개자

## 3.19 내부자 거래

## 3.20 거대한 클래스

## 3.21 서로 다른 인퍼에이스의 대안 클래스들

## 3.22 데이터 클래스

## 3.23 상속 포기

## 3.24 주석
