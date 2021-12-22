## 캡슈화

## Intro
- 모듈 분리는: 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기는것
- 레코드 캡슐화, 컬렉션 캡슐화 Collection (자바에서의 객체의 모음, 그룹이라 할 수 있습니다)

- 임시 변수는 질의 함수로 바꿔서 대채하기
- 클래스(본래 정보를 숨기는 용도 설계, 여러 함수를 묶기)
- 클래스 추출하기, 클래스 인라인 하기 활용 가능  
- 위임 숨기기: 클래스 사이 숨기는 기능, 
- 중개자 제거하기: 많이 숨기면 비대해짐

## 7.1 레코드 캡슐화하기

~~~javascript
    const orgnization = {name: '애크미 구스베리',  county: "GB"} // 래코드 라 하는듯함
~~~

~~~javascript
 class Orgnization {
  constructor(props) {
    this._name = data.name;
    this._contry = data.contry;
  }
  
  get name(){ this._name }
  get country(){ this._country }
  set name(arg){ this._name = arg}
  set country(arg){ this._country = arg}
}

~~~
### 캡슐화의 장점
 1. 방법을 숨긴채 세 가지 값을 각각의메서드로 제공할수있음(자동으로 수정시킴, 상태를, 반복이 줄어든다.)
 2. 이름을 바꿀때도 좋다(기존이름 및 새이름을 동시에 줄수 있따)
 
### 레코드 구조
1. 직접 이름 노출
2. 해시맵, 딕셔너리: 해시맵이 많을수록 불분명해진다?(Js Map 제공 . size)


### 순서
1. 레코드를 담은 변수를 캡슐화 한다
~~~javascript
 const result = `<h1>${org.name}</h1>`;
 org.name = newName;
 
 function getOrgData(){ return org;}
~~~
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반화하는 접근정의, 변수를 접근에 사용하도록 수정
~~~javascript
 const result = `<h1>${getOrgData().name}</h1>`;  // 읽기 
 getOrgData().name = newName;     // 쓰기
~~~

3. 테스트한다
4. 원본 대신 새로 정의한 클래스 타입의 객체 반환 함수를 새로 만든다
5. 레코드를 반환하는 에전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하게 바꾼다. 필드를 접근할때는 객체의 접근자를 바꾼다

~~~javascript
  class Orgnization {
   constructor(data) {
    this._data = data.name;
    }
	
	
    get name() { return this._data.name }
    set name(aString) { this._dat.name= aString}
  }

  const org = new Orgnization({name: '애크미 구스베리', country: 'GB'});
  
  function getOrgData() {
     return org._data;
  }

  function getOrg() {
    return org;    
  }
  

~~~
8. 기존 임시 필드를 제거한다.
9. 테스트한다. 중첩구조라면 컬렉션 캡슐화 하기(재귀적으로 적용)

### 스크립트
 - 처음 객체를 함수로 감싼다(함수 이름은 임시적으로 짓자)
 - 클래스를 만든다
 - 클래스를 임시 함수의 데이터로 반환할수 있게 한다
 - 제대로 임시 할수를 대체할 함수를 만든다.
 - 다형성 클래스를 천천히 변경해준다. 제대로 된 함수로 변경한다

         
## 7.2 컬렉션 캡슐화 하기
 - 컬렉션 변수를 직접 접근해 바꿀수 있는 문제점
 - 컬렉션을 감싼 클래스들에,  add(), remove 컬렉션 변경자 메서드를 맘ㄴ든다
 - 컬렉션안의 getter 에 원본 컬렉션은 반환할수없게 복사해서 차단한다(깊은복사)
 - 컬렉션을 읽기전용 프록시로 만들자

### 절차
- 아직 컬렉션을 캡슐화 하지 않았다면 변수 캡슐화하기먼저한다(무슨방법으로?, 반복되는 방법인가)
- 컬렉션 원소 추가/제거하는 함수를 추가한다(단, 컬렉션을 통째로 바꾸는 세터를 제공하지 말자)
- 정적 감사를 수행 하자(assert)
- 컬렉션을 참조하는 부분을 찾는다. 호출코드에서 추가 혹은 제거함수를 호출하도록한다. 틈틈히 테스트하자
      
~~~javascript
   class Person {
   
   constructor(name) {
    this._name = name;
    this._course = [];
   }
   get name() { return this._name }
   get courses() { return this.courses.slice() } 
   set courses(aList) { this.courses = aList.slice() } // 얇은복사
   
   addCourse(aCourse) {
     return this._course.push(aCourse);
   }
   removeCourse(aCouse, fnIfAbsent = () => {throw new RangeError()}){
      const index = this._course.indexOf(aCouse);
      if (index === -1) fnIfAbsent();
     else this._course.splice(i)
   }
	 
	
  } 
	
  class Course{
   constructor(name, isAdvanced) {
    this._name= name;
    this._isAdvanced= isAdvanced;
   }
   get name(){ return this._name }
   get isAdvanced() { return this._isAdvanced }
    
   

  }

~~~

~~~javascript
// 완벽하다고 생각 할 수 도있다
 const numAdvnacedCourses = aPerson.courses.fulter(c => c.isAdvanced).length

// 1. 방법대로 하면 
 const basicCourseNames = readBisicCoursNames(filename);
 aPerson.courses = basicCourseNames.map(name => new Course(name, false));
 
// 마음대로 수정할수 있다
 for (const name of readBisicCoursNames(filenmae)){
	aPerson.courses.push(new Curse(name, false)) 
 }


~~~   

          

## javascript Question
 - Array.prototype.slice()
 - slice() 메서드는 어떤 배열의 begin 부터 end 까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.

 - Array.prototype.indexOf() expects a value as first parameter. This makes it a good choice to find the index in arrays of primitive types (like string, number, or boolean).
 - Array.prototype.findIndex() expects a callback as first parameter. Use this if you need the index in arrays with non-primitive types (e.g. objects) or your find condition is more complex than just a value.


## 7.3 기본형을 객체로 바꾸기

### intro
 - 개발 초기에는 단순한 정보를 숫자나 문자열 같은 간단한 데이터 항목으로 표현 할 때가 많다.
 - 하다보면 복잡해진다( ex: 전화번호,국제, 다양한 포맷팅, 날짜관련 )
                                               
~~~javascript
 
~~~

### 절차
 1. 변수를 캡슐화하자.
 2. 단순한 값 클래스를 만든다(기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다)
 3. 정적 검사를 수행한다
 4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있으면 필드의 타입을 적절히 변경하자
 5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다
 6. 테스트한다
 7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘드러낼수있는 검토한다.

## 7.4 임시 변수를 질의 함수로 바꾸기

### 절차
 0. 클래스(다형성으로 만든다)
 1. 변수가 사용되기전에 값이 확실히 결정되는지, 변수를 사용할때마다 다른결과를 내지 않는지 확인한다
 2. 읽기전용으로 만들수있는 변수는 읽기전용으로 만든다
 3. 변수 대입문을 함수로 추출한다
 4. 테스트 한다
 5. 변수 인라인하기로 임시변수를 제하자.
      
## 7.5 클래스 추출하기
 한마디로 함수가 비대해지면 하위 클래스의 묶음을 빼서 만들자
 Person class 가 하다보니 전화번호에 대한 역할이 많다. 전화번호관련된 클래스로 분리하자.
 

## 7.6 클래스 인라인하기
 - 리팩터링하다보니 필요가 없는클래스다(배송, 단순한거여써.. 배송정보를 배송클래스에 흡수해주자)

## 7.7 