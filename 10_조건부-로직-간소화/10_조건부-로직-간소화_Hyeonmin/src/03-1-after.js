const payAmount = employee => {
  let result;

	if (employee.isSeperated) return { amount: 0, reasonCode: 'SEP' };
  if (employee.isRetired) result = { amount: 0, reasonCode: 'RET' }
  else {
    result = { amount: 100, reasonCode: 'WRK' }
  }
  return result
}