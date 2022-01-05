class Organization {
  constructor(data) {
    this._title = data.title
    this._country = data.country
  }
  get title() {
    return this._title
  }
  set title(aString) {
    this._title = aString
  }
  get country() {
    return this._country
  }
  set country(aCountry) {
    this._country = aCountry
  }
}
const organization = new Organization({ title: '애크미 구스베리', country: 'GB' })

console.log(organization.name);
console.log(organization.title);