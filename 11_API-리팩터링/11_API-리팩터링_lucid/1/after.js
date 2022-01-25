function setOffAlarms() {}

// TODO:: 1) 첫 단계는 함수를 복제하고 질의 목적에 맞는 이름짓기다.
function findMicsreant(peoples) {
	for (const people of peoples) {
		if (people === '조커'){
			// setOffAlarms() TODO:: 2) 새 질의 함수에서 부수효과를 낳은 부분을 제거한다
			return '조커'
		}
		if (people === '사루만'){
			// setOffAlarms();
			return '사루만';
		}
	}
	return  ''
	
}

const alertForMicreant = (peoples) => {
	for (const people of peoples) {
		setOffAlarms();
	}
}

const people = ['조커','사루만','알라딘']
const found = findMicsreant(people)
alertForMicreant(people);