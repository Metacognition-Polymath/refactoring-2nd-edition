class Employee {}
class SalesPerson extends Employee {
  private name: string;
}

class Engineer extends Employee{
  private name: string;
}

const salesPerson = new SalesPerson()
const engineer = new Engineer()