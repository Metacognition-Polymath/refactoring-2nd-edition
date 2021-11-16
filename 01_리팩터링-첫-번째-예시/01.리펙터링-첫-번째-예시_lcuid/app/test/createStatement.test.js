const {createStatement} = require("../module/createStatement");

const invoices = require('../data/invocies.json')
const plays = require('../data/plays.json')

const expectResult = {
	"customer": "BigCo",
	"performances": [
		{
			"amount": 65000,
			"volumeCredit": 25,
			"audience": 55,
			"play": {"name": "Halmet", "type": "tragedy"},
			"playID": "halmet"
		},
		{
			"amount": 49000,
			"volumeCredit": 12,
			"audience": 35,
			"play": {"name": "As You Like It", "type": "comedy"},
			"playID": "asLike"
		},
		{
			"amount": 50000,
			"volumeCredit": 10,
			"audience": 40,
			"play": {"name": "Othello", "type": "tragedy"},
			"playID": "othello"
		}],
	"totalAmount": 164000,
	"totalVolumeCredit": 47
}

describe('createStatement test', () => {
	
	test('calculate origin statement', () => {
		const result = createStatement(invoices, plays);
		expect(result).toEqual(expectResult)
	})
	
})