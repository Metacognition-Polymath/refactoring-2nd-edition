class Account {
  public type: AccountType;
  public _daysOverdrawn: number;

  constructor(accountType: AccountType, daysOverdrawn: number) {
    this.type = accountType;
    this._daysOverdrawn = daysOverdrawn;
  }

  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0)
      result += this.type.overdraftCharge(this.daysOverdrawn); //인라인하기 -> 위임 메소드 삭제가능
    return result;
  }

  overdraftCharge() {
    //위임메소드 - 정리된 메소드를 호출
    return this.type.overdraftCharge(this.daysOverdrawn);
  }

  get daysOverdrawn() {
    return this._daysOverdrawn;
  }
}

class AccountType {
  public _type: string;
  constructor(type: string) {
    this._type = type;
  }
  get isPremium() {
    return this._type === "Premium";
  }
  //기능을 복사한 후 정리
  overdraftCharge(daysOverdrawn: number) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (daysOverdrawn - 7) * 0.85;
    } else return daysOverdrawn * 1.75;
  }
}
