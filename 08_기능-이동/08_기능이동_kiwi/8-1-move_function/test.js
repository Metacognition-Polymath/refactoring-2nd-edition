var assert = require('assert');
const trackSummary =  require("./move_function_3");

function sampleProvinceData(){
    return [
        {
            lat: 12,
            lon: 12
        }, 
        {
            lat: 13,
            lon: 13
        }
    ]
}

describe("move_function", function () {
    const result = trackSummary(sampleProvinceData())

    it("distance", function () {
        assert.equal(result.distance, 96.56681074723605);
      });
    it("time", function () {
    assert.equal(result.time, undefined);
    });
    it("pace", function () {
    assert.equal(result.pace, NaN);
    });
})