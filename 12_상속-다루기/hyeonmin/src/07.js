/**
 * - 서브클래스의 역할을 분석해보고 굳이 존재해야할 이유가 없다면 리팩터링을 적용하자.
 * - 바로 제거하지 말고 혹시라도 이 클래스들을 사용하는 클라이언트가 있는지 살펴봐야 한다.
 */

class Person {
	#name;
	#genderCode;
	constructor(name, genderCode) {
		this.#name = name;
		this.#genderCode = genderCode;
	}
	get name() {
		return this.#name;
	}
	get genderCode() {
		return this.#genderCode;
	}
	isMale() {
		return this.#genderCode === "M";
	}
}

const createPerson = (record) => {
	switch (record.gender) {
		case "M":
			return new Person(record.name, "M");
		case "F":
			return new Person(record.name, "F");
		default:
			return new Person(record.name, "X");
	}
};
const loadFromInput = (data) => data.map((record) => createPerson(record));
const data = [
	{ name: "재남", gender: "M" },
	{ name: "지금", gender: "F" },
	{ name: "로이", gender: "M" },
];
const males = loadFromInput(data)
	.filter((p) => !p.isMale())
	.map((m) => m.name);
console.log(males);
