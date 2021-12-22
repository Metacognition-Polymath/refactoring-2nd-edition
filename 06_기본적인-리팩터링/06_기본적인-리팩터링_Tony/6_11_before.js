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

// 계산이 두 단계로 이루어짐
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) * // 많이 사면(product.discountThreshold 초과) 할인이 됨
    product.basePrice *
    product.discountRate;
  const shippingPerCase = // 개당 배송비
    basePrice > shippingMethod.discountThreshold // 일정가격(3만원) 이상 구매 시 할인된 배송비 적용
      ? shippingMethod.discountedFee // 할인된 배송비 : 무료
      : shippingMethod.feePerCase; // 아니면 개당 배송비 적용 : 2500원
  const shippingCost = quantity * shippingPerCase; // 배송비 = 수량 * 배송비
  const price = basePrice - discount + shippingCost; // 최종 가격 = 기본 가격 - 할인된 가격 - 배송비
  return price;
}

console.log(priceOrder(product, 3, shippingMethod));

// node 6_11_before.js
