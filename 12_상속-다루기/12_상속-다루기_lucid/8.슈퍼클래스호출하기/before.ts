class Employee {
  private _id: any;
  private _name: any;
  private _monthlyCost: any;

  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }

  get annualCost() {
    return this._monthlyCost
  }

  get id(): any {
    return this._id;
  }

  get name(): any {
    return this._name;
  }

  get monthlyCost(): any {
    return this._monthlyCost;
  }

}

class Department {
  private _name: any;
  private _staff: [];

  constructor(name, staff) {
    this._name = name;
    this._staff = staff
  }
  get staff(): any {
    return this._staff;
  }

  get name(): any {
    return this._name;
  }

  get totalMonthlyCost(){
    return this.staff.map(e => e.monthlyCost).reduce((sum,cost) => sum + cost)
  }
  get headCount(){
    return this.staff.length;
  }
  get totalAnnualCost(){
    return this.totalMonthlyCost * 112;
  }
}
