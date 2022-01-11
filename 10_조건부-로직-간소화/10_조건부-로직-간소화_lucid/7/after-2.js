const people = ['조커', '사루만', '간달프']

const sendAlert = () => {
}


const checkForMiscreants = (people) => {
	// 반복문을 순회하지 않게 리턴을 시킨다
	// let found = false;
	for (const p of people) {
		if (p === '조커') {
			sendAlert();
			return;
		}
		if (p === '사루만') {
			sendAlert();
			return;
		}
	}
}
checkForMiscreants(people);

// the nice 한 코드

