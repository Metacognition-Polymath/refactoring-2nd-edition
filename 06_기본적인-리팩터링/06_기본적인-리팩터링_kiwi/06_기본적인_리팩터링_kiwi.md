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
