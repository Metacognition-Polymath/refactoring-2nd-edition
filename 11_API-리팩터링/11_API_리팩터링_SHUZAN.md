# 11장 API 리팩토링

좋은 API는 **데이터를 갱신하는 함수**와 **그저 조회만하는 함수**를 명확하게 구분한다.

- 두 기능이 섞여 있다면?
  → `**질의 함수와 변경 함수 분리하기**`를 적용하여 갈라야 한다,
- 값 하나 떄문에 여러 개로 나뉜 함수
  → `**함수 매개 변수화하기**`를 통해 합칠 수 있다.
- 어떤 매개변수는 그저 함수의 동작 모드를 전환하는 용도로만 쓰이는 경우,
  →이럴 떄는 **`플래그 인수 제거하기`**를 적용하면 좋다.
- 데이터 구조가 함수 사이를 건너 다니면서 필요 이상으로 분해 될 때
  → `**객체 통채로 넘기기`\*\*
  → 상황이 바뀌면 `**질의 함수로 바꾸기**`, 질의함수를 `**매개변수로 바꾸기로 균형점**`을 바꾼다,
- 클래스는 대표적인 모듈이다. 내가 만든 객체가 되도록 불변이길 원한다면?
  → **`세터제거하기`**
- 새로운 객체를 만들어 반환하려 하는데, 생성자 능력만으로 부족할 때?
  → `**생성자를 팩터리 함수로 만들기**`
- 수많은 데이터를 받는 복잡한 함수를 잘게 쪼개는 방법
  **→ `함수를 명력문으로 바꾸기`**
  **⇒** 나중에 객체로 변환하여 함수 추출하기 편해진다.
  함수가 단순화되어 명령 객체가 필요 없어지면, `**명령을 함수로 바꾸기**` 로 함수로 되돌릴 수 있다.

---

## 11.1 질의 함수와 변경 함수 분리하기

- 외부에서 관찰 할 수 있는 **겉보기 부수효과**가 전혀 없이 값을 반환해주는 함수를 추구해야한다

  → 겉보기 부수효과가 있는 함수와 없는 함수를 명확히 구분하는 것이 좋다.

  ⇒ 질의 함수는(읽기 함수)는 모두 부수효과가 없어야 한다는 규칙

  - **명령-질의(command-query separation)이라고도 한다.**

- 값을 반환하면서 부수효과가 있는 함수를 발견하면, 상태를 변경하는 부분과 질의하는 부분을 무조건 분리하는 것이 좋다!

### 리팩토링 전😅

```jsx
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

### 리팩토링 후😇 - 부수효과 제거

```jsx
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

## 11.2 함수 매개변수화하기

- 두 함수의 로직이 아주 비슷하고, 리터럴 값만 다르다면?
  → 다른 값만 매개변수로 받아 처리하는 함수를 하나로 합쳐서 중복을 없앤다.
  ⇒ 함수의 유용성이 커진다.

### 리팩토링 전😅

```jsx
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```

### 리팩토링 후😇 - 다른 값만 매개변수 처리

```jsx
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

## 11.3 플래그 인수 제거하기

**플래그인수?**

→ 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수

→ 호출할 수 있는 함수들이 무엇이고, 어떻게 호출해야하는이 이해하기 어렵다.

(특히, 불리언 플래그는 읽는 이에게 뜻을 온전하게 전달하기 어렵다)

**⇒ 플래그 인수를 제거하면 코드가 깔끔해진다.**

— 함수 하나에서 플래그 인수가 두 개 이상 사용되면, 플래그인수 조합수만큼 함수 만들어야 하므로, 사용할만한 근거가 된다.

→ 하지만, 함수가 하나가 너무 많은 일을 처리한다는 신호이기도 하다.

→간단한 함수를 만들 방법에 대한 고민이 필요하다!

### 리팩토링 전😅

```jsx
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
```

### 리팩토링 후😇

```jsx
function setHeight(value) {
  this._height = value;
}

