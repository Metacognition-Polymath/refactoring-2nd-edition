// product 추론
const product = {
  discountThreshold: 5, // 5개 이상 초과 구매 시 할인 적용
  basePrice: 10000,
  discountRate: 0.05, // 할인율 5%
};

// shippingMethod 추론
const shippingMethod = {
  discountThreshold: 30000, // basePrice(구매액 = 가격 * 수량)이 30000원 이상이면 배송할인 적용
  discountedFee: 0, // 3000원 이상 구매 시 배송비 무료
  feePerCase: 2500, // 개당 배송비 2500원
};

function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return (price = applyShipping(priceData, shippingMethod)); // 최종 결과를 담은 상수들(price)도 깔끔하게 정리
}

// 첫 번째 단계를 처리하는 함수
function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return {
    basePrice,
    quantity,
    discount,
  };
}

// 두 번째 단계를 처리하는 함수
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return (price = priceData.basePrice - priceData.discount + shippingCost); // 최종 결과를 담은 상수들(price)도 깔끔하게 정리
}

console.log(priceOrder(product, 3, shippingMethod));

// node 6_11_after.js
