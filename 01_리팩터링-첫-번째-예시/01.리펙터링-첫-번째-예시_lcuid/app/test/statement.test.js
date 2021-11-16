const {statement: originStatement} = require('../example/origin');
const {statement: changeStatement} = require('../example/change_1-6');
const {htmlStatement} = require("../module/statement");
const {createStatement} = require("../module/createStatement");
const invoices = require('../data/invocies.json')
const plays = require('../data/plays.json')

const expectResult =
	"\t청구 내역 (고객명: BigCo)\n" +
	"\tHalmet: ₩650.00 (55석)\n" +
	"\tAs You Like It: ₩490.00 (35석)\n" +
	"\tOthello: ₩500.00 (40석)\n" +
	"\t총액: ₩1,640.00\n" +
	"\t적립 포인트: 47점\n"

describe('calculate amount, credit', () => {
	
	test('calculate origin statement', () => {
		const result = originStatement(invoices, plays);
		expect(result).toEqual(expectResult)
	})
	
	test('calculate example-2 statement', () => {
		const result = changeStatement(invoices, plays);
		expect(result).toEqual(expectResult)
	})
	
})