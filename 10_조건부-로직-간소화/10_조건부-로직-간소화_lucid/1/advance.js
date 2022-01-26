

const summer = () => !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);        // 리팩토링

function summerCharge(): number {
	return quantity * plan.summerRate;
}

const regularCharge = () => quantity * plan.regularRate + plan.regularServiceCharge;

const charge = summer() ? summerCharge() : regularCharge();
console.log(charge)