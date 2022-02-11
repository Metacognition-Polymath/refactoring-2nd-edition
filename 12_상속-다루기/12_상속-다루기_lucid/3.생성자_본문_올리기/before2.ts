

class Employee {
  protected _name: string;
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get isPrivileged() { return true }

  protected assignCar() {}

}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    /** 서브클래스에서 수행한다. */
    if (this.isPrivileged) this.assignCar();
  }

  get grade(): any {
    return this._grade;
  }

  set grade(value: any) {
    this._grade = value;
  }
  private _grade: any;

}

const employee = new Employee('hello');

// employee.assignCar('a') 호출이 안된다 하위클래스에서만 생성되게 할수 있다
