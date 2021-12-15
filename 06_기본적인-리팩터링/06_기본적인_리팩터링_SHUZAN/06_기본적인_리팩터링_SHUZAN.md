- **저자가 가장 많이 사용하는 리팩터링**
  1. 함수 추출하기
  2. 변수 추출하기
  3. 함수 인라인하기
  4. 변수 인라인하기
  5. 함수 선언바꾸기
  6. 변수 이름 바꾸기
  7. 변수 캡슐화하기 (5,6과 연관이 깊다)
  8. 매개변수 객체 만들기
  9. 여러 함수를 클래스로 묶기
  10. 여러 함수를 변환 함수로 묶끼
  11. 단계 쪼개기

---

## 6.1 함수 추출하기

**목적과 구현을 분리하여 합리적으로 코드를 분리하자**

**함수를 짧게 만들면 함수 호출이 많아질까?**

→ 함수가 짧으면 캐싱하기 쉬워서 컴파일러가 최적화 할 때 유리할 떄가 많다.

⇒ 성능 최적화는 항상 일반 지침을 따르는 것이 좋다

1. 하지 마라
2. 아직 하지마라

- **짧은 함수의 이점은 이름이 잘 지어져야만 발휘된다.**

> **절차**
>
> 1. 함수를 새로 만들고 목적을 잘 들어내는 이름을 붙인다.
>    1. 매우 간단해도 목적이 더 잘 드러나는 이름으로 붙일 수 있으면 추출한다
>    2. 이름이 떠오르지 않는다면 추출하면 안된다는 신호이다.
>    3. 중첨 함수를 지원하는 언어는 중첩시킨다.
> 2. 추출할 코드를 원본 함수에서 복사해서 새 함수에 붙인다.
> 3. 추출한 코드에서 원본 함수의 지역 변수를 참조하거나 유효범위를 벗어나느 변수가 없는지 검사한다.
> 4. 변수를 모두 처리하고 컴파일
> 5. 추출 코드 중 새로 만든 함수를 호출하는 문자로 바꾼다
> 6. 비슷한 코드가 존재하는지 확인

### 예시1 : 유효 범위가 벗어나는 변수가 없을 때

```jsx
function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
  //미해결 채무 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  //마감일을 기록
  const today = Clock.today();
  // Cock.today는 Clck Wrapper로서 시스템 시계를 감싼다.
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString("en-US")}`);
}
```

### 예시2 : 지역 변수를 사용할 때

- 매개변수로 넘기면 된다

```jsx
function printOwing(invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
  //미해결 채무 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  //마감일을 기록
  recordDueDate(clock, invoice);
}
function recordDueDate(clock, invoice) {
  const today = clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
}

function printDetails(invoice, outstanding, console) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString("en-US")}`);
}
```

### 예시3 : 지역 변수를 사용할 때

1. 간단한 경우

   → 변수가 추출된 코드 안에서만 사용

   → 문장 슬라이드하기 를 활용하여 변수 조작을 한곳에서 처리

2. 특이한 경우

   → 변수가 추출된 함수에서 사용

   → 대입된 새 값 반환

```jsx
function printBanner(console) {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function printDetails(invoice, outstanding, console) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString("en-US")}`);
}

