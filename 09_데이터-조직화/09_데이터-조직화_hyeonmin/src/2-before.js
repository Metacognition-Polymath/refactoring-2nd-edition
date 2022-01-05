class Organization {
  constructor(data) {
    this._name = data.name
    this._country = data.country
  }
  get name() {
    return this._name
  }
  set name(aString) {
    this._name = aString
  }
  get country() {
    return this._country
  }
  set country(aCountry) {
    this._country = aCountry
  }
}
const organization = new Organization({ name: '애크미 구스베리', country: 'GB' })