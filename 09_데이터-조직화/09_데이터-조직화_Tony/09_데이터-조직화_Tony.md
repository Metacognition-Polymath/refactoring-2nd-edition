# 09. 데이터 조직화

- 데이터 구조에 집중한 리팩터링
- 하나의 변수가 여러 목적 -> 변수 쪼개기(9.1)
- 변수 이름은 중요하다 -> 변수 이름 바꾸기(9.2)
- 때론 변수 자체를 없애는게 좋을 수도 있다 -> 파생 변수를 질의 함수로 바꾸기(9.3)
- 참조 vs 값 - 햇갈리는 경우
  - 참조를 값으로 바꾸기(9.4)
  - 값을 참조로 바꾸기(9.5)
- 코드 의미를 알기 어려운 리터럴(상수) -> 매직 리터럴 바꾸기(9.6)

## 9.1 변수 쪼개기

### 9.1.1 변수 쪼개기 - 개요

```js
// before
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);

// after
const perimeter = 2 * (height + width); // 사각형의 둘레
console.log(perimeter);
const area = height * width;
console.log(area);
```

### 9.1.2 변수 쪼개기 - 배경

- 변수에 값을 여러번 대입할 수 밖에 없는 경우

  - 루프 변수(for문)
  - 수집 변수(collecting variable) : e.g., i = i + something
    - 총합 계산, 문자열 연결, 스트림에 쓰기, 컬렉션에 추가하기 등

- 긴 코드의 결과를 저장하는 변수 -> 한번만 대입해야 한다.

### 9.1.3 변수 쪼개기 - 절차

1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
2. 가능하면 이때 불변(immutable)으로 선언한다.
3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 이름으로 바꾼다.
4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다.
5. 테스트한다.
6. 반복한다.
   매 반복에서 변수를 새로운 이름으로 선언하고 다음번 대입 때 까지의 모든 참조를 새 변수명으로 바꾼다.
   이 과정을 마지막 대입까지 반복한다. - 변수하나에 2번 이상 사용되고 있다면 이 과정을 반복한다는 의미인 것 같다

### 9.1.4 변수 쪼개기 - 예시

### 9.1.4 - 2. 예시: 입력 매개변수의 값을 수정할 때

![](./매개변수_호출자.png)

- 그럼에도 불구하고 매개변수를 사용할 때 변수에 담아서 사용한다.

## 9.2 필드 이름 바꾸기

### 9.2.1 필드 이름 바꾸기 - 개요

```js
// before
class Organization {
  get name() {...}
}

// after
class Organization {
  get title() {...}
}
```

### 9.2.2 필드 이름 바꾸기 - 배경

- 이름은 중요하다
- 레코드(구조체)의 필드 이름은 특히 더 중요하다
- 클래스의 게터와 세터 이름 바꾸기도 레코드 필드이름과 똑같이 중요하다

### 9.2.3 필드 이름 바꾸기 - 절차

1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다.
   이후 단계는 필요없다.
2. 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화(7.1) 한다.
3. 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.
4. 테스트한다.
5. 생성자의 매개변수 중 필드와 이름이 겹치는게 있다면 함수 선언 바꾸기(6.5)로 변경한다.
6. 접근자들의 이름도 바꿔준다(6.5).

### 9.2.4 필드 이름 바꾸기 - 예시

```js
// 필드 이름 바꾸기의 대상 레코드
const organization = { name: "애크미 구스베리", country: "GB" }; // Country code => GB: United States, KR: Korea Republic

// 2. [레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화(7.1) 한다.]
// - organization 레코드 캡슐화(7.1)

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
});
```

3. [캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.]

- 별도의 필드를 정의하고 생성자와 접근자에서 둘을 구분해 사용한다.

```js
class Organization {
  constructor(data) {
    // this._title = data.name; // _name을 _title으로 변경 -> 생성자에서 title도 받아들일 수 있도록 조치
    this._title = data.title !== undefined ? data.title : data.name;
    this._country = data.country;
  }
  get name() {
    return this._title;
  } // _title을 사용
  set name(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
```

- 인스턴스 생성 시 사용하던 name을 title로 하나씩 변경 후 다 변경하면 name을 생성자에서 제거

6. [접근자들의 이름도 바꿔준다.]

```js
class Organization {
  constructor(data) {
    // this._title = data.name; // _name을 _title으로 변경 -> 생성자에서 title도 받아들일 수 있도록 조치
    this._title = data.title;
    this._country = data.country;
  }
  get title() {
    return this._title;
  } // _title을 사용
  set title(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
```

## 9.3 파생 변수를 질의 함수로 바꾸기

### 9.3.1 파생 변수를 질의 함수로 바꾸기 - 개요

```js
// before
class SomeClass {
  get discountedTotal() {
    return this._discountedTotal;
  }
  set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old - aNumber;
  }
}

// after
class SomeClass {
  get discountedTotal() {
    return this._baseTotal - this.discount;
  } // _discountedTotal을 없앰
  set discount(aNumber) {
    this._discount = aNumber;
  }
}
```

### 9.3.2 파생 변수를 질의 함수로 바꾸기 - 배경

- 가변 데이터의 유효범위를 가능한 좁히자

### 9.3.3 파생 변수를 질의 함수로 바꾸기 - 절차

1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기(9.1)를 활용해 각 갱신 지점에서 변수를 분리한다.
2. 해당 변수의 값을 계산해주는 함수를 만든다.
3. 해당 변수가 사용되는 모든 곳에 어서션(assertion)을 추가(10.6)하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.

- 필요하면 변수 캡슐화하기(6.8)를 적용하여 어서션이 들어갈 장소를 마련해준다.

4. 테스트한다.
5. 변수를 읽는 코드를 모두 함수 호출로 대체한다.
6. 테스트한다.
7. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기(8.9)로 없앤다.

### 9.3.4 예시

### 9.3.4 - 2. 예시: 소스가 둘 이상일 때

## 9.4 참조를 값으로 바꾸기
