const disabilityAmount = anEmployee => {
  if ((anEmployee.seniority < 2) ||
	(anEmployee.monthsDisabled > 12) ||
	(anEmployee.isPartTime)) return 0
  // 장애 수당 계산
}