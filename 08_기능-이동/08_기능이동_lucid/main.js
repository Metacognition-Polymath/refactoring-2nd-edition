class Account {
	get bankCharge(){
		let result = 4.5;
		if (this._daysOverdrawn > 0) result += this.overdraftCharge;
		return result;
	}
	get overdraftCharge() { // 위임 메소드
		return this.type.overedraftCharge(this.daysOverdrawn)
	}
}


// TODO::overdraftCharge 를 계좌 종류 클래스인 AccountType 으로 옮기느게 자연스럽다
class AccountType {
	get bankCharge() {
		let result  = 4.5;
		if (this._daysOverdrwawn > 0)
			result += this.type.overdraftCharge(this.daysOverdrawn);
		return result;
	}
	overdraftCharge(account){
		if (this.isPremium){
			const baseCharge = 10;
			if (account.daysOverdrawn <= 7)
				return baseCharge;
			else
				return baseCharge + (account.daysOverdrawn - 7) * 0.85;
		}
		else
			return account.daysOverdrawn * 1.75;
	}
}

// 