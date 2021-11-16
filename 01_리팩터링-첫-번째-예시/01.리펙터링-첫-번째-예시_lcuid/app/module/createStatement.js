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
	
	get volumeCredit(){
		let result = 0;
		result += Math.max(this.performance.audience - 30, 0);
		
		if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5)
		
		return result
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
	statementData.totalVolumeCredit = totalVolumeCredit
	
	return statementData;
	
	function enrichPerformance(aPerformance) { // 얇은 복사를 해서 가변 데이터를 만들지 않기 위해
		const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance))
		const result = Object.assign({}, aPerformance);
		result.play = calculator.play;
		result.amount = calculator.amount;    // 실제 amount 로 옮기기전에 amountFor 에서 클래스 생성하고 점검을했어야함
		result.volumeCredit = calculator.volumeCredit; // 테스트 케이스에서 유효하지 않은 객체가 생기니 실패함
		return result;
	}
	
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	
	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0)
	}
	
	function totalVolumeCredit(data) {
		return data.performances.reduce((total, p) => {
			total += p.volumeCredit;
			return total
		}, 0)
	}
}

module.exports = {
	createStatement
};