function recordDueDate(clock, invoice) {
  const today = clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function printOwing(invoice, console, clock) {
  printBanner(console);
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(clock, invoice);
  printDetails(invoice, outstanding, console);
}
```

### 예시3 : 지역 변수의 값을 변경할 때

```jsx
function printBanner(console) {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function printDetails(invoice, outstanding, console) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString("en-US")}`);
}

function recordDueDate(clock, invoice) {
  const today = clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function printOwing(invoice, clock) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(clock, invoice);
  printDetails(invoice, outstanding);
}
```

## 6.2 함수 인라인하기

이 책은 목적이 분명히 드러나는 이름의 짤막한 함수를 이용하기를 권한다.

하지만, 쓸데없는 간접 호출은 거슬릴 뿐이다.

→ 간접 호출이 과하면 인라인 대상이 된다.

**과한 간접호출**

```jsx
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries() {
  return driver.numberOfLateDeliveries > 5;
}
```

**인라인하기**

```jsx
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

> **절차**
>
> 1. 다형 메서드인지 확인
>
>    → 서브 클래스에서 오버라이드하는 경우 인라인 X
>
> 2. 인라인할 함수 호출하는 곳을 모두 찾는다
> 3. 각 호출문을 본문으로 교체
> 4. 교체할 때 마다 테스트한다.
>
>    → 인라인 작업을 한번에 할 필요는 없다.
>
> 5. 함수 정의를 삭제한다.

**핵심**

— 항상 단계를 잘게 나눠서 처리해야 한다.

— 함수를 작게 만들어두면 인라인을 단번에 처리 할 수 있을 때가 많다.

## 6.3 변수 추출하기

**지역 변수 활용**

- 표현식이 너무 복잡해서 어려울 때 활용한다.
- 지역 변수를 쪼개 관리하면 쉬워진다.
- 복잡한 로직을 구성하는 단계마다 이름을 붙인다.
  ⇒ 코드의 목적을 명확하게 드러낼 수 있다.
- 변수 추출은 표현식에 이름을 붙이고 싶다는 뜻이다.
  **⇒ 변수가 아닌 주로 함수로 추출해야한다.**
- 문맥을 넓히면 다른 코드에서 사용 할 수 있으므로, 표현식을 중복 작성하지 않아도 된다.
  ⇒ 중복이 적으면서 의도가 잘 드러나야 한다.

**단점**

- 할일이 늘어난다.
  ⇒ 많이 늘어날 거 같으면, 질의 함수로 바꾸기를 적용할 때까지 둔다
  ⇒ 간단히 처리가능하면 클래스 내에 함수 추출하기를 적용한다.

**예시**

```jsx
function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.01, 100);
  return basePrice - quantityDiscount + shipping;
}
```

**예시 Class version**

```jsx
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }
  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }
  get price() {
    return this.basePrice - this.quantityDiscount - this.shipping;
  }
  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }
  get shipping() {
    return Math.min(this.basePrice - 0.1, 100);
  }
}
```

**Class Version**

→ 객체의 장점을 볼 수 있다.

→ 특정 로직과 데이터를 외부에 공유하려 할 떄, 문맥이 되어준다.

## 6.4 변수 인라인하기

변수는 함수 안에서 표현식을 가리키는 이름이다.

원래 표현식과 다를바 없을 때도 있다.

> **절차**
>
> 1. 대입문은 우변에서 부작용이 생기지는 않는지 확인한다.
> 2. 변수가 불변으로 선언되지 않았다면 불변으로 만든 후 테스트한다.
> 3. 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문 우변의 코드로 바꾼다.
> 4. 테스트한다.
> 5. 변수를 사용하는 부분을 모두 교체 할때까지 반복한다.
> 6. 변수 선언문과 대입문을 지운다.
> 7. 테스트한다.

## 6.5 변수 인라인하기

**함수?**

- 프로그램의 작은 부분으로 나누는 주된 수단이다
- 연결부 역할을 한다
  - 잘못 정의되면 지속적인 방해 요인이 된다.
  - 연결부에서 가장 중요한 것은 함수의 이름이다.
    → 호출문만 보고 역할을 파악해야 한다.
- 매개변수는 함수의 문맥을 설정한다.

  1. **동작에 필요한 모듈 수가 줄면?**

     → 수정시 파악할 내용이 줄어든다.

  2. **동작에 필요한 모듈 수가 넓으면?**

     → 인터페이스와 결합된다.

     → 하지만, 여러 속성에 접근가능하다. 내부 로직이 복잡해져도 함수 호출 코드를 일일히 찾아서 변경할 필요가 없다.

     ⇒ 캡슐화 수준이 높아진다
     **정답은 없다. — 무엇이 옳은지 리팩토링과 친숙해지자**

     > **간단한 절차**
     >
     > 1. 매개 변수 참조하는 곳은 없는지 확인
     > 2. 메서드 선언을 원하는 형태로 바꾼다.
     > 3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바꾼 형태로 수정
     > 4. 테스트
     >    **마이그레이션 절차**
     >
     > 5. 이어지는 추출 단계를 수월하게 만들어야 한다면, 함수 본문을 적절히 리팩터링한다.
     > 6. _함수 본문을 새로운 함수로 추출한다._
     > 7. 추출한 함수에 매개변수를 추가해야 한다면 간단한 절차를 따라 추가한다.
     > 8. 테스트한다
     > 9. 기존 함수를 인라인한다.
     > 10. 이름을 임시로 붙이면 함수 선언 바꾸기를 한번 더 적용해서 원래 이름으로 되돌린다.
     > 11. 테스트한다.

## 6.6 변수 캡슐화하기

**함수**

- 함수는 데이터보다 다루기 수월하다.
- 이름을 바꾸거나 모듈로 옮기기 어렵지 않다.

**데이터**

- 함수보다 다루기 까다롭다.
- 참조하는 모든 부분을 바꿔야 코드가 제대로 작동한다.
- 유효범위가 넓어질 수록 다루기 어렵다.
  ⇒ 전역 데이터가 골치거리인 이유
- 데이터로의 접근을 독점하는 함수를 만드는 것이 캡슐화의 좋은 방법이다.

**데이터 캡슐화**

- 데이터를 변경하고 사용하는 코드를 감시할 수 있는 통로가 된다.
- 변경 전 검증이나 후 로직을 쉽게 끼울 수 있다.
- 함수 통해서만 접근하는 것도 좋다.
  **⇒ 데이터 결합도가 높아지는 것을 막는다.**
  ⇒ private 으로 객체 데이터를 유지하는 이유이다.
- 불변데이터는 가변 데이터보다 캡슐화할 이유가 적다.
  → 변경될 일이 없어서

> **절차**
>
> 1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수를 만든다.
> 2. 정적 검사를 수행한다.
> 3. 변수를 직접 참조하던 부분을 모두 캡슐화 함수 호출로 바꾼다.
> 4. 변수의 접근 범위를 제한한다.
> 5. 테스트한다.
> 6. 변수 값이 레코드라면 레코드 샙슐화하기를 적용할지 고려한다.

예시

```jsx
//default data
{
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
}
//읽고 쓰는 함수를 정의
{
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

  function getDefaultOwner() {
    return defaultOwner;
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}
//값 캡슐화하기
{
  function getDefaultOwner() {
    return Object.assign({}, defaultOwner);
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}

// 레코드 캡슐화하기
{
  class Person {
    constructor(data) {
      this._lastName = data.lastName;
      this._firstName = data.firstName;
    }
    get lastName() {
      return this._lastName;
    }
    get firstName() {
      return this._firstName;
    }
  }

  function getDefaultOwner() {
    return Object.assign({}, defaultOwner);
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}
```

## 6.7 변수 이름 바꾸기

**명확한 프로그램의 핵심은 이름짓기이다.**

이름을 잘못 짓는 경우 예시

1. 문제에 대한 이해도가 높아져서
2. 요구가 달라져서
3. 프로그램 목적이 바뀌어서

> 절차
>
> 1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려한다.
> 2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서 하나씩 변경
>
>    → 다른곳 참조하는 변수는 외부 공개되어 적용 불가
>
>    → 값이 변하지 않으면 복제본을 만들고, 점진적 수정
>
> 3. 테스트

**예시**

```jsx
/**
 * 예시 : 변수 바꾸기
 * - 캡슐화하기
 */
{
  let tpHd = "untitle";
  let result = `<h2>${tpHd}</h2>`;
}

{
  let _title = "";
  let result = `<h2>${title()}</h2>`;
  setTitle("article title");
  function title() {
    return _title;
  }
  function setTitle(arg) {
    _title = arg;
  }
  let result = `<h2>${tpHd}</h2>`;
}

/**
 * 예시 : 상수 이름 바꾸기
 * - 점진적으로 바꾼다.
 */
{
  const cpNm = "daji Company";
}
{
  const cpNm = "daji Company";
  const companyName = cpNm;
}
```

## 6.8 매개변수 객체 만들기

**데이터 뭉치를 데이터 구조로 묶는 경우**

- 데이터 사이 관계가 명확해진다.
- 함수가 이 데이터 구조를 받을 떄 매개변수가 줄어든다.
- 원소 참조 시 같은 이름이므로 일관성이 높아진다.
  **진정한 힘은 코드를 근본적으로 바꿔준다는 것에 있다.**
  - 데이터 구조가 문제 영역을 간결하게 표현하여 추상화 개념으로 격사시킨다.
    즉, 코드 개념적인 그림을 다시 그릴 수 있다.

> **절차**
>
> 1. 적당한 데이터 구조가 마련되어 있지 않다면, 새로 만든다.
>
>    → 클래스로 만들면 동작까지 묶기 편하다.
>
> 2. 테스트한다.
> 3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
> 4. 테스트
> 5. 함수 호출 시, 데이터 구조 인스턴스를 넘기도록 수정한다.
> 6. 기존 매개변수 사용하던 코드를 새 데이터 구조 원소를 사용하도록 변경
> 7. 기존 매개변수 제거

예시

```jsx
{
  const station = {
    name: "ZB1",
    readings: [
      { temp: 47, time: "2016-11-10 09:10" },
      { temp: 53, time: "2016-11-10 09:20" },
      { temp: 58, time: "2016-11-10 09:30" },
      { temp: 53, time: "2016-11-10 09:40" },
      { temp: 51, time: "2016-11-10 09:50" },
    ],
  };
  function readingsOutsideRange(station, min, max) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }

  alerts = readingsOutsideRange(
    station,
    operationPlan.temperatureFloor,
    operationPlan.temperatureCeiling,
  );
}
//함수 선언 바꾸기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
  }
  function readingOutsideRange(station, min, max, range) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }
  alerts = readingsOutsideRange(
    station,
    operationPlan.temperatureFloor,
    operationPlan.temperatureCeiling,
  );
}
//호출문 변경하기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
  }
  function readingOutsideRange(station, range) {
    return station.readings.filter(
      (r) => r.temp < range.min || r.temp > range.max,
    );
  }
  alerts = readingsOutsideRange(station, range);
}

