## 06 기본적인 리팩터링

### 6.0 인트로
 - 가장 많이 사용하는 방법들: 함수 추출하기, 변수 추출하기, 함수 인라인하기, 변수 인라인하기
 - 함수 선언 바꾸기: 함수의 이름을 변경할때 많이씀(함수의 인수 추가 및 제거할때 사용됨)
 - 변수 이름 바꾸기: 변수 캡슐화 하기와 관련이 깊음
 - 매개변수 객체 만들기: 같이 다니는 객체들은 매개변수 객체 만들기
 - 여러 함수 클래스로 묶기: 고수준 모듈로 만든는 작업
 - 여러 함수를 변환 함수로 묶기: 일기 전용 데이터를 다룰때 좋음
 - 단계 쪼개기: 모듈들의 작업 처리 과정을 명확한 단계로 구분짓는 방법

### 6.1 함수 추출하기
 - 많이 사용, 객체지향에서는 메서드, 절차형언어는 프로시저/서브루틴
 - 방법: 코드 조각을 찾아 무슨일을 하는지 파악한 다음, 독립된 함수 추출 목적에 맞는 이름을 붙인다.
 - 언제 할 것인지:
   1) 길이를 기준(함수가 한 화면을 넘어가지 않는 예시 규칙)
   2) 재ㅏ용성(두번 이상 사용될 코드, 한번만 쓰이는 코드는 그냥 낫두자)
   3) 목적과 구현을 분리(저자가 원하는 방향)
      - 무슨일을 하는 지 파악이 걸릴겨우빼자
      - 가독성이 좋아진다
 - 길이를 중요하지 않다.(스몰토크시스템, 간단한 메서드, 목적을 가종 및 구현(반전) 차이가 클 경우) 
 - 단점: 함수 이름을 잘지어야되고, 스택이 길어질것이다(신경쓰지 마렴)
 - 함수의 이름을 잘 짓는법(주석을 참고하자)
   1) 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다(어떻게가 아닌 무엇을 하지는 드러내자)
      - 무조건 최선일 필요는 없다
      - 함수를 인라인 화 할수 있다면 우선 인라인 함수로 만들자
   2) 추출할 코드를 원본 함수에서 복하여 새 함수에 붙여넣는다.
   3) 추출한 코드 중 원본함수의 지역 변수 참조, 유효범위 가 벗어나는 변수를 확인 후 매개변수로 전달하자
      - 원본 함수 중첩함수로 할 경우 문제없다
      - 사용하지 않는 매개변수를 쉽게 처리 할수있따
      - 추출한 코드에서만 사용 변수가있을경우 함수 안으로 옮긴다
      - 주의에서 하자
      - 너무 지저분할 경우 중단하고, 변수 쪼개기, 임시 변수를 질의 함수로 바꾸자
   4) 변수를 다 처리했다면 컴파일해보자(오류가 날수잇으니 좋다)
   5) 원본 함수에서 추출한 코드 부분을 새로 만든 호출하는 문자으로 바꾼다(대입한다)
   6) 테스트 한다
   7) 비슷한 추출 코드가 사용된 곳이 잇는지 확인하자
 - 예시의 코드를 직접 해보자, 왠만하면 내부 함수로 하고, 변수는 잘넘기자, 코드를 그대로 옮기고 내 스타일대로 작성해보자


### 6.2 함수 인라인하기
 ~~~javascript
   function getRaintg(driver) {
    return moreThanFiveLateDeilveries(driver) ? 2: 1;
  }
  function moreThanFiveLateDeilveries(driver) {
    return driver.numberOFLateDeliveries > 5;
  }	
	
 ~~~
 ~~~javascript
   function getRaintg(driver) {
    return driver.numberOFLateDeliveries > 5 ? 2: 1;
  }
	
 ~~~
 - 짤막한 함수를 권장한다.(쉽고 명료하게)
 - 그와 반대로 잘못 추출 된 함수도 인라인하자(간전 호출을 너무 과할 경우, 단순 호출일 경우)
 - 절차
   1) 다형 메서드인지 확인한다(서브 클래스에서 오버라이하는 경우는 위험하다)
   2) 인라인할 함수를 호출하는 곳을 모두 찾는다
   3) 각 호출문을 함수 본문으로 교체한다
   4) 하나씩 교체할때마다 테스트 처리한다
   5) 함수 정의를 삭제 한다

### 6.3 변수 추출하기
- 복잡하고 이해가 안되는 코드
~~~javascript
   return order.quantity * order.itempPrice -
      Math.max(0, order.quantity - 500) * order.itempPrice * 0.05 +
      Math.min(order.quantity * order.itemPrice * 0.1, 100)
~~~
- 지역변수 활용 표현식으로 관리하기 쉬운 코드들
~~~javascript
   const basePrice = order.quantity * order.itmePrice;
   const quantityDisCount = Math.max(0, order.quantity - 500) * order.itempPrice * 0.05
   const shipping =  Math.min(order.quantity * order.itemPrice * 0.1, 100);		 
	
	return basePrice - quantityDisCount + shipping;
	
