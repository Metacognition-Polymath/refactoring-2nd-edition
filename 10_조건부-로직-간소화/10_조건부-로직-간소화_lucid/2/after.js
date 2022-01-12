/**
 *  @param {{ seniority: number, monthDisabled: number,isPartTime: boolean}} anEmployee
 * */

function disabilityAmount(anEmployee) {
	if (anEmployee.seniority < 2 || anEmployee.monthDisabled > 12 || anEmployee.isPartTime) return 0;
}