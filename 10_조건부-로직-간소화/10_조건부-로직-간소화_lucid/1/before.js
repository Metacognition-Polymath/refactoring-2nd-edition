/**
 *  @typedef  {{ isBefore: function, isAfter: function }} aDate
 * */

/**
 *  @typedef {{  summerStart, summerEnd, summerRate: number, regularServiceCharge: number, regularRate: number  }} plan
 *  @typedef {number} quantity
 * */
 
let charge = 0;
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
	charge = quantity * plan.summerRate;
} else {
	charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
