const assert = require('assert');

class Customer {
  _discountRate
  applyDiscount(number) {
    if (!this._discountRate) return number
    const discountedPrice = number - this._discountRate * number;
    return Math.max(discountedPrice, 0);
  }
  set discountRate(number) {
    assert(number === null || number >= 0)
    this._discountRate = number
  }
}

const aCustomer = new Customer();
aCustomer.discountRate = 0.2;
console.log(aCustomer.applyDiscount(2000));