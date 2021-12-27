### 7.1 레코드 캡슐화하기

**배경**

- 레코드는 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장 해야하는 치명적인 단점이 있다.

ex)

```jsx
const myWaterCart = {price: 1500, amount: 5}
const totalPrice = myWaterCart.price * myWaterCart.amount
```

- 이 때문에 가변 데이터를 저장하는 용도로는 레코드보다 객체를 추천한다.

- 저장 로직을 숨긴 채 여러가지 값을 각각의 메서드로 제공할 수 있다.

- 필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있다.

- 포맷(Json, Xml)으로 직렬화할 때도 포맷을 수정하거나 데이터 수정이 용이해진다.

**절차**

1. 레코드를 담은 변수를 캡슐화한다.
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
3. 테스트한다.
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하도록 바꾼다, 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트한다.
6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
7. 테스트한다.
8. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다.

**예시**

```jsx
//before
const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
});

function getOrganization() {
  return organization;
}

//after
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

result += `<h1>${getOrganization().name}</h1>`; // read
getOrganization().name = newName; // write
```

```jsx
customerData[customerID].usages[year][month] = amount;

// 읽기 예
function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];

  return {
    lateAmount: later,
    chnage: later - earlier,
  };
}
```

```jsx
const customerData = {
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
      },
      2015: {
        1: 70,
        2: 63,
      },
    },
  },
  38673: {
    name: "닐 포드",
    id: "38673",
  },
};

function getCustomerData() {
  return customerData;
}

function getRawDataOfCustomers() {
  return customerData._data;
}

function setRawDataOfCustomers(arg) {
  customerData = new CustomerData(arg);
}

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }

  get rawData() {
    return Object.assign({}, this._data);
  }

  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
}

getCustomerData().setUsage(customerID, year, month, amount);

function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().usage(customerID, laterYear, month);
  const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
  return { laterAmount: later, change: later - earlier };
}
```




### 7.2 컬렉션 캡슐화하기

**배경**

- 필요한 인터페이스만 노출하자
- 무분별한 Getter/Setter 보다 Getter할 대상의 필요한 인터페이스(add, remove, etc.)만 노출

**절차**

1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
3. 정적 검사를 수행한다.
4. 컬렉션에 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기 전용 프락시나 복제본을 반환하게 한다.
6. 테스트한다.

**예시**

before
```jsx
class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }

  get name() {
    return this._name;
  }

  get isAdvanced() {
    return this._isAdvanced;
  }
}

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this._courses;
  }

  set courses(aList) {
    this._courses = aList;
  }
}

const basicCourseNames = readBaseCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

for (const name of readBaseCourseNames(filename)) {
  aPerson.addCourse(new Course(name, false));
}
```
after
```jsx
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }

  get courses() {
    return this.courses.slice();
  }

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }

  removeCourse(aCourse, fbIfAbsent = () => {throw new RangeError();}) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) { fbIfAbsent(); 
	else this._courses.splice(index, 1);
  }

  set courses(aList) {
    this._courses = aList.slice();
  }
}
```


### 7.3 기본형을 객체로 바꾸기

**배경**

- 단순히 String이나 Number로 사용되던 특정 상태를 객체로 바꿉니다.
- 객체로 바꾸면 함수를 추가할 수 있으므로 상태 비교등을 객체 내부로 캡슐화할 수 있습니다.

**절차**

1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
2. 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
3. 정적 검사를 수행한다.
4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
6. 테스트한다.
7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

**예시**

before

```jsx
class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priority() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

class Priority {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return this._value;
  }
}

```

```jsx
class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priority() {
    return this._priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

class Priority {
  constructor(value) {
    if (value instanceof Priority) {
      return value;
    }

    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`<${value}}> is invalid for Priority`);
    }
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }

  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }

  toString() {
    return this._value;
  }

  equals(other) {
    return this._index === other._index;
  }

  higherThan(other) {
    return this._index > other._index;
  }

  lowerThan(other) {
    return this._index < other._index;
  }
}
```


### 7.4 임시 변수를 질의 함수로 바꾸기

**배경**

- 비즈니스 로직에 있는 계산된 임시 변수를 제거합니다.
- 계산된 임시 변수는 함수로 캡슐화합니다.

**절차**

1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
2. 읽기전용으로 만들 수 잇는 변수는 읽기전용으로 만든다.
3. 테스트한다.
4. 변수 대입문을 함수로 추출한다.
5. 테스트한다.
6. 변수 인라인하기로 임시 변수를 제거한다.

**예시**

```jsx
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    var basePrice = this._quantity * this._itemPrice;
    var discountFactor = 0.98;

    if (basePrice > 1000) {
      discountFactor -= 0.03;
    }

    return basePrice * discountFactor;
  }
}
```

