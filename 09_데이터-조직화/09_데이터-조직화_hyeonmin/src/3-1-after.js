const assert = require('assert');

class ProductionPlan {
	_adjustments = []
	_production = 0

  get production() {
    return this._adjustments
		.reduce((total, adjustment) => total + adjustment.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)
  }
}

const products = new ProductionPlan()
products.applyAdjustment({ name: '사과', amount: 10 })
products.applyAdjustment({ name: '바나나', amount: 20 })

console.log(products.production)