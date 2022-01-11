const people = ['조커', '사루만', '간달프']
const sendAlert = () => {}

let found = false;
for (const p of people) {
	if (!found) {
		if (p === '조커'){
			sendAlert();
			found = true
		}
		if (p === '사루만'){
			sendAlert();
			found = true
		}
	}
}