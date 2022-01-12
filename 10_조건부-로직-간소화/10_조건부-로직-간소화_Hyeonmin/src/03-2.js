const adjustCapital = anInstrument => {
	/*
	1. 바깥쪽 조건문부터 조건을 역으로 설정하여 추출, 보호 구문으로.
	2. 예외 케이스들을 모두 보호 구문으로 변경
	3. 동일한 결과를 반환하므로, 조건문 통합 적용
	*/

	if ((anInstrument.capital <= 0)
			|| (anInstrument.interestRate <= 0)
			|| (anInstrument.duration <= 0)) return 0;

	const result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
	return result;
}