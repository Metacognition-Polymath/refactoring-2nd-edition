class Score {
  /**
   * [지역 변수 필드로 바꾸기]
   * - 복잡한 함수 잘게 나누기 위한 목적
   * - 함수 상태를 모두 명령 객체로 옮긴다
   * -> 함수가 사용하던 변수를 유효범위에 구애받지 않고 !함수 추출하기! 리팩토링 적용할 수 있다.
   *
   * => 명령을 중첩 함수처럼 다룰 수 있게 된다.
   *
   */
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  excute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;

    this.scoreSmoking();

    let certificationGrade = "regular";
    if (
      this._scoringGuide.stateWithLowCertification(this._candidate.originState)
    ) {
      certificationGrade = "low";
      this._result -= 5;
    }

    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }

  //함수추출하기
  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}

const score = (candidate, medicalExam, scoringGuide) => {
  return new Score(candidate, medicalExam, scoringGuide).excute();
};
