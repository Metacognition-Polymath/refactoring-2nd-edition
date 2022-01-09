const disabilityAmount = (anEmployee) => {
  //장애수당 적용 여부 확인
  const isNotEligibleForDisability = () => {
    anEmployee.seniority < 2 || anEmployee.monthsDisabled > 12 || anEmployee.isPartTime;
  };
  if (isNotEligibleForDisability()) return 0;
};
