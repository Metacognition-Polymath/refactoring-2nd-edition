var assert = require('assert');
const Customer =  require("./move_field_1");
const Customer2 =  require("./move_field_2");


function sampleCustomer(){
    return new Customer("kiwi", 3)
}
function sampleCustomer2(){
    return new Customer2("kiwi", 3)
}

describe("move_field", function () {
    const result = sampleCustomer()

    it("name", function () {
        assert.equal(result._name, 'kiwi');
      });
    it("discountRate", function () {
    assert.equal(result._discountRate, 3);
    });
    it("contract:", function () {
    assert.equal(result._contract._startDate, '2021-12-29');
    });
})

describe("move_field2", function () {
    const result = sampleCustomer2()

    it("name", function () {
        assert.equal(result._name, 'kiwi');
      });
    it("discountRate", function () {
    assert.equal(result._contract._discountRate, 3);
    });
    it("contract:", function () {
    assert.equal(result._contract._startDate, '2021-12-29');
    });
})