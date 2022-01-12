const dayjs = require('dayjs');

const plan = {
	summerStart: dayjs("2021-07-01"),
	summerEnd: dayjs("2021-08-31"),
	summerRate: 1000,
	regularRate: 1100,
	regularServiceCharge: 100,
};

const getCharge = (quantity, aDate) => {
	const charge = summer() ? summerCharge() : regularCharge();
	return charge;

	function regularCharge() {
		return quantity * plan.regularRate + plan.regularServiceCharge;
	}
	function summerCharge() {
		return quantity * plan.summerRate;
	}
	function summer() {
		return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)
	}
};

console.log(getCharge(10, dayjs("2021-06-29")));
console.log(getCharge(10, dayjs("2021-08-15")));
