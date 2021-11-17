// statement()에 필요한 데이터를 처리하는 함수
function createStatementData(invoice, plays) {
	const statementData = {};
	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);
	return statementData;

	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance); // 얕은 복사 수행
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result;
	}
	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}
	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
	}
	function volumeCreditsFor(aPerformance) {
		let volumeCredits = 0;
		volumeCredits += Math.max(aPerformance.audience - 30, 0);
		if ("comedy" === aPerformance.play.type)
			volumeCredits += Math.floor(aPerformance.audience / 5);
		return volumeCredits;
	}
	function amountFor(aPerformance) {
		let result = 0;
		switch (aPerformance.play.type) {
			case "tragedy": // 비극
				result = 40000;
				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case "comedy": // 희극
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
		}
		return result;
	}
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
}

export default createStatementData;