const price = (order) => {
	const basePrice = order.quantity * order.itemPrice;
	const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
	const shipping = Math.min(basePrice * 0.1, 100);
	return (
		// 가격(price) = 기본 가격 - 수량 할인 + 배송비
		basePrice - quantityDiscount + shipping
	);
};

const orderA = {
  itemPrice: 600,
  quantity: 3,
}
const orderB = {
  itemPrice: 8000,
  quantity: 2,
}

console.log(price(orderA))
console.log(price(orderB))