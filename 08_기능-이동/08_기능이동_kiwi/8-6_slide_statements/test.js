var assert = require('assert');
const result =  require("./slide_statements2");


describe("slide_statements", function () {

    it("result", function () {
        assert.equal(result.result, 2);
      });
    it("allocatedResources", function () {
      assert.equal(result.result, [2]);
    });
})
