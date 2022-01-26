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
