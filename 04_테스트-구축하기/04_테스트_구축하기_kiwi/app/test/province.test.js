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

describe('province', function() {
    it('shortfall', function(){
        const asia = new Province(sampleProvinceData());
        assert.equal(asia.shortfall, 5);
    });
});
