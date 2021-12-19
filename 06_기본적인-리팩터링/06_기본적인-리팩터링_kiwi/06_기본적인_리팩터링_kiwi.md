### 6.0

- 가장 많이 사용하는 리팩터링 : 함수 추출하기 ↔ 함수 인라인하기, 변수 추출하기 ↔ 변수 인라인하기
- 함수 선언 바꾸기: 함수의 이름을 변경할때 많이씀(함수의 인수 추가 및 제거할때 사용됨)
- 변수 이름 바꾸기: 변수 캡슐화 하기와 관련이 깊음
- 매개변수 객체 만들기 : 자주 함께 뭉쳐 다니는 인수들을 객체 하나로 묶을 때 많이 사용
- 여러 함수를 클래스로 묶기 : 함수를 그룹으로 묶을 때 사용
- 여러 함수를 변환 함수로 묶기 : 읽기 전용 데이터를 다룰 때 특히 좋다.
- 단계 쪼개기 : 모듈들의 작업 처리 과정을 명확한 단계로 구분짓기 위해 사용



### 6.1 함수 추출하기

반대 리팩터링 : 함수 인라인하기

**배경**

1. 목적과 구현을 분리(저자가 원하는 방향)
    - 무슨일을 하는 지 파악하는데 비용이 많이 든다면 빼자
    - 목적을 함수의 이름에서 드러내기 때문에 파악이 빨라진다.
    

함수의 이름을 잘지어야 효과가 잘 발휘됩니다.

절차

---

1. 함수의 목적을 드러내는 이름을 붙임(어떻게가 아닌 '무엇을' 하는지가 드러나야 한다.)
2. 추출할 코드를 새 함수에 복사
3. 참조하는 지역변수는 인수로 전달
    - 새 함수에서만 사용되는 변수는 지역변수로
    - 지역변수의 값을 변경할 경우 새 함수의 결과로 전달
4. 새로 만든 함수를 호출하는 문으로 수정(위임)
5. 테스트
6. 다른 코드에 중복되거나 비슷한 코드가 없는지 확인하고 해당 코드에도 적용할지 검토한다.

**예시**

```jsx
function printOwing(invoice) {
	let outstanding = 0;

  console.log("***************");
  console.log("*** 고객 채무 ***");
  console.log("***************");

  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);

	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```

```jsx
function printOwing(invoice) {
	let outstanding = 0;

  printBanner();
  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);
	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
  printDetails();

  function printBanner(){
      console.log("***************");
      console.log("*** 고객 채무 ***");
      console.log("***************");
  }
  function printDetails(){
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}
```

### 6.2 함수 인라인하기

**본문 코드가 함수명만큼이나 명확하거나 간접 호출이 과하게 많을 경우 사용**

반대 리팩터링 : 함수 추출하기

1. 서브 클래스에서 오버라이딩된 메서드인지 체크
    - 오버라이딩된 메서드는 인라인 금지
2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 각 호출문을 함수 본문으로 교체한다.
4. 하나씩 교체할 때마다 테스트한다.(점진적으로)
5. 원래 함수를 삭제

Before

```jsx
function getRaintg(driver) {
   return moreThanFiveLateDeilveries(driver) ? 2: 1;
 }
 function moreThanFiveLateDeilveries(dvr) {
   return dvr.numberOFLateDeliveries > 5;
 }
```

After

```jsx
function getRaintg(driver) {
   return driver.numberOFLateDeliveries > 5 ? 2: 1;
 }
```


### 6.3 변수 추출하기

**배경**

표현식이 너무 복잡해서 이해하기 어려울 때가 있다.

이럴 때 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.

- 복잡한 로직을 구성하는 단계마다 변수로 이름 붙이기
- 디버깅 시 break point 설정 용이
- (주의) 문맥을 고려하여 현재 선언된 함수보다 더 넓은 문맥에서까지 의미가 된다면 함수로 추출하는 것을 권장

**절차**

1. 추출할 표현식에 사이드이펙트가 없는지 확인한다.
2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입
3. 새로 만든 변수로 교체
4. 테스트
5. 표현식을 여러 곳에서 사용하면 싹 찾아서 교체한다.

**예시**

```jsx
const pad2digit = digit => digit.length >= 2 ? digit : `0${digit}`
```

Before 

