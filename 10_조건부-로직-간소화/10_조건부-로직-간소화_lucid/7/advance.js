const people = ['조커', '사루만', '간달프']

const sendAlert = () => {
}

const checkForMiscreants = (people) => {
	if (people.some(p => ['조커','사루만'].includes(p))) sendAlert();
	// TODO:: 근사한 집합 연산 지원
}