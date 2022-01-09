const registry = { billingPlans: { basic: "" } };

class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    //특이케이스일 경우, UnKnownCustomer 반환
    return _customer === "unknown" ? new UnKnownCustomer() : this._customer;
  }
}

class Customer {
  constructor(name, billingPlan, paymentHistory) {
    this._name = name;
    this._billingPlan = billingPlan;
    this._paymentHistory = paymentHistory;
  }

  //미확인고객여부
  get isUnknow() {
    return false;
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

class UnKnownCustomer {
  get isUnKnown() {
    return true;
  }
  get name() {
    return "occupant";
  }

  get billingPlan() {
    return registry.billingPlans.basic;
  }
  set billingPlan(arg) {
    // 무시한다.
  }

  //특이케이스가 다른 객체를 반환해야 한다면,-> 그 객체도 일반적으로 특이케이스이다.
  get paymentHsitry() {
    return new NullPaymentHistory();
  }
}
class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

const isUnknown = (arg) => {
  if (!(arg instanceof Customer) || arg === UnKnownCustomer) {
    throw new Error(`잘못된 값과 비교 <${arg}>`);
  }
  return arg === "unknown";
};

const client1 = () => {
  const customer = new Site().customer;
  customerName = customer.name;
};
const client2 = () => {
  const customer = new Site().customer;
  const plan = customer.billingPlan; //읽기
};
const client3 = () => {
  const customer = new Site().customer;
  customer.billingPlan = "new Plan"; //쓰기
};
const client4 = () => {
  const customer = new Site().customer;
  const weeksDelinquent = customer.paymentHsitry.weeksDelinquentInLastYear;
};
