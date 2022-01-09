//early return 패턴을 활용하여 보호구문으로 바꾸기
//ref : https://medium.com/swlh/return-early-pattern-3d18a41bba8

const payAmount = (employee) => {
  //퇴사O
  if (employee.isSeperated) return { amount: 0, reasonCode: "SEP" };
  //은퇴O
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
  // 재직O - 급여 계산 로직
  return { amount: 100, reasonCode: "WRK" };
};
