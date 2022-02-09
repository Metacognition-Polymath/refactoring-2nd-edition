/**
 * Test Case - country가 불일치
 */
const orderData = {
  country: "KO",
};

const countryData = {
  shippingRules: {
    KOR: 82,
  },
};

class ShippingRules {
  constructor(data) {
    this.data = data;
  }
}

//[예외를 구분할 식별 방법]
class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류 ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return "OrderProcessingError";
  }
}

const errorList = [];

//[예외 핸들러]
// - 콜스택 상위에 해당 예외처리 할 예외 핸들러 작성
// - 처음에는 모든 예외를 던진다.
// - 적절 처리하는 핸들러 존재하면, 지금 콜스택도 처리하도록 확장한다.
try {
  calculateShippingCosts(orderData);
} catch (e) {
  console.log(e); //{ [OrderProcessingError: 주문 처리 오류 -23] code: -23 }
  if (e instanceof OrderProcessingError) {
    errorList.push({ order: orderData, errorCode: e.code });
  }
  throw e;
}

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23); //오류 대신 예외 던지기
}
function calculateShippingCosts(order) {
  // ...
  localShippingRules(order.country);
  // ...
}
