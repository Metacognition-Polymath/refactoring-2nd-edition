const a = (people) => {
	const youngest = getYoungestAge();
	const totalSalary = totalSalary();
	
	return `최연소 ${youngest}, 총 급여: ${totalSalary}`
	
	function getYoungestAge() {
		let youngest = people[0] ? people[0].age : Infinity;
		for (const p of people){
			if (p.age < youngest) youngest = p.age;
			// totalSalary += p.salary; step: 2. q부수효과가 있는 코드 한쪽에 남기고 제거
		}
		return youngest;
	}

	
	function getTotalSalary(){
		let result = 0;
		for (const p of people){
			result += p.salary;
		}
		return result;
	}
}

