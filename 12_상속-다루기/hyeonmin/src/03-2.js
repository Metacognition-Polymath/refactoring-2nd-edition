class SubclassResponsibilityError extends Error {}

class Employee {
	#name;
	#grade;
	constructor(name, grade) {
		this.#name = name;
		this.#grade = grade;
	}
	get isPrivileged() {
		throw new SubclassResponsibilityError();
	}

	get grade() {
		return this.#grade;
	}

	assignCar() {
		console.log(this.#name, "car assigned");
	}

	finishConstruction() {
		if (this.isPrivileged) this.assignCar();
	}
}

class Manager extends Employee {
	constructor(name, grade) {
		super(name, grade);
		this.finishConstruction();
	}
	get isPrivileged() {
		return this.grade > 4;
	}
}

class Producer extends Employee {
	constructor(name, grade) {
		super(name, grade);
		this.finishConstruction();
	}
	get isPrivileged() {
		return this.grade > 5;
	}
}

const roy = new Employee("로이");
const jay = new Manager("제이", 4.1);
const kay = new Producer("케이", 6);