~~~
- 표현식 복잡하기 어려울때가 있다
- 지역 변수 활용 표현식을 더 쉽게 만들고 코드가 명확해진다
- 표현식에 이름을 붙이고 싶다면 묵맥도 고려하자.
- 함수를 벗어나지 않을경우 지역 변수로, 벗어날경우는 함수로 만들자.
- 절차
  1) 추출하려는 표현식에 부작용이 없는지 확인한다
  2) 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다
  3) 원본 표현식을 새로 만든 변수로 교체한다
  4) 테스트 한다
  5) 표현식을 여러 곳에서 사용한다면 가각의 새로 만든 변수로 교체한다. 하나 교체할때마다 틈틈히 테스트하자

- 예시 클래스
~~~javascript
   class Order {
    constructor(props) {
      this._data = props;     
    }
    get quanitity() { return this._data.quanitity }
    get itemPrice() { return this._data.itemPrice }
    
    get price(){
       return this.quantity * this.itempPrice -
               Math.max(0, this.quantity - 500) * this.itempPrice * 0.05 +
               Math.min(this.quantity * this.itemPrice * 0.1, 100)	
    }
  }
~~~

~~~javascript
   class Order {
    constructor(props) {
      this._data = props;     
    }
    get quanitity() { return this._data.quanitity }
    get itemPrice() { return this._data.itemPrice }
    get basePrice() { return this.quanitity * this.itemPrice }
    get qunittyDiscount() { return Math.max(0, this.quantity - 500) * this.itempPrice * 0.05}
    get shipping() { return  Math.min(this.quantity * this.itemPrice * 0.1, 100)}   

    get price(){
       return this.basePrice - this.qunittyDiscount + this.shipping
    }
  }
~~~
- !!! 객체의 장점(클래스 객체는 특정 로직을 통해 데이터를 외부와 공유하기 쉽게되어있다. 추상화를 통해, 쉽게 유용할수 있다)
- 

### 6.4 변수 인라인하기
~~~javascript
//before  
  let basePrice = anOrder.basePrice; return basePrice > 1000;
	
// after
  return anOrder.basePrice > 1000; // 인텔리제이에서는 자동으로 해준다

~~~
 - 반대 리팩터링: 변수 추출하기
 - 챕처 1에서는: 임시 변수 내용 직접 삽입
 - 원래 표현식과 다를 바 없을때 사용, 주변 코드를 리팩토링 할때 방해됨
 - 절차
 1) 대입문의 우변에서 부작용이 있는지 확인한다
 2) 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문의 우변의 코드로 바꾼다(우변은 after code)
 3) 테스트 한다
 4) 변수를 사용하는 부분을 모두 교체할때까지 반복
 5) 변수 선언문과 대입문을 지운다
 6) 테스트 한다

### 6.5 함수 선언 바꾸기
 - 가장 중요한 것이름
 - 주석을 먼저 달고 함수 이름을 달면 편하다
 - 간단한 절차
   1) 매개 변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개 변수 참조하는 곳은 없는지 확인한다
   2) 메서드 선언을 원하는 형태로 바꾼다.
   3) 기존 메서드 선언을 참조하는 부분을 모두 바꾼다
   4) 테스트 한다


 - 두 개 이상 일경우 마이그레이션 절차로 항상 롤백 할 수 있게 하자
   1) 함수의 본문을 적절히 리팩터링한다
   2) 함수 보눔ㄴ을 새로운 함수로 추출한다.
   3) 추출한 함수에 매개변수를 추가해야한다면 '간단한 절차'를 따라 추가한다
   4) 테스트한다
   5) 기존 함수를 인라인 한다
   6) 이름을 임시로 붙였다면 함수 선언 바꾸기를 한 번ㄷ 적용해서 원래 이름으로 돌린다

 ~~~javascript
  function cirum(radius) {
    return 2 * Math.PI * radius; 
  }
	
  function circumfrerence(radius) {
     return 2 * Math.PI * radius;
  }
 ~~~
  - 정적 타입 언어와 뛰어난 IDE 조합이라면 함수 이름 바꾸기를 자동으로 처리가능. 오류 안난다(타입스크립트 나 바벨이 필요함)
  - 매개 변수도 똑같이 처리해주자(이름 바꾸고 테스트 하고)
  - !!단점: 한 번에 수정해야 한다는 것이다
  - 또한 동일한 이름의 함수 오류나, 클래스에서 사용하는 메서드가 중복될경우 버그가 일어 날 수 있다
  - 


 ~~~javascript
  function cirum(radius) { // 폐기 예정입니다.
    return circumfrerence(radius); 
  }
	
  function circumfrerence(radius) {
     return 2 * Math.PI * radius;
  }
 ~~~           

~~~javascript 
 class Books {
   addReservation(customer, false){
   }
 } 
~~~


### 6.6 변수 캡슐화 하기
### 6.7 변수 이름 바꾸기
### 6.8 매개변수 객체 만들기
### 6.9 여러 함수를 클래스로 묶기
### 6.10 여러 함수를 변환 함수로 묶기
### 6.11 단계 쪼개기

