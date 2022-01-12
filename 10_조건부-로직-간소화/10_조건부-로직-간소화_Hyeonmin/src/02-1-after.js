const disabilityAmount = anEmployee => {
  if (isNotEligibleForDisability()) return 0;
  // 장애 수당 계산

	function isNotEligibleForDisability() {
		return ((anEmployee.seniority < 2)
						|| (anEmployee.monthsDisabled > 12)
						|| (anEmployee.isPartTime));
	}
}