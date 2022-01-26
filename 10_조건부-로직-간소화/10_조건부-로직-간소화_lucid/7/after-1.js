const people = ['조커', '사루만', '간달프']

const sendAlert = () => {
}

const checkForMiscreants = (people) => {
	
	let found = false;
	for (const p of people) {
		if (!found) {
			if (p === '조커') {
				sendAlert();
				found = true
			}
			if (p === '사루만') {
				sendAlert();
				found = true
			}
		}
	}
}

// TODO:: 1. 함수추출하기: 밀접한 함수만 추출한다
checkForMiscreants(people);