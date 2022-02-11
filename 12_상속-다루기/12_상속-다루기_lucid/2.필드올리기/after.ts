class Employee {
  protected name: string
}

class SalesPerson extends Employee {
  get firstName(){
    return this.name.charAt(0);
  }
}

class Engineer extends Employee{
  get lastName(){
    return this.name.slice(1, this.name.length);
  }
}

const salesPerson = new SalesPerson()
const engineer = new Engineer()