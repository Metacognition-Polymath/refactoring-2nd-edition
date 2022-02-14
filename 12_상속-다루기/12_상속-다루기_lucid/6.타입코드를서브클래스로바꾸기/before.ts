class Employee {
  private readonly _name: string;
  private readonly _type: 'engineer'|'manager'|'salesperson';

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
  toString() {
    return `${this._name} (${this._type})`
  }

}