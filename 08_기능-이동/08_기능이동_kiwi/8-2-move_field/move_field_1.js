module.exports = class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._discountRate = discountRate;
      this._contract = new CustomerContract("2021-12-29");
    }
  
    get discountRate() {
      return this._discountRate;
    }
  
    becomePreferred() {
      this._discountRate += 0.03;
  
      // 다른 멋진 일들
    }
  
    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._discountRate));
    }
  }
  
  class CustomerContract {
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
