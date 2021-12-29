const a = (people) => {
	let youngest = people[0] ? people[0].age : Infinity;
	let totalSalary = 0;
	for (const p of people){
	 if (p.age < youngest) youngest = p.age;
		// totalSalary += p.salary; step: 2. q부수효과가 있는 코드 한쪽에 남기고 제거
	}
	
	for (const p of people){ //  step: 1 반복문을 복사한다.
		totalSalary += p.salary;
	}
	return `최연소 ${youngest}, 총 급여: ${totalSalary}`
}

