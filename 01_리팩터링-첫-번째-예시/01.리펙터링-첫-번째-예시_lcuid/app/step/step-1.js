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
		const play = plays[perf.playID];
		let thisAmount = amountFor(perf, play);
		
		// 포인트를 적립한다
		volumeCredits += Math.max(perf.audience - 30, 0);
		
		if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
		
		// 청구 내역을 출력한다.
		result += `\t${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
		totalAmount += thisAmount;
	}
	result += `\t총액: ${format((totalAmount / 100))}\n`
	result += `\t적립 포인트: ${volumeCredits}점\n`
	
	function amountFor(perf, play) {
		let result = 0;  // 명확한 이름으로 벼녁ㅇ
		
		switch (play.type) {
			case "tragedy":
				result = 40000;
				if (perf.audience > 20) {
					result += 1000 * (perf.audience - 30)
				}
				break;
			case "comedy":
				result = 30000;
				if (perf.audience > 20) {
					result += 1000 + 500 * (perf.audience - 20)
				}
				result += 300 * perf.audience;
				break;
			default:
				throw new Error("알수 없는 장르:" + play.type)
		}
		return result;
	}
	
	return result;
	
}



module.exports = {
	statement
};