```jsx
const timerFormat = value => `${pad2digit(`${parseInt(value / 60)}`)}:${pad2digit(`${value % 60}`)}`
```

After 

```jsx
const timerFormat = value => {
    const _minutes = parseInt(value / 60)
    const minutes = pad2digit(`${_minutes}`)
    const seconds = pad2digit(`${value % 60}`)

    return `${minutes}:${seconds}`
}
```


### 6.4 변수 인라인하기

**배경**

- 변수명이 원래 표현식과 다를바 없을 때
- 변수가 주변 코드를 리팩터링하는 데 방해가 될 때

**절차**

1. 인라인할 표현식에 사이드이펙트가 없는지 확인
2. 상수인지 확인하고 상수로 수정 후 테스트
3. 변수에 값이 단 한번만 대입되는지 확인
4. 변수를 표현식으로 교체

**예시**

Before

```jsx
const isEnd = next > -1;
return isEnd;
```

After

```jsx
return next > -1;
```

### 6.5 함수 선언 바꾸기

**함수 이름 바꾸기**

함수 시그니처 바꾸기

**배경**

- 이름이 잘못된 함수를 발견 즉시 수정한다.
    
    주석이 좋은 이름을 짓는데 도움이 됨
    
- 마이그레이션 절차의 복잡도에 따라 **간단한 절차**와 **마이그레이션 절차**로 구분지어 따름

**절차**

- 간단한 절차
    1. 매개변수 제거 시, 참조하는 곳이 있는지 확인
    2. 메서드 선언 변경

- **마이그레이션 절차**
    1. 함수 본문을 새 함수로 추출
    2. 새 함수에 인자 추가 시 간단한 절차로 추가
    3. 테스트
    4. assertion을 추가하여 실제로 사용하는지 검사 가능
    5. 기존 함수가 새 함수를 호출하도록 전달 함수로 수정
    6. 예전 함수를 쓰는 코드를 새 함수를 호출하도록 수정
    7. 임시 이름을 붙인 새 함수를 원래 이름으로 수정

### **예시**

**Before**

```jsx
// 암호화 파라미터로 유효성 검사 !== getLoanInfo
const getLoanInfo = async (encryptParam) => {
  const { validationCode } = await checkValidation({ encryptParam });
  handleInvalid(VALID_CODE[validationCode]);
};
```

**After**

```jsx
// 호출되는 곳이 없으면 제거
const getLoanInfo = async (encryptParam) => await nfValidation(encryptParam);

const nfValidation = async (encryptParam) => {
  const { validationCode } = await checkValidation({ encryptParam });
  handleInvalid(VALID_CODE[validationCode]);
};
```


### 6.6 변수 캡슐화하기

**배경**

- 접근 범위가 넓은 데이터를 그 데이터로의 접근을 독점하는 함수로 캡슐화
    - 추가 로직을 쉽게 끼워넣을 수 있음
- 불변 데이터는 변경될 일이 없기 때문에 캡슐화 불필요

**절차**

1. 변수의 접근과 갱신을 전담하는 함수 선언
2. 정적 검사 수행
3. 변수에 직접 참조하던 부분을 모두 캡슐화 함수 호출로 수정
4. 수정할 때마다 테스트
5. 변수의 접근 범위를 제한
6. 같은 모듈로 옮기고 접근함수만 export
7. 테스트
8. 원본 데이터의 변경이 필요할 때
9. getter에서 데이터 복제 후 전달
10. 레코드 캡슐화하기 (클레스로 감싸기)
11. **주의** nested object일 경우 불충분할 수 있음

**예시**

```jsx
let defaultAgreements = [
    // ...
]

```

**Before**

```jsx
class Agreements {
    constructor() {
        this._agreements = defaultAgreements
    }

    get agreements() {return this._agreements}
    setAgreements(arg) {this._agreements = arg}

    // 약관 하나 체크
    handleAgreementChange(id) {
        this.agreements.some((item) => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item.id === id
        })
    }

    // 약관 전체 동의
    handleAgreementAllChange() {
        this.agreements.forEach((item) => {
            item.checked = true
        })
    }
}

```

**After**

