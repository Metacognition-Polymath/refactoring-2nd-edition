/** 두 클래스로부터 슈퍼 클래스 추출 공통 동작을 명확히 드러낼수 있다. */

/** 1. 우선 빈 큰 슈퍼클래스를 만들고 두 클래스가 이를 확장하도록 한다 */
class Party {

  protected _name: any;
  protected _monthlyCost: any;
  /**
   *  슈퍼클래스 추출하기를 저굥할때 데이터부터 바꿔나가자.
   *  생성자를 호출하자
   * */
  constructor(name, monthlyCost) {
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost(): any {
    return this._monthlyCost;
  }
  /** 이름관련된걸처리했으니  메서드를 올리자. */
  get annualCost() {
    return this.monthlyCost * 12
  }

}

class Employee extends Party{
  private _id: any;
  // private _name: any;
  // private _monthlyCost: any;

  constructor(name, id, monthlyCost) {
    super(name, monthlyCost);
    this._id = id;
    // this._name = name;
    // this._monthlyCost = monthlyCost;
  }

  /**
   *  이름도 다르고 본문 코드도 다르다. 하지만 역활은 똑같다. 함수 선언 바꾸기로 이름을 통일 하자.
   * */
  // get annualCost() {
  //   return this._monthlyCost * 12
  // }

  get id(): any {
    return this._id;
  }
  // get name(): any { return this._name; }
  // get monthlyCost(): any {
  //   return this._monthlyCost;
  // }

}

class Department extends Party {
  // private _name: any;
  private _staff: [];

  constructor(name, staff) {
    const monthlyCost = staff.map(e => e.monthlyCost).reduce((sum,cost) => sum + cost);
    super(name, monthlyCost)
    // this._name = name;
    this._staff = staff
  }
  get staff(): any {
    return this._staff;
  }

  // get name(): any {return this._name;}

  // get monthlyCost(){
  //   return this.staff.map(e => e.monthlyCost).reduce((sum,cost) => sum + cost)
  // }
  get headCount(){
    return this.staff.length;
  }
  // 이름을 바꿔줫다 이름을 통일해줫다
  // 메서드 올리기를 진행한다
  // get annualCost(){
  //   return this.totalMonthlyCost * 112;
  // }
}
