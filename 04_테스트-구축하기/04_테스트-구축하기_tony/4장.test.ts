import { Province, sampleProvinceData } from "./Province";

describe("province", function () {
  it("shorfall", function () {
    const asia = new Province(sampleProvinceData());
    expect(5).toBe(asia.shortfall);
  });
});
