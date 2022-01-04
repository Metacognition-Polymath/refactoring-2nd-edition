class Organ {

	/**
	 *  @param data {{ name: string, country: name}}
	 * */
	constructor(data) {
		this._name = data.name;
		this._country = data.country;
	}
	get name() { return this._name }
	set name(aString) { this._name = aString }
	
}

const org = new Organ({ name: '1', country: 'korea'})
