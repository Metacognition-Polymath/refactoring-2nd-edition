const pricingPlan = retirvePricingPlan();
const order = retreiveOrder();
const baseCharge = pricingPlan.base;
let charge;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
let discount;
charge = baseCharge + units * chargePerUnit;
let dicountableUntis = Math.max(units - pricingPlan.discountThreshold, 0);
discount = discountUnits * princingPlan.discountFactor;
if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);

function a() {
	if (availableResources.length === 0){
		result = createResource();
		allocateResources.push(result);
	} else{
		result = availableResources.pop();
		allocateResources.push(result);
	}
	return result
	
	
	
}