//진정한 객체로 거듭나기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
    contains(arg) {
      return arg >= this.min && aNumber <= this.max;
    }
  }
  function readingOutsideRange(station) {
    return station.readings.filter((r) => !r.contains);
  }
  alerts = readingsOutsideRange(station, range);
}
```

**진정한 객체로 거듭나기**

- 범위 클래스로 옮겨서 코드베이스 전바에서 값을 활용하는 방식을 간소화 할 수 있다.

## 6.9 여러 함수를 클래스로 묶기

**공통 데이터 중심으로 긴밀하게 엮인 함수무리는 클래스로 묶으면 좋다.!**

- 함수 들이 공유하는 공통 환경을 명확하게 표현할 수 있다.
- 인수를 줄여서 객체 안에서 함수 호출을 간결하게 한다.
- 다른 부분에 전달하기 위한 참조를 제공 할 수 있다.
- 함수 재구성이 유리하다.
- 새로 만든 클래스와 관련된 연산을 찾아서 새 클래스의 메서드로 뽑아내는것에도 좋다.
- **클라이언트가 객체의 핵심 데이터를 변경 할 수 있다.**
- **파생 객체를 일관되게 관리할 수 있다.**

> **절차**
>
> 1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
> 2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.
> 3. 데이터를 조작하는 로직들은 함수로 추출하여 새 클래스로 옮긴다.

## 😅

```jsx
{
  const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };
  //클라이언트1
  {
    const aReading = acquireReading();
    const baseCharge = baseRate(aReading.month, aReading.year);
  }
  {
    //클라이언트2
    const aReading = acquireReading();
    const baseCharge = baseRate(aReading.month, aReading.year);
    const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
  }
  {
    //클라이언트3
    const aReading = acquireReading();
    const basicChargeAmount = calculateBaseCharge(aReading);
    function calculateBaseCharge(aReading1) {
      return baseRate(aReading.month, aReading.year);
    }
  }
}
```

## ☺️

```jsx
//1. 레코드를 캡술화한다.
{
  class Reading {
    constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }
    get customer() {
      return this._customer;
    }
    get quantity() {
      return this._quantity;
    }
    get month() {
      return this._month;
    }
    get year() {
      return this._year;
    }
    // 2. 데이터를 얻자마자 객체로 만든다. calculateBaseCharge를 새로 만든 클래스에 옮긴다.
    // 3. 이름 바꾼다. calculateBaseCharge -> baseCharge
    get baseCharge() {
      return baseRate(aReading.month, aReading.year);
    }
    get taxableCharge() {
      return Math.max(0, this.baseCharge - taxThreshold(reading.year));
    }
  }

  const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

  //클라이언트1
  const rawRading = acquireReading();
  const aReading = new Reading(rawRading);
  const basicChargeAmount = aReading.baseCharge;

  //클라이언트2
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const totalCharge = Math.max(
    0,
    aReading.baseCharge - taxThreshold(aReading.year),
  );
  //클라이언트3
  const rawRading = acquireReading();
  const aReading = acquireReading();
  const taxableCharge = aReading.taxThreshold;
}
```

— 이런식으로 진행하면, 필드인지 계산된 값인지 구분 할 수 없다.

**⇒ 단일 접근 원칙을 따르므로 권장하는 방식이다**

- 파생 데이터 모두 필요한 시점에 계산된다.
  → 저장 데이터를 갱신하더라도 문제가 생기지 않는다.

## 6.10 여러 함수를 변환 함수로 묶기

**도출 작업을 한데로 모으면 좋다.**

- 검색과 갱신을 이로간된 장소에서 처리 할 수 있다.
- 로직 중복을 막을 수 있다.
  **⇒[변환 함수]를 통해 구현할 수 있다.**
  1. 원본 데이터를 이력 받아서 필요한 정보를 모두 도출 한다.
  2. 출력 데이터 필드에 넣어 반환한다.
     — 원본 데이터가 코드 안에서 갱신될 때는 클래스로 묶는 편이 훨씬 낫다.
     → 변환 함수로 묶으면 가공한 데이터를 새로운 레코드에 저장하므로 일관성이 깨질 수 있다.
- 한데 묶는 것을 도출 로직 중복을 피하기 위해서이다.

> **절차**
>
> 1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
> 2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록한다. 그런 다음 크라이언트 코드가 이 필드를 사용하도록 수정한다.
> 3. 테스트한다.
> 4. 나머지 함숟 위 과정에 따라 처리한다.

- **변환 함수 내에서는 결과 객체를 매번 복제할 필요없이 마음껏 변경해도 된다.**
  ⇒ 단, 원본 측정값 레코드는 변경하지 않아야한다.

```jsx
{
  const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };
  //클라이언트1
  {
    const aReading = acquireReading();
    const baseCharge = baseRate(aReading.month, aReading.year) * quantity;
  }
  {
    //클라이언트2
    const aReading = acquireReading();
    const baseCharge =
      baseRate(aReading.month, aReading.year) * aReading.quantity;
    const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
  }
  {
    //클라이언트3
    const aReading = acquireReading();
    const basicChargeAmount = calculateBaseCharge(aReading);
    function calculateBaseCharge(aReading) {
      return baseRate(aReading.month, aReading.year);
    }
  }
}
//---------------------------------------------------------------------
{
  function enrichReading(original) {
    //입력객체 복사하여 반환
    const result = JSON.parse(JSON.stringify(original));
    return result;
  }

  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);

  function enrichReading(original) {
    let result = JSON.parse(JSON.stringify(original));
    result.baseCharge = calculateBaseCharge(result);
    result.basicChargeAmount = calculateBaseCharge(result);
    //미가공 측정값에 기본 소비량을 부가 정보로 붙인다
    return result;
  }
}
```

- **샘플링 test 폴더 테스트 참고**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb9568ae-f4e6-4ef6-97f4-d538b1ea3ef9/Untitled.png)

## 6.10 단계 쪼개기

각각 별개 모듈로 나누기

- 서로 다른 두 대상을 한버껀데 다루는 경우에 좋다.
- 간편한 방법
  - 동작을 연이은 두 단계로 쪼갠다
  - 입력값을 다루기 편한 상태로 가공한다
  - 로직을 순차적인 단계로 분리한다 ex) 컴파일러
  -

**⇒ 코드 영역이 다른 데이터와 함수를 사용한다면 단계 쪼개기에 적합하다**

> **절차**
>
> 1. 두번째 단계에 해당하는 코드를 독립 함수로 추출한다
> 2. 테스트
> 3. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다
> 4. 테스트
> 5. 추출한 두 번째 단계 함수의 매개변수를 검토한다. 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮긴다.
> 6. 첫번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 한다.
