const assert = require("assert");

class Customer {
  _discountRate;
  applyDiscount(number) {
    if (!this._discountRate) return number;
    console.log(assert(this._discountRate >= 0));
    assert(this._discountRate >= 0);
    return number - this._discountRate * number;
  }
  set discountRate(number) {
    assert(number === null || number >= 0);
    this._discountRate = number;
  }
}

const customer = new Customer();
// assert 조건 미충족시 -> code - 'ERR_ASSERTION
// customer.discountRate = -0.2;
customer.discountRate = 0.2;
console.log(customer.applyDiscount(3));
