class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  set name(aString) {
    this._name = aString;
  }
  get name() {
    return this._name;
  }
  get country() {
    return this._country;
  }
  set country(value) {
    this._country = value;
  }
}

export const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});

/**
 * 상수 캡슐화하기
 * @returns
 */
export function getRawDataOfOrganization() {
  return organization;
}

// --------------------------------------------------------------

let customerData = {
  1920: {
    name: "martin",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55, // 나머지 달 생략
      },
      2015: {
        1: 70,
        2: 63, // 나머지 달 생략
      },
    },
  },
};

function getCustomerData() {
  return customerData;
}

export function getRawDataOfCustomers() {
  return customerData._data;
}

export function setRawDataOfCustomer(arg) {
  customerData = new CustomerData(arg);
}

export function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().usage(customerID, laterYear, month);
  const earlier = getCustomerData().usage(customerID, laterYear, month);
  return { laterAmount: later, change: later - earlier };
}

class CustomerData {
  constructor(data) {
    this._data = data;
  }
  //쓰기 캡슐화
  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
  //읽기 캡슐화
  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
}

setRawDataOfCustomer(customerData);
customerData.setUsage(1920, 2016, 3, 10);
