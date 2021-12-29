var assert = require('assert');
const appliesToMass =  require("./replace_inline_code2");


describe("replace_inline_code", function () {
    const result = appliesToMass

    it("ok_case", function () {
        assert.equal(result, true);
      });
})
