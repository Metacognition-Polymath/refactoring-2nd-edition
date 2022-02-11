class Party {
	constructor() {
	}
	
	get monthlyCost() {
		return 30;
	}
}


class Employee extends Party {
	get annualCost() {
		return this.monthlyCost * 12;
	}
}

class Department extends Party {
	get annualCost() {
		return this.monthlyCost * 12;
	}
}


const employee = new Employee();
const department = new Department();

console.log(
	employee.annualCost, department.annualCost,
	employee.annualCost === department.annualCost ? '동일합니다' : '불일치합니다'
)