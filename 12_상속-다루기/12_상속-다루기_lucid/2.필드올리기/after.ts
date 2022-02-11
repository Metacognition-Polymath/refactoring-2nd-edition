class Employee {
  protected name: string;
  constructor(name: string) {
    this.name = name
  }
}

class SalesPerson extends Employee {
  // constructor(name: string) {
  //   super(name);
  // }
  get firstName(){
    return this.name.charAt(0);
  }
}

class Engineer extends Employee{
  readonly _skill: 'typescript' | 'java' | 'cpp'

  constructor(name: string, skill) {
    super(name);        // 생성자 호출시 무조건 super 로 호출한다. 부모를
    this._skill = skill;
  }
  get lastName(){
    return this.name.slice(1, this.name.length);
  }

  get skill(){
    return this._skill;
  }
}

const salesPerson = new SalesPerson('lucid')
const engineer = new Engineer('paul', 'typescript')

console.log(engineer.lastName, salesPerson.firstName)