class Party {}

class Employee extends Party {
  private _id: number;
  private _name: string;
  private _monthlyCost: number;

  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost
  }
}

class Department extends Party {
  private _name: string;
  private _staff: string;
  
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
}
