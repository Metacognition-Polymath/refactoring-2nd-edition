const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };



//before
{
  const aReading = acquireReading();
  const baseCharge = baseRate(aReading.month, aReading.year);
}
{
  //클라이언트2
  const aReading = acquireReading();
  const baseCharge = baseRate(aReading.month, aReading.year);
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
}
{
  //클라이언트3
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);
  function calculateBaseCharge(aReading1) {
    return baseRate(aReading.month, aReading.year);
  }
}

//after
// 1. 레코드를 캡슐화합니다.
class Reading {
  constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
  }
      get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }

// 2. 데이터를 얻자마자 객체로 만들어야한다.
// 이 과정에서 메서드 이름을 원하는대로 수정
// 변수 인라인하기
      get baseCharge() {
          return baseRate(aReading.month, aReading.year);
      }
      get taxableCharge() {
          return Math.max(0, this.baseCharge - taxThreshold(reading.year));
      }
  }

    //클라이언트1
  const rawRading = acquireReading();
  const aReading = new Reading(rawRading);
  const basicChargeAmount = aReading.baseCharge;

  //클라이언트2
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const totalCharge = Math.max(
      0,
      aReading.baseCharge - taxThreshold(aReading.year),
  );
  //클라이언트3
  const rawRading = acquireReading();
  const aReading = acquireReading();
  const taxableCharge = aReading.taxThreshold;
