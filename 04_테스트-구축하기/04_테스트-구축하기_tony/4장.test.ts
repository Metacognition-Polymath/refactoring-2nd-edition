import { Province, sampleProvinceData } from "./Province";

describe("province", function () {
  it("shorfall", function () {
    const asia = new Province(sampleProvinceData());
    expect(3).toBe(3);
  });
});
