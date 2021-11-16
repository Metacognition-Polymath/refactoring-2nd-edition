/**
 *  @typedef {object} data
 *  @property {string} customer
 *  @property {object} performances
 * */


class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance;
		this.play = aPlay;
	}
	
	get amount(){
		let result = 0;  // 명확한 이름으로 변경
		
		switch (this.play.type) {
			case "tragedy":
				result = 40000;
				if (this.performance.audience > 20) {
					result += 1000 * (this.performance.audience - 30)
				}
				break;
			case "comedy":
				result = 30000;
				if (this.performance.audience > 20) {
					result += 1000 + 500 * (this.performance.audience - 20)
				}
				result += 300 * this.performance.audience;
				break;
			default:
				throw new Error("알수 없는 장르:" + this.performance.play.type)
		}
		return result;
	}
	
}

/**
 *  @typedef {object} performances
 *  @property {string} playID
 *  @property {number} audience
 *
 * */

function createStatement(invoice, plays) {
	const statementData = {
		customer: invoice.customer, //  고객데이터를 중간 데이러토 옮김
		performances: invoice.performances.map(enrichPerformance),
		totalAmount: 0,
		totalVolumeCredit: 0
	};
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredit = totalVolumeCredit(statementData);
	
	return statementData;
	
	function enrichPerformance(aPerformance) { // 얇은 복사를 해서 가변 데이터를 만들지 않기 위해
		const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance))
		const result = Object.assign({}, aPerformance);
		result.play = calculator.play;
		result.amount = calculator.amount;
		return result;
	}
	
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	
	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0)
	}
	
	function volumeCreditFor(aPerformance) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		
		if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5)
		
		return result
	}
	
	function totalVolumeCredit(data) {
		return data.performances.reduce((total, p) => {
			total += volumeCreditFor(p)
			return total
		}, 0)
	}
	
	function amountFor(aPerformance) { // aPerformance 를 넣고 play 에 의존되어있는 변수를  다 변경했다
		let result = 0;  // 명확한 이름으로 변경
		
		switch (aPerformance.play.type) {
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
				throw new Error("알수 없는 장르:" + aPerformance.play.type)
		}
		return result;
	}
}


// function renderPlainText(data) {
// 	let result = `\t청구 내역 (고객명: ${data.customer})\n`
//
// 	for (let perf of data.performances) {
// 		// 청구 내역을 출력한다.
// 		result += `\t${perf.play.name}: ${krw(perf.amount / 100)} (${perf.audience}석)\n`; // 한 번 밖에 사용하지 않는 변수는 바로 써주웠다
// 	}
// 	//  기존에 함수 안에 들었던 변수들을 독립시켜서 roof 를 세번씩 돌려줬다
// 	result += `\t총액: ${krw((data.totalAmount / 100))}\n`
// 	result += `\t적립 포인트: ${data.totalVolumeCredit}점\n`
//
// 	return result;
//
//
// }


module.exports = {
	createStatement
};