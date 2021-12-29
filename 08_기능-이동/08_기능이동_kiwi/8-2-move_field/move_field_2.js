module.exports = class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._contract = new CustomerContract("2021-12-29");
      this._setDiscountRate(discountRate);
    }
  
    get discountRate() {
      return this._contract.discountRate;
    }
  
    _setDiscountRate(aNumber) {
      this._contract.discountRate = aNumber;
    }
  
    becomePreferred() {
      this._setDiscountRate(this.discountRate + 0.03);
  
      // some code
    }
  
    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this.discountRate));
    }
  }
  
  class CustomerContract {
    constructor(startDate, discountRate) {
      this._startDate = startDate;
      this._discountRate = discountRate;
    }
  
    get discountRate() {
      return this._discountRate;
    }
  
    set discountRate(arg) {
      this._discountRate = arg;
    }
  }
