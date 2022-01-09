const registry = { billingPlans: { basic: "" } };

//특이케이스 객체 생성 - 리터럴 불변객체로 고정
const createUnknowCustomer = () =>
  Object.freeze({
    isUnknown: true,
    name: "occupant",
    billingPlans: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  });

//특이케이스 조건 검사 - 함수추출
const isUnknown = (arg) => {
  return arg.isUnknown;
};

class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return _customer === "unknown" ? createUnknowCustomer() : this._customer;
  }

  //특이케이스 속성
  get isUnknown() {
    return false;
  }
}

class Customer {
  constructor(name, billingPlan, paymentHistory) {
    this._name = name;
    this._billingPlan = billingPlan;
    this._paymentHistory = paymentHistory;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    return this._billingPlan;
  }

  set billingPlan(arg) {
    this._billingPlan = arg;
  }

  get paymentHistory() {
    return this._paymentHistory;
  }
}

const client1 = () => {
  const customer = new Site().customer;
  //...
  let customerName = customer.name;
};
const client2 = () => {
  const customer = new Site().customer;
  const plan = customer.billingPlan;
};
const client3 = () => {
  const customer = new Site().customer;
  const weeksDelinquent = customer.paymentHsitry.weeksDelinquentInLastYear;
};
