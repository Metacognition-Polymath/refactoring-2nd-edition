const payAmount = employee => {
	// 가변 변수 제거하기

	// 예외 케이스들은 모두 보호 구문으로 처리
	if (employee.isSeperated) return { amount: 0, reasonCode: 'SEP' };
	if (employee.isRetired) return { amount: 0, reasonCode: 'RET' };

	// 급여 계산 로직 처리
	const result = { amount: 100, reasonCode: 'WRK' };
	return result;
}