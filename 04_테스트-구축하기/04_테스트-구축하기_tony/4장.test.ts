import { Province, sampleProvinceData } from "./Province";

describe("province", function () {
  let asia: Province;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it("shorfall", function () {
    expect(5).toEqual(asia.shortfall);
  });

  it("profit", function () {
    expect(asia.profit).toEqual(230);
  });

  it("change production", function () {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
  });

  it("zero demand", function () {
    // 수요가 없을 때 : 경계조건 테스트
    asia.demand = 0;
    expect(asia.shortfall).toEqual(-25);
    expect(asia.profit).toEqual(0);
  });

  it("negative demand", function () {
    // 수요가 마이너스일 때 : 경계조건 테스트
    asia.demand = -1;
    expect(asia.shortfall).toEqual(-26);
    expect(asia.profit).toEqual(-10);
  });

  it("empty string demand", function () {
    // 수요 입력란이 비어 있는 경우 : 경계 테스트
    asia.demand = "" || NaN;
    expect(asia.shortfall).toBeNaN();
    expect(asia.profit).toBeNaN();
  });
});

describe("no producers", function () {
  // 생산자가 없는 경계 조건 테스트
  let noProducers: Province;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it("shortfall", function () {
    expect(noProducers.shortfall).toEqual(30);
  });
  it("profit", function () {
    expect(noProducers.profit).toEqual(0);
  });
});

describe("string for producers", function () {
  // 생산자 수 필드에 문자열을 대입
  it("", function () {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    // const prov = new Province(data); // typescript는 실행 전에 이 에러를 잡아준다
    // expect(prov.shortfall).toEqual(0);
  });
});
