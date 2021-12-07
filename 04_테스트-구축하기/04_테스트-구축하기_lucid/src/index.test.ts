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


});