class Order {
	get finalPrice(){
		const basePrice = this.quantity * this.itemPrice;
		const discountLevel = this.quantity > 100 ? 2 : 1;
		return this.discountPrice(basePrice, discountLevel);
		
	}
	
	discountPrice(basePrice, discountLevel) {
		switch (discountLevel){
			case 1: return basePrice * 0.95;
			case 2: return basePrice * 0.9;
		}
	}
}