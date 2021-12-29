const order = retreiveOrder();
const pricingPlan = retirvePricingPlan(); // 위와 첫번째의 위치를 바꿔주었다(명렬지의 분리, 아무 부수효과 없음을 확인해야 함수 위치를 바꿔줄수있다)
const baseCharge = pricingPlan.base;
let charge;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
charge = baseCharge + units * chargePerUnit;
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);

let discount; // step 1 자신을 참조하는 첫 번째 코드 바로 앞까지 언제든지 이동 가능
discount = discountableUnits * pricingPlan.discountFactor;
if (order.isRepeat) discount += 20; // 여기부터 슬라이드 하고 싶지만.  discount chargeOrder 가 둘다해서 마음대로 움직일수없다.
charge = charge - discount;
chargeOrder(charge);




