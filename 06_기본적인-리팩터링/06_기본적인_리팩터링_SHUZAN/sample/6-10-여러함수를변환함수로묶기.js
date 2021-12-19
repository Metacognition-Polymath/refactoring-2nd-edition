{
  const reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };
  //클라이언트1
  {
    const aReading = acquireReading();
    const baseCharge = baseRate(aReading.month, aReading.year) * quantity;
  }
  {
    //클라이언트2
    const aReading = acquireReading();
    const baseCharge =
      baseRate(aReading.month, aReading.year) * aReading.quantity;
    const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
  }
  {
    //클라이언트3
    const aReading = acquireReading();
    const basicChargeAmount = calculateBaseCharge(aReading);
    function calculateBaseCharge(aReading) {
      return baseRate(aReading.month, aReading.year);
    }
  }
}
//---------------------------------------------------------------------
{
  function enrichReading(original) {
    //입력객체 복사하여 반환
    const result = JSON.parse(JSON.stringify(original));
    return result;
  }

  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);

  function enrichReading(original) {
    let result = JSON.parse(JSON.stringify(original));
    result.baseCharge = calculateBaseCharge(result);
    result.basicChargeAmount = calculateBaseCharge(result);
    //미가공 측정값에 기본 소비량을 부가 정보로 붙인다
    return result;
  }
}
