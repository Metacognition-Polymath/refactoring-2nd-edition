class ProductionPlan {
	constructor(production) {
		this._initialProduction = production;
		this._adjustments = [];
	}
  get production() {
    return this._adjustments
		.reduce((total, adjustment) => total + adjustment.amount, this._initialProduction);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}

const products = new ProductionPlan(0)
products.applyAdjustment({ name: '사과', amount: 10 })
products.applyAdjustment({ name: '바나나', amount: 20 })

console.log(products.production)