class ProductionPlan {
	private _adjustment: string[];
	
	get production() { return this._production }
	get adjustment() { return this._adjustment }
	
	applyAdjustment(anAdjustment){ // adjustment 를 적용하는 과정에서 직접 관련이 없는 누적 값 Production 까지 갱신했다.
		this._adjustment.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
	
}