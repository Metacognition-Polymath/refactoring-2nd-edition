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