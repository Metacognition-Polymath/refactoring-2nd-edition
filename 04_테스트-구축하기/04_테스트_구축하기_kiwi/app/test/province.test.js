import { assert } from "chai";
import Province from "../src/Province";

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

describe("province", function () {
    let asia;
    beforeEach(() => {
      asia = new Province(sampleProvinceData());
    });
  
    it("shortfall", function () {
      assert.equal(asia.shortfall,-20);
    });
    it("profit", function () {
      assert.equal(asia.shortfall,-20);
    });
    it('change productions', function () {
        asia.producers[0].production = 20;
        assert.equal(asia.shortfall,-42);
        assert.equal(asia.profit,292);
    });

});

describe("producer", () => {
    let noProducer;
    beforeEach(() => {
      const data = {
        name: "No producers",
        producers: [],
        demand: 30,
        price: 20,
      };
      noProducer = new Province(data);
    });
    it("shortfall", () => {
        assert.equal(noProducer.shortfall,30); 
    });
    it("profit", () => {
        assert.equal(noProducer.profit,0); 
    });
  });