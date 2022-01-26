const aShipment = {
	deliveryDate: null,
	placeOn: {
		pluDays: (total) => total + 1
	}
}

function rushDeliveryDate(anOrder) {
	let  deliveryTime;
	if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
	else if(["NY","NM"].includes(anOrder.deliveryState)) deliveryTime = 2
	else deliveryTime = 3
	return anOrder.placeOn.pluDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
	let  deliveryTime;
	if (["MA","CT", 'NY'].includes(anOrder.deliveryState)) deliveryTime = 1;
	else if(["ME","NH"].includes(anOrder.deliveryState)) deliveryTime = 2
	else deliveryTime = 4
	return anOrder.placeOn.pluDays(2 + deliveryTime);
}

function deliveryDate(anOrder, isRush) {
	if (isRush) return rushDeliveryDate(anOrder)
	regularDeliveryDate(anOrder);
}


const anOrder = {
	deliveryState: 'MA'
}
// aShipment.deliveryDate = deliveryDate(anOrder, true)
aShipment.deliveryDate = rushDeliveryDate(anOrder) // 플래그가있는거 말고 바로 즉석함수를 호출하자

// 복잡해질때는 또 계산식을빼서 플래그로 구하는 방법을 하자