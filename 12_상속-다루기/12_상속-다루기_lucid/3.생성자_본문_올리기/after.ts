

class Employee {
  private _name: any;
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}
