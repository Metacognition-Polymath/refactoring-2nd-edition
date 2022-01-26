const aShipment = {
	deliveryDate: null,
	placeOn: {
		pluDays: (total) => total + 1
	}
}

function deliveryDate(anOrder, isRush) {
	if (isRush){
		let  deliveryTime;
		if (["MA","CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
		else if(["NY","NM"].includes(anOrder.deliveryState)) deliveryTime = 2
		else deliveryTime = 3
		return anOrder.placeOn.pluDays(1 + deliveryTime);
	}
	// b...
	let  deliveryTime;
	if (["MA","CT", 'NY'].includes(anOrder.deliveryState)) deliveryTime = 1;
	else if(["ME","NH"].includes(anOrder.deliveryState)) deliveryTime = 2
	else deliveryTime = 4
	return anOrder.placeOn.pluDays(2 + deliveryTime);
	
}


const anOrder = {
	deliveryState: 'MA'
}
aShipment.deliveryDate = deliveryDate(anOrder, true)