let defaultOwnerData = { firstName: '마틴', lastName: '파울러' }

export const defaultOwner = () => (new Person(defaultOwnerData))
export const sertDefaultOwner = arg => {
  defaultOwnerData = arg
}

class Person {
	constructor(data) {
		this._lastName = data.lastName;
		this._firstName = data.firstName;
	}
	get lastName() {return this._lastName;}
	get firstName() {return this._firstName;}
}