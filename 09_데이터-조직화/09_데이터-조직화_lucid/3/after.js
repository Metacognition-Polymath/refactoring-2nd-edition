const assert = require('assert')

// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
	actual: 1,
	expected: 2,
	operator: 'strictEqual'
});


class ProductionPlan {
	constructor() {
		this._adjustment = [];
		// this._calculateProduction = 0; //  TODO:: 3 필요없는것도 추가로 뺀다
		//this._production = 0;     //  TODO:: 3 필요없는것도 추가로 뺀다
	}
	
	get production() {
		// assert.strictEqual(this._production  === this.calculateProduction, true) // TODO:: 1)확인해줫다
		// return this._production
		return this._adjustment.reduce((sum, a) => sum + a.amount, 0)   // TODO:: 2) 기존따론 뺀 필드 계싼식을 넣는다
	}
	
	get adjustment() { // 조정
		return this._adjustment
	}
	
	// get calculateProduction() {return this._adjustment.reduce((sum, a) => sum + a.amount, 0);} //  TODO:: 3 필요없는것도 추가로 뺀다
	
	applyAdjustment(anAdjustment) { // assert 를 추가하자
		this._adjustment.push(anAdjustment);
		// this._production += anAdjustment.amount;        //  TODO:: 3 필요없는것도 추가로 뺀다
	}
}

const productionPlan = new ProductionPlan()
productionPlan.applyAdjustment({ amount: 2 })
const production = productionPlan.production

console.log(production)
