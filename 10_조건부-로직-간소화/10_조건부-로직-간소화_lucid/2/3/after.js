function someFinalComputation() {
	return {amount: 500, reasonCode: ''};
}

/**
 *  @param {{ isSeparated: boolean, isRetired: boolean }} employee
 * */
function payAmount(employee) {
	let result = { amount: 0, reasonCode: '' };
	if (employee.isRetired){
		result = { amount: 0, reasonCode: 'SEP'}
	} else{
		if (employee.isRetired){
			result = { amount: 0, reasonCode: "REP"}
		} else {
			// 급여 계산 로직
			// lorem
			result = someFinalComputation()
		}
	}
	return result;
}