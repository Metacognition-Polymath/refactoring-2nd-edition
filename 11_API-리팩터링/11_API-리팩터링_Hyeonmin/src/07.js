/*
- 사람의 속성 중 이름은 객체를 생성한 뒤라도 변경될 수 있겠지만, id는 그러면 안 된다.
- 이 의도를 명확히 알리기 위해 id 세터를 제거해보자.
*/

class Person {
	name;
	id;

	constructor(id) {
		this.id = id;
	}
	get name() {
		return this.name;
	}
	set name(name) {
		this.name = name;
	}
	get id() {
		return this.id;
	}
}
const martin = new Person("1234");
martin.name = "Martin";
console.log(martin);