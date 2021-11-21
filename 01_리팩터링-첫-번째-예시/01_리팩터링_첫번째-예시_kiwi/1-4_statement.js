const plays = require("./data/plays.json");
const invoice = require("./data/invoices.json");

function statement(invoice, plays) {
	let result = `청구 내역 (고객명: ${invoice.customer})\n`;
	for (let perf of invoice.performances) {
		result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
			perf.audience
		}석)\n`;
	}
	result += `총액: ${usd(totalAmount())}\n`;
	result += `적립 포인트: ${totalVolumeCredits()}점\n`;
	return result;

	// 총액 계산 함수
	function totalAmount() {
		let result = 0;
		for (let perf of invoice.performances) {
			result += amountFor(perf);
		}
		return result;
	}
	// 포인트 계산 함수
	function totalVolumeCredits() {
		let result = 0;
		for (let perf of invoice.performances) {
			result += volumeCreditsFor(perf);
		}
		return result;
	}
	// 화폐 단위통일 함수
	function usd(aNumber) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}
	// 적립 포인트 계산 코드
	function volumeCreditsFor(aPerformance) {
		let volumeCredits = 0;
		volumeCredits += Math.max(aPerformance.audience - 30, 0);
		if ("comedy" === playFor(aPerformance).type)
			volumeCredits += Math.floor(aPerformance.audience / 5);
		return volumeCredits;
	}
	// play 변수 제거하기
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	// switch문 코드 조각 추출
	function amountFor(aPerformance) {
		let result = 0;

		switch (playFor(aPerformance).type) {
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
				throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
		}
		return result;
	}
}

console.log(statement(invoice, plays));
