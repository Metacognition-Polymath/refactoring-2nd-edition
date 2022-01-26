class Order {
	constructor(price, quantity) {
		this._price = price;
		this._quantity = quantity;
	}
	
	get price() { return this._price }
	get quantity () { return this._quantity }
	
	get basePrice() {
		return this.quantity * this.itemPrice;
	}
	
	get discountLevel(){
		return this.quantity > 100 ? 2 : 1;
	}
	
	discountPrice() {
		switch (this.discountLevel){
			case 1: return this.basePrice * 0.95;
			case 2: return this.basePrice * 0.9;
		}
	}
	
	get finalPrice(){
	 	return this.basePrice - this.discountPrice
	}
}