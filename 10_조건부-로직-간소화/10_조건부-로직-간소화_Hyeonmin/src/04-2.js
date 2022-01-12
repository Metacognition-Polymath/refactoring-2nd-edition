/*
1. 다형성 적용을 위해 클래스 생성 : 여러 함수를 클래스로 묶기 적용
2. 기본 동작을 담당할 슈퍼클래스 생성
3. 변형 동작을 담당할 서브클래스 생성
*/

function rating(voyage, history) {
	return new Rating(voyage, history).value;
}

class Rating {
	constructor(voyage, history) {
		this.voyage = voyage;
		this.history = history;
	}

	get value() {
		// 투자 등급
		const vpf = this.voyageProfitFactor;
		const vr = this.voyageRisk;
		const chr = this.captainHistoryRisk;
		if (vpf * 3 > vr + chr * 2) return "A";
		return "B";
	}

	get voyageProfitFactor() {
		// 항해 경로 위험요소
		let result = 1;
		if (this.voyage.length > 4) result += 2;
		if (this.voyage.length > 8) result += this.voyage.length - 8;
		if (["중국", "동인도"].includes(this.voyage.zone)) result += 4;
		return Math.max(result, 0);
	}

	get voyageRisk() {
		// 선장의 항해이력 위험요소
		let result = 1;
		if (this.history.length < 5) result += 4;
		result += this.history.filter((v) => v.profit < 0).length;
		if (voyage.zone === "중국" && hasChina(this.history)) result -= 2;
		return Math.max(result, 0);
	}

	get captainHistoryRisk() {
		// 수익 요인
		let result = 2;
		if (this.voyage.zone === "중국") result += 1;
		if (this.voyage.zone === "동인도") result += 1;
		if (this.voyage.zone === "중국" && this.hasChinaHistory) {
			result += 3;
			if (this.history.length > 10) result += 1;
			if (this.voyage.length > 12) result += 1;
			if (this.voyage.length > 18) result -= 1;
		} else {
			if (this.history.length > 8) result += 1;
			if (this.voyage.length > 14) result -= 1;
		}
		return result;
	}

	get hasChinaHistory() {
		return this.history.some((v) => v.zone === "중국")
	}
}

const voyage = { zone: "서인도", length: 10 };
const histories = [
	{ zone: "동인도", profit: 5 },
	{ zone: "서인도", profit: 15 },
	{ zone: "중국", profit: -2 },
	{ zone: "서아프리카", profit: 7 },
];
const myRating = rating(voyage, histories);
console.log({
	voyageRisk: voyageRisk(voyage),
	captainHistoryRisk: captainHistoryRisk(voyage, histories),
	voyageProfitFactor: voyageProfitFactor(voyage, histories),
	myRating,
});
