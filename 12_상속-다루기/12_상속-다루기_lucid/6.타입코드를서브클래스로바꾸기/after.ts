type Type = "engineer" | "manager" | "salesperson";

class Employee {
  private readonly _name: string;
  private readonly _type: Type;

  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
  validateType(arg){
    if (['engineer','manager','salesperson'].indexOf(arg) === -1){
      throw new Error(`${arg} 라는 직원 유형은 업슷빈다.`)
    }
  }
  getType(){
    return this._type;
  }
  toString() {
    return `${this._name} (${this._type})`
  }

}

class Engineer extends Employee {
  getType(): Type {
    return 'engineer';
  }
}

class Manager extends Employee{
  getType(): "engineer" | "manager" | "salesperson" {
    return 'manager';
  }
}


class SalesPerson extends Employee {
  getType(): "engineer" | "manager" | "salesperson" {
    return 'salesperson';
  }
}

/** 생성자는 객체를 반환할수 있지만 선택 로직을 생성자에 넣으려 하면 필드 초기화와 로직이 꼬여서 엉망이 될수있다. 그러니 생성ㅅ자를 팩터리 함수로
 *  바꿔서 선택 로직을 담을 별도 장소를 마련한다.
 * */
// const createEmployee = (name, type) => new Employee(name,type);


const createEmployee = (name, type: Type) => {
  switch (type){
    case 'engineer': return new Engineer(name, type)
    case 'manager': return new Manager(name, type)
    case 'salesperson': return new SalesPerson(name, type)
  }
};
