var assert = require('assert');
const result =  require("./replace_loop_with_pipeline2");


describe("slit_Loop", function () {

    it("result0", function () {
        assert.equal(result[0].city, 'Bangalore');
        assert.equal(result[0].phone, '+91 80 4064 9570');
        assert.equal(result[1].city, 'Chennai');
        assert.equal(result[1].phone, '+91 44 660 44766');
      });
})
