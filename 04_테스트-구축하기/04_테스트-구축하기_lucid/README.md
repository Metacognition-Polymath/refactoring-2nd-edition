# 04. 테스트 구축하기

## 4.3 첫번째 테스트

~~~ typescript
    describe('province', function () {
      it('shortfall', function () {
        // 픽스터 설정: 테스트에 필요한 데이터와 객체르르 뜻하는 fixture
        const asia = new Province(sampleProvinceData()); 

        // 검증 , 여기서는 기초 생산 부족분을 계산햇는지 확인        
        expect(asia.shortfall).toEqual(5); 
      });
});
~~~
  - 실패해야할 상황에는 반드시 실패하게 만들자.

~~~ typescript
  get shortfall(){
    return this._demand - this.totalProduction * 2; // 오류주입
  }
~~~

 - 자주테스트 하라, 몇 분 간격으로 테스트하고, 적어도 하루에 한 번은 전체 테스트를 돌려보자
 - 필자는 assert 를 선호하지만 자바스크립트 기반은 expect 를 많이쓴다
 - GUI unit Test 를 하지만 선호하기에따라 다르다

## 4.4 테스트 추가하기

 - 테스트는 위험 요수 중심으로 작성하자
 - 단순한것은 하지말자.(중요한거에 집중해서 잘 작성하자)
 - 완벽하게 만드느라 수행 못하느리, 불완전하더라도 테스트라도 작성 실행해보자

~~~typescript
  describe('province', function () {
    const asia = new Province(sampleProvinceData()); // 이렇게 하면 안된다. 상호끼리 연관되게 바뀔수 있기때문 이다
    
    it('shortfall', function () {
      expect(asia.shortfall).toEqual(5);
    });
    
    it('profit', function () {
      expect(asia.profit).toEqual(230);
    });
  });
~~~
   
 - beforeEach 는 각각의 테스트 바로 전에 실행 되어서 asia 를 초기화 시켜서, 새로운 환경을 만든다, 똑같은 피스처를 만들 수 있게 노력해야한다
~~~typescript
  describe('province', function () {
  let asia: Province;

  beforeEach(() => {
    asia = new Province(sampleProvinceData()); // 픽스터 설정: 테스트에 필요한 데이터와 객체르르 뜻하는 fixture
  })

  it('shortfall', function () {
    expect(asia.shortfall).toEqual(5); // 검증 , 여기서는 기초 생산 부족분을 계산햇는지 확인
  });
});

~~~

## 4.5 픽스처 수정하기
 - 픽스처가 있을때는 쉽지만. 실전에서는 사용자가 값을 변경해서 픽스처를 바로 수정해버린다.
 - 이러한 부분을 세터로 호출해서 하는데. 세터를 잘 테스트 하지 안흔다.
 - Producer 의 production 세터는 좀 복잡한 동작을 수행해서 테스트 예정이다
 - 준비 수행 단언, 설정 실행 검증, 조건-발생-결과 라는 용어로 부른다
 - 해체, 청소라는 4단계가 존재하지만 다음 단계의 클린에 영향을 못준다
~~~typescript
  it('change productions', function () {

    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);

  });
~~~
 - it 구문 하ㄴ에 두가지 속성 검증하지만, 하나씩만 하는게 좋다(앞에서 실수할경우 뒤의경우도 놓친다) 하지만 밀접하다면 같이 해도된다                 