class Account {
	get bankCharge(){
		let result = 4.5;
		if (this._daysOverdrawn > 0) result +=this.overdraftCharge;
		return result;
	}
	get overdraftCharge(){
		if (this.type._isPremium){
			const baseCharge = 10;
			if (this.daysOverdrawn <= 7)
				return baseCharge;
			else
				return baseCharge + (this.daysOverdrawn -7) * 0.85;
		}
		else
			return this.daysOverdrawn * 1.75;
	}
}


// overdraftCharge 를 계좌 종류 클래스인 AccountType 으로 옮기느게 자연스럽다