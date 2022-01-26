// 예시1
function raise(aPerson, factor) {
	aPerson.salary = aPerson.salary.multiply(1 + factor);
}



function usd(number) {
	return undefined;
}

/**
 *  가변적으로 함수를 쓸수 잇게 바꾼다
 * */
function withinBand(usage, bottom, top) {
	if (usage > bottom) {
		return Math.min(usage, top) - bottom;
	}
	
	return 0;
}


function baseCharge(usage) {
	if (usage < 0) return usd(0);
	const amount = withinBand(usage, 0, 100) * 0.03 + withinBand(usage, 100, 200) * 0.05 + withinBand(usage, 200, Infinity) * 0.87;
	return usd(amount);
}
