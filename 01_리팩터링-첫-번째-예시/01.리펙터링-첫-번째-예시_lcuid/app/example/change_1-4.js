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
	
	let result = `\t청구 내역 (고객명: ${invoice.customer})\n`
	
	for (let perf of invoice.performances) {
		// 청구 내역을 출력한다.
		result += `\t${playFor(perf).name}: ${krw(amountFor(perf) / 100)} (${perf.audience}석)\n`; // 한 번 밖에 사용하지 않는 변수는 바로 써주웠다
	}
  //  기존에 함수 안에 들었던 변수들을 독립시켜서 roof 를 세번씩 돌려줬다
	result += `\t총액: ${krw((totalAmount() / 100))}\n`
	result += `\t적립 포인트: ${totalVolumeCredit()}점\n`
	
	return result;
	
	function playFor(aPerformance) {
		
		return plays[aPerformance.playID];
	}
	
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
	
	function totalVolumeCredit() {
		
		let result = 0
		for (let perf of invoice.performances) {
			result += Math.max(perf.audience - 30, 0);
			if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);
		}
		return result
	}
	
	function totalAmount() {
		let result = 0;
		for (let perf of invoice.performances){
			result += amountFor(perf)
		}
		return result;
	}
	
	function krw(aNumber) {
		return new Intl.NumberFormat('ko-KR',
			{
				style: "currency", currency: "KRW",
				minimumFractionDigits: 2
			}).format(aNumber);
	}
}


module.exports = {
	statement
};