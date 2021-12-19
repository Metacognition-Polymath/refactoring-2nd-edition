import { taxableCharge } from "./CombineFunctionsIntoClass-Client2";

describe("CombineFunctionsIntoClass-Client2.js", () => {
  it("taxableCharge", () => {
    expect(taxableCharge).to.equal(0.9);
  });
});
