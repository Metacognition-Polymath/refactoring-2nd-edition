/*****************
 * 예시 : 함수 이름 바꾸기(간단한 절차)
 * - 이해하기 쉬운 이름으로 바꾼다.
 */

{
  function circum(radius) {
    return 2 * Math.PI * radius;
  }
}
{
  function circumference(radius) {
    return 2 * radius * Math.PI;
  }
}
/*****************
 * 예시 : 함수 이름 바꾸기(마이그레이션)
 * 1. 수정 코드를 테스트
 * 2. 기존 함수 인라인
 * 3. 기존 함수 삭제
 */

{
  function circum(radius) {
    return circumference(radius);
  }
  function circumference(radius) {
    return 2 * radius * Math.PI;
  }
}
/*****************
 * 예시 : 매개 변수 추가하기
 */
{
  class Book {
    constructor() {
      this._reservations = [];
    }
    addReservation(customer) {
      this.zz_addReservation(customer);
    }
    zz_addReservation(customer) {
      this._reservations.push(customer);
    }
  }
}
{
  class Book {
    constructor() {
      this._reservations = [];
    }
    addReservation(customer) {
      this.zz_addReservation(customer);
    }
    zz_addReservation(customer, isPriority) {
      console.assert(isPriority === true || isPriority === false);
      this._reservations.push(customer);
    }
  }
}

/****************
 * 예시 : 매개 변수를 속성으로 바꾸기
 */
//기본 함수
{
  function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
  }
}
// 함수추출
{
  function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(
      aCustomer.address.state,
    );
  }
}
//함수 추출하기
{
  function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(
      aCustomer.address.state,
    );
  }
  function xxNEWinNewEngland() {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(
      aCustomer.address.state,
    );
  }
}
// 변수 인라인하기
{
  function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
  }
}
