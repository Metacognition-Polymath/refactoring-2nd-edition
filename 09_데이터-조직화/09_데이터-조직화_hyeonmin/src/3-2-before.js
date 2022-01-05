class ProductionPlan {

	constructor(production) {
		this._production = production;
		this._adjustments = [];
	}
  get production() {
    return this._production
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