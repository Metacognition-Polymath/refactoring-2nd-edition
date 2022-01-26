/**
 *  @param {{ seniority: number, monthDisabled: number,isPartTime: boolean, onVacation: boolean}} anEmployee
 * */

function disabilityAmount(anEmployee) {
	if (anEmployee.seniority < 2) return 0;
	if (anEmployee.monthDisabled > 12) return 0;
	if (anEmployee.isPartTime) return 0;
}

/**
 *  
 * */
function funcAnd(anEmployee) {
	if (anEmployee.onVacation){
		if (anEmployee.seniority > 10)
			return 1;
		return 0.5;
	}
}