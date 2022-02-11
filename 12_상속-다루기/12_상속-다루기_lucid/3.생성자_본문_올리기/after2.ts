class Employee {
  protected _name: string;
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get isPrivileged() { return true }

  /**
   *  하위에서 호출하고 테스트후 상위 클래스에 옮긴다.
   * */
  protected finishConstruction(){
    if (this.isPrivileged) this.assignCar();
  }
  protected assignCar() {}


}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction();
  }

  /** 1. 생성자에서 메서드로 함수추출한다  */
  // finishConstruction(){
  //   if (this.isPrivileged) this.assignCar();
  // }

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
