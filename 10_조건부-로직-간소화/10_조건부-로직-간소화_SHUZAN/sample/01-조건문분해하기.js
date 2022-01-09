// JavaScript 날짜 관련 경량 라이브러리
const dayjs = require("dayjs");

const plan = {
  summerStart: dayjs("2022-07-01"),
  summerEnd: dayjs("2022-08-31"),
  summerRate: 2000, //여름시즌
  regularRate: 1000, //비수기
  regularServiceCharge: 100,
};

const getCharge = (quantity, aDate) => {
  const isSummer = () => !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
  const summerCharge = () => quantity * plan.summerRate;
  const reugularCharge = () => quantity * plan.regularRate + plan.regularServiceCharge;

  return isSummer() ? summerCharge() : reugularCharge();
};

console.log(getCharge(10, dayjs("2022-03-29"))); //10100
console.log(getCharge(10, dayjs("2022-08-15"))); //20000
