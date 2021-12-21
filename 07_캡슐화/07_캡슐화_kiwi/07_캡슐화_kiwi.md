### 7.1 레코드 캡슐화하기

**배경**

레코드는 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장 해야하는 치명적인 단점이 있다.

ex)

```jsx
const myWaterCart = {price: 1500, amount: 5}
const totalPrice = myWaterCart.price * myWaterCart.amount
```

이 때문에 가변 데이터를 저장하는 용도로는 레코드보다 객체를 추천한다.

저장 로직을 숨긴 채 여러가지 값을 각각의 메서드로 제공할 수 있다.

필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있다.

포맷(Json, Xml)으로 직렬화할 때도 포맷을 수정하거나 데이터 수정이 용이해진다.

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