/*
- 건강보험 애플리케이션에서 사용하는 점수 계산 함수
- 복잡한 함수를 잘게 쪼개 명령 객체로 리팩터링하는 과정

1. 빈 클래스 생성
2. 함수를 해당 클래스로 이동
3. 명령이 받는 인수들은 생성자로 이동
(execute 메서드는 매개변수를 받지 않도록 하는 것을 추천)
4. 모든 지역변수를 필드로 변경
5. 함수 추출하기로 계산 로직 구조화하기
*/
class Scorer {
	constructor(candidate, medicalExam, scoringGuide) {
		this._candidate = candidate;
		this._medicalExam = medicalExam;
		this._scoringGuide = scoringGuide;
	}
	execute() {
		this._result = 0;
		this._healthLevel = 0;
		this._highMedicalRiskFlag = false;
		if (this._medicalExam.isSmoker) {
			this._healthLevel += 10;
			this._highMedicalRiskFlag = true;
		}
		this.scoreSmoking();
		this._certificationGrade = "regular";
		this._result -= Math.max(this._healthLevel - 5, 0);
		return this._result;
	}

	scoreSmoking() {
		if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
			this._certificationGrade = "low";
			this._result -= 5;
		}
	}
}

const scoringGuide = {
	stateWithLowCertification: (state) => state === "CA" || state === "ME",
};
console.log(new Scorer({ originState: "CA" }, { isSmoker: true }, scoringGuide).execute());
console.log(new Scorer({ originState: "NY" }, { isSmoker: false }, scoringGuide).execute());
