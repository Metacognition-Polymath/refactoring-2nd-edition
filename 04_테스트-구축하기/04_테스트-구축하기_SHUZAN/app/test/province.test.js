import { expect } from "chai";
import Province from "../src/Province";

const sampleProvinceData = () => ({
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
});

describe("province test", () => {
  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData()); //픽스처 설정
  });

  it("Asia - shortfall", () => {
    expect(asia.shortfall).equal(5);
  });
  it("Asia - profit", () => {
    expect(asia.profit).equal(230);
  });

  it("Change production - shortFall", () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
  });
  it("Change production - profit", () => {
    asia.producers[0].production = 20;
    expect(asia.profit).equal(292);
  });

  it("demand - zero", () => {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
  it("demand - minus", () => {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });

  it("demand - empty string", () => {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

describe("producer", () => {
  let noProducer;
  beforeEach(() => {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducer = new Province(data);
  });
  it("no producer - shortfall", () => {
    expect(noProducer.shortfall).equal(30);
  });
  it("no producer - profit", () => {
    expect(noProducer.profit).equal(0);
  });
});

describe("string for producers", () => {
  it("", () => {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
