import { assert, expect } from "chai";
import Province from "../src/province";

function sampleProvinceData() {
	return {
		name: "Asia",
		producers: [
			{
				name: "Byzantium",
				cost: 10,
				production: 9,
			},
			{
				name: "Attalia",
				cost: 12,
				production: 10,
			},
			{
				name: "Singappore",
				cost: 10,
				production: 6,
			},
		],
		demand: 30,
		price: 20,
	};
}

// 생산 부족분을 제대로 계산하는지 확인하는 테스트
describe("province", function () {
	let asia;
	beforeEach(function () {
		asia = new Province(sampleProvinceData());
	});

	it("생산 부족분 테스트", function () {
		expect(asia.shortfall).equal(5);
	});

	it("총 수익 계산 테스트", function () {
		expect(asia.profit).equal(230);
	});

	it("production() 세터 테스트", function () {
		asia.producers[0].production = 20;
		expect(asia.shortfall).equal(-6);
		expect(asia.profit).equal(292);
	});

	it("수요가 없는 경우에 대한 테스트", function() {
		asia.demand = 0;
		expect(asia.shortfall).equal(-25);
		expect(asia.profit).equal(0);
	})

	it("수요가 음수인 경우에 대한 테스트", function() {
		asia.demand = -1;
		expect(asia.shortfall).equal(-26);
		expect(asia.profit).equal(-10);
	})

	it("수요가 빈문자열인 경우에 대한 테스트", function() {
		asia.demand = "";
		expect(asia.shortfall).NaN;
		expect(asia.profit).NaN;
	})
});

describe("no producers", function () {
	let noProducers;
	beforeEach(function () {
		const data = {
			name: "No Producers",
			producers: [],
			demand: 30,
			price: 20,
		};
		noProducers = new Province(data);
	});
	it("생산 부족분 테스트", function () {
		expect(noProducers.shortfall).equal(30);
	});

	it("총 수익 계산 테스트", function () {
		expect(noProducers.profit).equal(0);
	});
});
