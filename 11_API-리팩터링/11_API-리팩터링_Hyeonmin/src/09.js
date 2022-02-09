/*
- 건강보험 애플리케이션에서 사용하는 점수 계산 함수
- 복잡한 함수를 잘게 쪼개 명령 객체로 리팩터링하는 과정
*/

const score = (candidate, medicalExam, scoringGuide) => {
  let result = 0
  let healthLevel = 0
  let highMedicalRiskFlag = false
  if (medicalExam.isSmoker) {
    healthLevel += 10
    highMedicalRiskFlag = true
  }
  let certificationGrade = 'regular'
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = 'low'
    result -= 5
  }
  result -= Math.max(healthLevel - 5, 0)
  return { result, certificationGrade, highMedicalRiskFlag }
}

const scoringGuide = { stateWithLowCertification: state => state === 'CA' || state === 'ME' }
console.log(score({ originState: 'CA' }, { isSmoker: true }, scoringGuide))
console.log(score({ originState: 'NY' }, { isSmoker: false }, scoringGuide))