function setWidth(value) {
  this._width = value;
}
```

## 11.4 객체 통째로 넘기기

**레코드를 통째로 넘길때 장점**

1. 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개 변수 목록 수정할 필요 없다.
2. 매개 변수 목록이 짧아져서 함수 사용법을 이해하기 쉽다.
3. 로직 중복을 없앨 수 있다.

→ 주의‼️ 함수가 레코드 자체에 의존하기 원치 않으면, 수행하지 않는다

- 어떤 객체에서 값 몇개를 얻어서 그 값으로 무언가 하는 로직이 있다면?
  → 로직을 객체 안으로 넣어야하는 악취
  ⇒ 데이터 더미를 새로운 객체로 묶은 후 적용하는 것이 좋다.
  (객체에서 똑같은 일부만을 사용하면, `**클래스 추출**`하라는 신호이다)

### 리팩토링 전😅

```jsx
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high)) {
  console.log("with in range 👍");
}
```

### 리팩토링 후😇 - 객체를 통쨰로 넘김

```jsx
if (aPlan.withinRange(aRoom.daysTempRange)) {
  console.log("with in range 👍");
}
```

## 11.5 매개변수를 질의 함수로 바꾸기

**매개변수 목록**은 함수의 변동 요인을 모아놓은 곳이다.

→ 함수의 동작에 변화를 줄 수 있는 1차적 수단

→ 중복은 피하는게 좋으며 짧을수록 이해하기 쉽다.

- 매개변수가 있다면?
  - 결정 주체 = 호출자
- 매개변수가 없다면?
  - 결정 주체 = 피호출 함수

⇒ 호출하는 쪽을 간소화하면(책임 소재를 피호출 함수로 옮기면) 중복을 피할 수 있다.

단, 매개변수 제거시 피호출 함수에 원치 않는 의존성이 생기는 경우는 피해야 한다.

- 대상 참조는 투명해야한다. (referential transparency)
  - 함수에 똑같을 값을 건네 호출하면 항상 똑같이 작동해야한다.
    → 동작을 예측하고 테스트하기 쉬우므로 이 특성을 유지하도록 하는 것이 좋다.

### 리팩토링 전😅

```jsx
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
  // 연휴계산
}
```

### 리팩토링 후😇

```jsx
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  // 연휴계산
}
```

## 11.6 매개변수를 질의 함수로 바꾸기

**함수 안에 두기에 거북한 참조**

1. 전역 변수를 참조
2. 제거하길 원하는 원소를 참조

   ⇒ 해당 참조를 매개변수로 바꿔서 해결한다.

   (참조를 풀어내는 책임을 호출자로 옮기는 것)

- 대부분 코드의 의존 관계를 바꾸려 할 때 벌어진다.
- 대상 함수가 더 이상 특정 원소에 의존하길 원치 않을 때 일어난다.

- 똑같은 값을 건네면 매번 똑같은 결과를 내는 함수는 다루기 쉽다.
  ⇒ **참조 투명성**
  ( 참조 투명하지 않은 원소에 접근하는 모든 함수는 참조 투명성을 잃는다)
  - 질의 함수를 매개변수로 바꾸면, 어떤 값을 제공할지를 호출자가 알아내야 한다.

### 리팩토링 전😅

```jsx
const aPlan = {};
const thermostat = { currentTemperature };
function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  //...
}
targetTemperature(aPlan);
```

### 리팩토링 후😇 - 거북한 참조를 매개변수로 수정

```jsx
const aPlan = {};
const thermostat = { currentTemperature };
function targetTemperature(aPlan, currentTemperature) {
  //...
}
targetTemperature(aPlan, thermostat.currentTemperature);
```

## 11.6 세터제거하기

**세터 메서드가 있다는 것은 필드가 수정 될 수 있다는 뜻이다.**

→ 객체 생성 후에 수정되지 않길 원하는 필드라면 세터를 제공하지 않을 것이다.

⇒ 즉, 필드는 생성자에서만 설정되며 수정하지 않겠다는 의도가 명명백백해지면 변경 가능성이 봉쇄된다.

### 세터 제거하기가 필요한 상황

1. **사람들이 무조건 접근자 메서드를 통해서만 필드를 다룰 때**

   → 생성자 안에서도 접근자 메서드만을 사용하여 다룬다.

2. **생성 스크립트를 사용하여 객체를 생성할 때**
   - **생성스크립트?**
     생성자를 호출 한 후, 일련의 세터를 호출하여 객체를 완성하는 형태의 코드이다.
     설계자는 스크립트 완료 후, 객체가 변경되지 않으리라 기대한다.
     즉, 세터는 처음 생성시에만 호출 되리라 가정한다.

### 리팩토링 전😅

```jsx
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }
}
```

### 리팩토링 후😇 - 세터제거

```jsx
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}
```
