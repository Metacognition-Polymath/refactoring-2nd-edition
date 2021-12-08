import Province from "./Province";
import {sampleProvinceData} from "./index";

describe('province', function () {
  let asia: Province;
  
  beforeEach(() => {
    asia = new Province(sampleProvinceData()); // 픽스터 설정: 테스트에 필요한 데이터와 객체르르 뜻하는 fixture
  })

  it('shortfall', function () {
    expect(asia.shortfall).toEqual(5); // 검증 , 여기서는 기초 생산 부족분을 계산햇는지 확인
  });

  it('profit', function () {
    expect(asia.profit).toEqual(230);
  });

  it('change productions', function () {

    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
  });

  it('zero demand', function () {
      asia.demand = 0;
      expect(asia.shortfall).toEqual(-25)
      expect(asia.profit).toEqual(0)
  });

  it('negative demand', function () {
    asia.demand = -1;
    expect(asia.shortfall).toEqual(-26);
    expect(asia.profit).toEqual(-10);
  });

  it('empty string demand ', function () {
    asia.demand = ""; //애초에 에러가나옴 타입스크립트에서, Nan 이 안나오고 0 이나옴
    expect(asia.shortfall).toBeNaN();
    expect(asia.profit).toBeNaN();

  });

});

describe('no producers', function () {  // 생산자가 없다.
  let noProducers: Province;
  beforeEach(() => {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20
    }
    noProducers = new Province(data)
  });

  it('shortfall', function () {
    expect(noProducers.shortfall).toEqual(30);
  });

  it('profit', function () {
    expect(noProducers.profit).toEqual(0);
  });
});

describe('string for producers', function () { // 에러가 나온다, 노란색, 에러(검증과정에서 )와 실패(예상값과 다른것)는 다르다
  it('', function () {
    const data = {
      name: 'String producers',
      producers: "",
      demand: 30,
      price: 20
    }

    const prov = new Province(data);
    expect(prov.shortfall).toEqual(0)

  });
});