```jsx
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get basePrice() {
    return this._quantity * this._itemPrice;
  }

  get discountFactor() {
    var discountFactor = 0.98;

    if (basePrice > 1000) {
      discountFactor -= 0.03;
    }

    return discountFactor;
  }

  get price() {
    return this.basePrice * this.discountFactor;
  }
}
```


### 7.5 클래스 추출하기

**배경**

- 클래스의 부분 [데이터, 로직]을 별개의 클래스로 추출하여 역할을 분리할 수 있습니다.
- 데이터와 메서드를 따로 묶을 수 있는 경우
- 함께 변경되는 일이 많거나 서로 의존하는 데이터
- 제거해도 다른 필드나 메서드에 문제 없으면 분리 가능

**절차**

1. 클래스의 역할을 분리할 방법을 정한다.
2. 분리될 역할을 담당할 클래스를 새로 만든다.
3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
4. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
5. 메서드들도 새 클래스로 옮긴다. 이때 저수준 메서드, 즉 다른 메서드를 호출하기 보다는 호출을 당하는 메서드부터 옮기며 옮길 때마다 테스트한다.
6. 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 새로운 환경에 맞게 바꾼다.
7. 새 클래스를 외부로 노출할지 정한다. 노출하려거든 새 클래스에 참조를 값으로 바꾸기를 적용할 지 고민해본다.

**예시**

before

```jsx
class Person {
  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}
```

after

```jsx
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
}

class TelephoneNumber {
  get areaCode() {
    return this.areaCode;
  }

  set areaCode(arg) {
    this.areaCode = arg;
  }

  get number() {
    return this.number;
  }

  set number(arg) {
    this.number = arg;
  }

  get toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
}
```


### 7.6 **클래스 인라인하기**

**배경**

- 제 역할을 못 해서 그대로 두면 안 되는 클래스가 대상
    - 역할을 옮기는 리패터링 후 특정 클래스에 남은 역할이 거의 없을 때 주로 발생
    - 이 클래스의 역할을 가장 많이 사용하는 클래스로 흡수
- 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때에도 사용
    - 두 클래스를 인라인 해서 하나로 합친 두, 다시 새로운 클래스로 추출(7.5)

**절차**

1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
2. 소크 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
4. 소스 클래스를 삭제하고 조의를 표한다.

**예시**

before

```jsx
class Shipment {
  get trackingInfo() {
    return this.trackingInformation.display;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}

class TrackingInformation {
  get shippingCompnay() {
    return this._shippingCompnay;
  }

  set shippingCompnay(arg) {
    this._shippingCompnay = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }

  get display() {
    return `${this.shippingCompnay}: ${this.trackingNumber}`;
  }
}
```

after

```jsx
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }

  get shippingCompnay() {
    return this._shippingCompnay;
  }

  set shippingCompnay(arg) {
    this._shippingCompnay = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
}
```



### 7.7 위임 숨기기

**배경**

- 모듈화 설계를 제대로 하는 핵심은 캡슐화
- 클라이언트가 위임 객체의 존재를 몰라도 되도록 감춤

**절차**

1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
2. 클라이언트가 위임 객체 대신 서버를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
3. 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
4. 테스트한다.

**예시**

**Before**

```jsx
class Department {
  get chargeCode() {
    return this._chargeCode;
  }

  set chargeCode(arg) {
    this._chargeCode = arg;
  }

  get manager() {
    return this._manager;
  }

  set manager(arg) {
    this._manager = arg;
  }
}
```

**After**

```jsx
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get department() {
    return this._department;
  }

  set department(arg) {
    this._department = arg;
  }
}
```



### 7.8 중개자 제거하기

**배경**

```
클라이언트가 위임 객체의 다른 기능을 사용하고 싶을 대마다 서버에 위임 메서드 추가 필요
차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 수 있음
위임 숨기기(7.7)과의 균형점은 상황에 따라 다름
```

- 서버 클래스가 단순히 중개자 역할만 할 때

**절차**

1. 위임 객체를 얻는 게터를 만든다.
2. 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
3. 모두 수정했다면 위임 메서드를 삭제한다.
    - 자동 리팩터링 도구를 사용할 때는 위임 필드를 캡슐화(6.6)한 다음, 이를 사용하는 모든 메서드를 인라인(6.2)한다.

**예시**

**Before**

```jsx
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

**After**

```jsx
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }

  set department(arg) {
    this._department = arg;
  }
}

class Departement {
  constructor() {}
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    return (this._manager = arg);
  }
}

const aPerson = new Person();
const manager = aPerson.department.manager;
```




