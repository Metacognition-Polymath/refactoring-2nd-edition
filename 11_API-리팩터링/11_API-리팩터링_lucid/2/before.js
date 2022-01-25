// 예시 1
function tenPercentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.05);
}

// 예시 2

function usd(number) {
	return undefined;
}

function bottomBand(usage) {
	return Math.min(usage, 100)
}

function middleBand(usage) {
	return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
	return usage > 200 ? usage - 200 : 0;
}

function baseCharge(usage) {
	if (usage < 0) return usd(0);
	const amount = bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.87;
	return usd(amount);
	
}