const {log} = require("../util");

/**
 *  @typedef {object} invoice
 *  @property {string} customer
 *  @property {object} performances
 * */


/**
 *  @typedef {object} performances
 *  @property {string} playID
 *  @property {number} audience
 *
 * */

function statement(invoice, plays) {
	log(invoice, plays, 'args')
	
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `\t청구 내역 (고객명: ${invoice.customer})\n`
	
	const format = new Intl.NumberFormat('ko-KR',
		{
			style: "currency", currency: "KRW",
			minimumFractionDigits: 2
		}).format;
	
	
	for (let perf of invoice.performances) {
		// const play = playFor(perf.playID); // 우변을 함수화 하기
		// let thisAmount = amountFor(perf, playFor(perf)); 한 번 밖에 사용하지 않는 변수는 바로 써주웠다(42Line)
		
		// 포인트를 적립한다
		volumeCredits += Math.max(perf.audience - 30, 0);
		
		if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
		
		// 청구 내역을 출력한다.
		result += `\t${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
		totalAmount += amountFor(perf);
	}
	result += `\t총액: ${format((totalAmount / 100))}\n`
	result += `\t적립 포인트: ${volumeCredits}점\n`
	
	function amountFor(aPerformance) { // aPerformance 를 넣고 play 에 의존되어있는 변수를  다 변경했다
		let result = 0;  // 명확한 이름으로 변경
		
		switch (playFor(aPerformance).type) {
			case "tragedy":
				result = 40000;
				if (aPerformance.audience > 20) {
					result += 1000 * (aPerformance.audience - 30)
				}
				break;
			case "comedy":
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 1000 + 500 * (aPerformance.audience - 20)
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error("알수 없는 장르:" + playFor(aPerformance).type)
		}
		return result;
	}
	
	function playFor(aPerformance) {
		
		return plays[aPerformance.playID];
	}
	return result;
	
}



module.exports = {
	statement
};