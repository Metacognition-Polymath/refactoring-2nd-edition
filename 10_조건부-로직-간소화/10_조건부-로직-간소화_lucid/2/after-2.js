/**
 *  @param {{ seniority: number, monthDisabled: number,isPartTime: boolean}} anEmployee
 * */
function disabilityAmount(anEmployee) {
	const isNotEligibleForDisability = () => anEmployee.seniority < 2 || anEmployee.monthDisabled > 12 || anEmployee.isPartTime;
	
	if (isNotEligibleForDisability())
		return 0;
}

function funcAnd(anEmployee) {
	if((anEmployee.onVacation) && (anEmployee.seniority > 10)) return 1;
	
	return 0.5;
}