```jsx
const agreements = () => cloneDeep(defaultAgreements) // lodash.cloneDeep

class Agreements {
    constructor() {
        this._agreements = agreements()
    }

    get agreements() {return this._agreements}
    setAgreements(arg) {this._agreements = arg}

    // 약관 하나 체크
    handleAgreementChange(id) {
        this.agreements.some((item) => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item.id === id
        })
    }

    // 약관 전체 동의
    handleAgreementAllChange() {
        const nextList = this.agreements.map((item) => {
            item.checked = true
            return item
        })
        this.setAgreements(nextList)
    }
}
```


### 6.7 변수 이름 바꾸기

**배경**

명확한 프로그래밍의 핵심은 이름짓기이다.

호출 한 번으로 끝나지 않고 값이 영속되는 필드라면 신중하게 이름 짓기

**절차**

1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려하기
2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다.
3. test!!!

**예시**

**Before**

```jsx
const a = width * height;
```

**After**

```jsx
const area = width * height;
```


### 6.8 매개변수 객체 만들기

**배경**

- 데이터 뭉치를 데이터 구조(객체)로 묶기
- 이 데이터 구조가 문제 영역을 간결하게 나타내는 추상 영역으로 간주되어 코드의 개념적인 그림을 다시 설계할 수 있음

**절차**

1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
2. 테스트한다.
3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
4. 테스트한다.
5. 함수 호출 시 데이터 구조 인스턴스를 넘기도록 수정한다, 수정할 때마다 테스트한다.
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

**예시**

**Before**

```jsx
const station = {
    name: 'ZB1',
    readings: [
        {temp: 47, time: "2016-11-10 09:10"},
        {temp: 53, time: "2016-11-10 09:20"},
        {temp: 58, time: "2016-11-10 09:30"},
        {temp: 53, time: "2016-11-10 09:40"},
        {temp: 51, time: "2016-11-10 09:50"}
    ]
}

const operationPlan = {
    temperatureFloor: 50,
    temperatureCeiling: 55
}

const readingsOutsideRange = (station, min, max) => {
    return station.readings.filter(r => r.temp < min || r.temp > max)
}

const alerts = readingsOutsideRange(station, operationPlan.temperatureFloor, operationPlan.temperatureCeiling)
```

**After**

1.**데이터 구조 추가**

```jsx
class NumberRange {
    constructor(min, max) {
        this._data = {min, max}
    }

    get min() {return this._data.min}
    get max() {return this._data.max}
}
```

2. **1 에서만든 데이터 구조를 매개변수로 추가**

```jsx
const readingsOutsideRange = (station, min, max, range = {}) => {
    return station.readings.filter(r => r.temp < min || r.temp > max)
}
```

3. **새 데이터 구조 인스턴스를 매개변수로 전달**

```jsx
const range = new NumberRange(50, 55)

const alerts = readingsOutsideRange(station, operationPlan.temperatureFloor, range)

```

1.  **새 매개변수 사용**

```jsx
const readingsOutsideRange = (station, range) => {
    return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
}
```

5.  **NumberRange 클래스에 readingsOutsideRange 로직 옮기기**

```jsx
class NumberRange {
    constructor(min, max) {
        this._data = {min, max}
    }

    get min() {return this._data.min}
    get max() {return this._data.max}

    contains(arg) {return arg >= this.min && arg <= this.max}
}

const readingsOutsideRange = (station, range) => {
    return station.readings.filter(r => !range.contains(r.temp))
}
```


---
### 6.9 여러 함수를 클래스로 묶기

**배경**
- 특정한 데이터에 대한 여러 함수 뭉치가 있을 때 해당 데이터와 함수를 하나의 클래스로 묶는다.

**절차**
1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.(함수 옮기기)
3. 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮긴다.


**예시**
```jsx
  const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };
```

before
```jsx
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
```

after
```jsx
// 1. 레코드를 캡슐화합니다.
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

// 2. 데이터를 얻자마자 객체로 만들어야한다.
// 이 과정에서 메서드 이름을 원하는대로 수정
// 변수 인라인하기
        get baseCharge() {
            return baseRate(aReading.month, aReading.year);
        }
        get taxableCharge() {
            return Math.max(0, this.baseCharge - taxThreshold(reading.year));
        }
    }

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

파생 데이터 모두를 필요한 시점에 게산되게 만들어 저장된 데이터를 갱신하더라도 문제가 생길 일이 없도록 한다.<br/>
어쩔 수 없이 가변 데이터를 사용해야하고 다른 부분에서 데이터 갱신할 확률이 높다면 클래스로 묶어두어 큰 도움이된다.
