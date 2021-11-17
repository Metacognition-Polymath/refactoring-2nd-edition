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
	
	get amount() {
		throw new Error('서브클래스에서 처리하도록 설계되었습니다.')
	}
	
	get volumeCredit() {
		let result = 0;
		result += Math.max(this.performance.audience - 30, 0);
		return result
	}
	
}

class TragedyCalculator extends PerformanceCalculator {
	get amount() {      // 오버라이드 된다 하지만 상속받은 값을 추론할수 없다(결국은 타입스크립트인가)
		let result = 40000;
		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30);
		}
		return result;
	}
}

class ComedyCalculator extends PerformanceCalculator {
	get amount() {      // 오버라이딩: 하위 클래스에서 재정의하는 것을 말한다
		let result = 30000;
		if (this.performance.audience > 20) {
			result += 1000 + 500 * (this.performance.audience - 20)
		}
		result += 300 * this.performance.audience;
		
		return result;
	}
	get volumeCredit(){
		console.log(super.volumeCredit, '상위 크레딧')
		return super.volumeCredit + Math.floor(this.performance.audience / 5);
	}
}

function createPerformanceCalculator(performance, play) {
	switch (play.type) {
		case 'tragedy':
			return new TragedyCalculator(performance, play)
		case 'comedy':
			return new ComedyCalculator(performance, play)
		default:
			throw new Error('알수없는 타입')
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
	statementData.totalVolumeCredit = totalVolumeCredit(statementData)
	
	return statementData;
	
	function enrichPerformance(aPerformance) { // 얇은 복사를 해서 가변 데이터를 만들지 않기 위해
		const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
		
		// 부모 클래스를 실행 시키면 에러를 발생 시킴
		// const calculator2 = new PerformanceCalculator(aPerformance, playFor(aPerformance));
		// console.log(calculator2.amount)
		
		
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