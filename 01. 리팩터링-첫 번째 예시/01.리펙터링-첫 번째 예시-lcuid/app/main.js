
const invoices = require('./data/invocies.json')
const plays = require('./data/plays.json')

const originStatement = require('./step/origin')
const {log} = require("./util");

console.log(
	'함수에 들어가는 데이터입니다',
	{invoices, plays}
)

const billingMessage = originStatement(invoices, plays);

console.log(billingMessage)