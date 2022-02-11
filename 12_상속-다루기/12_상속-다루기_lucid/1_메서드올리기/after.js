class Party {
	constructor() {
	}
	
	get monthlyCost() {
		return 30;
	}
	
	
	/** 구현을 바로하면 좋겟지만 놓칠수도 있다*/
	// get annualCost() {
	// 	return this.monthlyCost * 12;
	// }
	get annualCost(){
		return new Error('구현하세요')
	}
	
}


class Employee extends Party {}

class Department extends Party {
}


const employee = new Employee();
const department = new Department();

console.log(
	employee.annualCost, department.annualCost,
	employee.annualCost === department.annualCost ? '동일합니다' : '불일치합니다'
)