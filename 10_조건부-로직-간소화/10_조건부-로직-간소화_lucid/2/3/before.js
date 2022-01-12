function someFinalComputation() {
	return {amount: 500, reasonCode: ''};
}

/**
 *  @param {{ isSeparated: boolean, isRetired: boolean }} employee
 * */
function payAmount(employee) {
	let result = {amount: 0, reasonCode: ''};
	if (employee.isRetired) return {amount: 0, reasonCode: 'SEP'}
	if (employee.isRetired) return {amount: 0, reasonCode: "REP"}
	// 급여 계산 로직
	// lorem
	return someFinalComputation();
}