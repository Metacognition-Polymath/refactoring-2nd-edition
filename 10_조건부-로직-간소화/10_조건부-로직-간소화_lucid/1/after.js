let charge = 0;

function summer() {
	return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}        // 리팩토링

function summerCharge() {
	return quantity * plan.summerRate;
}

const regularCharge = () => quantity * plan.regularRate + plan.regularServiceCharge;

if (summer()) {
	charge = summerCharge();
} else {
	charge = regularCharge();
}
