# Chapter3. 코드에서 나는 악취 

[노션 정리 링크](https://www.notion.so/3-a50b698fd2344f1e8aa496c03daecf33)

---
'적용 방법을 아는 것'과 '제때 적용'할 줄 아는 것은 다르다.


- 리팩터링을 언제 시작하고 언제 그만할지를 판단하는 일은 리팩터링의 작동원리를 아는 것 못지않게 중요하다.

- 인스턴스 변수를 삭제하거나 상속 계층을 만드는 방법을 설명하기는 쉽다. 
하지만 이런 일들을 '언제'해야하는지에 대해서는 명확하게 정립된 규칙이 없다.

이에 대해서 좀 더 구체적으로 정리해볼 필요가 있다.

그리고 리팩터링이 확실히 필요한 코드들에는 일정한 패턴(냄새)이 있다는 사실을 발견했다.
**냄새나는 코드들의 대표적인 유형 대해 알아봅시다.**

<br/>

### 3.1 기이한 이름

함수든, 변수든, 클래스든 이름만 보고도 각각이 무슨 일을 하고 어떻게 사용해야 하는지 명확히 알 수 있도록 신경써서 지어야한다.

- 이름만 잘 지어도 문맥을 파악하느라 헤매는 시간을 크게 절약할 수 있습니다.
- 만약 마땅한 이름이 떠오르지 않는다면 설게에 더 근본적인 문제가 숨어 있을 가능성이 높다.
    
    → 혼한스러운 이름을 잘 정리하다 보면 코드가 훨씬 간결해질 때가 많다.


ex) 어떤 클래스 내에서만 사용되는 USD포매팅 역할의 private함수라면, 꼭 formatAsUSD()가 아니라 그냥 usd()정도로 네이밍(챕터1)

<br/>

### 3.2 중복 코드

- 함수 추출하기 : 양쪽 모두 추출된 메서드를 호출하게 바꾸기
- 문장 슬라이드 : 비슷한 부분을 한곳에 모아 함수 추출하기를 더 쉽게 적용
- 메서드 올리기 : 같은 부모로부터 파생된 서브클래스들에 코드가 중복되어 있다면, 각자 따로 호출되지 않도록 메서드 올리기를 적용해 부모로 올린다.

<br/>

### 3.3 긴 함수

- 경험적으로, 오랜 기간 잘 활용되는 프로그램들은 하나같이 짧은 함수로 구성된 프로그램입니다.
- 짧은 함수로 구성된 코드베이스를 흝으면 연산하는 부분이 없고, 다 함수 호출(위임) 하는 식으로만 진행되는 것 처럼 보인다.(연산은 말단에서 수행하니까)
- 저자는 이러한 짧은 함수 간접 호출로 구성된 프로그램이 좋은 프로그램이라고 생각함

언제 함수를 분리해야 하는가?
의도를 한눈에 알아볼 수 있는 코드인지 드러나지 않을 때
주석을 달아야만 하는 경우가 좋은 시그널입니다.

**의도는 이름에, 동작 방식은 코드에 드러나도록!**

<br/>


### 3.4 긴 매개변수 목록

요즘에는 매개변수 목록이 길어지면 그 자체로 이해가 어려울 경우가 많다.

매개변수를 줄이는 방법은 다양합니다.

- 매개변수를 질의 함수로 바꾸기
    - 사용 중인 데이터 구조에서 값들을 뽑아 각각을 별개의 매개변수로 전달하는 코드 :객체 통째로 넘기기
    - 항상 함께 전달되는 매개변수들 : 매개변수 객체 만들기
    - 함수의 동작 방식을 정하는 플래그역할의 매개변수: 플래그 인수 제거하긴
- 여러 개의 함수가 특정 매개변수들의 값을 공통으로 사용할 때 : 여러 함수를 클래스로 묶기를 사용하여 공통 값들을 클래스의 필드로 정의

**before**
```jsx
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high))
```

**after**
```jsx

if (aPlan.withinRange(aRoom.daysTempRange))
```
    
    
<br/>



### 3.5 전역 데이터

전역 데이터는 코드베이스 어디에서든 접근할 수 있고 값을 바꿨을 때 누가 바꿧는지 찾아낼 매커니즘이 없다는 게 문제입니다.

그래서 버그가 발생해도 문제의 원인이 되는 코드를 찾아내기가 굉장히 어렵다.

전역 데이터의 대표적인 형태는 전역 변수이지만 클래스 변수와 싱글톤에서도 같은 문제가 발생한다.

- 변수 캡슐화하기
    - 다른 코드에서 오염시킬 가능성이 있는 데이터를 발견할 때마다 이 기법을 가장 먼저 적용한다.
        
        함수로 감싸는 것만으로도 데이터를 수정하는 부분을 쉽게 찾을 수 있고 접근을 통제할 수 있게 된다.
     
<br/>

   

### 3.6 가변 데이터

- 불시에 변경될 수 있고 변경의 추적이 어렵다. 전역 데이터와 같은 맥락입니다.

1. 무분별한 데이터 수정에 따른 사이드 이펙트 발생 위험이 높아질 때
2. 구조체의 내부 필드에 변수가 있는 경우

캡슐화를 통해 변수 수정에 대해 삼시를 수월하게 하기
변수를 갱신하는 코드들의 유효범위를 제한한다.

**결국 데이터의 변경을 인지하고 제어가능할 수 있어야 한다**

<br>

### 3.7 뒤엉킨 변경

- 단일 책임 원칙(SRP)가 제대로 지켜지지 않을 때 나타난다.

→ 하나의 모듈이 서로 다른 이유들로 인해 여러 가지 방식으로 변경되는 일이 많을 때 발생!

ex) 하나의 모듈이 기능 A,B에 대해 변경이 있을 경우

처리과정의 맥락별로 모듈을 쪼갭시다.


**before**
```jsx
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
    saveAnimal(a: Animal) { }
}
```

**after**
```jsx
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}
class AnimalDB {
    getAnimal(a: Animal) { }
    saveAnimal(a: Animal) { }
}
```
<br/>


### 3.8 산탄총 수술

뒤엉킨 변경과 비슷하면서도 정반대의 개념입니다.

산탄총 수술은 코드를 변경(1)할 때마다 자잘하게 수정해야 하는 클래스(n)가 많을 때 냄새가 납니다.

ex) 하나의 기능 A를 담당하는 부분이 코드베이스 전반에 퍼져 있다고 할 수 있음

함수 옮기기와 필드 옮기기 등 으로 한 모듈에 묶어두어 해결 할 수 있습니다.


<br/>

### 3.9 기능 편애

기능 편애는 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 다른 모듈의 함수나 데이터와 상호작용할 일이 더 많은 때 풍기는 냄새입니다.


- 해당 함수를 데이터 근처로 함수 옮기기
- 함수의 일부 부분만 편애할 경우 해당 부분만 독립 함수로 함수 추출하기

중요한건 함께 변경할 대상을 한데 모으는 것이다.

<br/>


### 3.10 데이터 뭉치

데이터 항목 서너개가 여러 곳에서 항상 함께 뭉쳐 다닌다면, 데이터 클래스로 묶어줘야 한다.

추후 데이터 클래스에 로직이 붙으면 유용한 클래스가 탄생하는 결과로 이어지기도 합니다.


**before**
```jsx
const name = 'kiwi'
let age = 11

console.log(age);


function get_age(value){
		return value;
function set_age(value){
		return value < 0 ? 0 : value;

const name = 'kiwi'
let age = set_age(11)


console.log(get_age(value));
```

**after**
``` jsx
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
}

const user = new User("Bubble", -1);

console.log(user);
```
<br/>


### 3.11 기본형 집착

대부분의 프로그래밍 언어는 다양한 기본 자료형을 제공한다.

화폐, 좌표, 구간 등의 기초타입이 필요하다면 직업 정의해서 사용하도록 하자


**1**
```jsx
const myCpus = ['Intel Core i7', 'Core i5', 'AMD RyZen 9']

const myIntelCpus = myCpus.filter((cpu) => cpu.startsWith('Intel') || cpu.startsWith('Core'))
```

**2**
``` jsx
const myCpus = [
    {name: 'Intel Core i7', brand: 'Intel'},
    {name: 'Core i5', brand: 'Intel'},
    {name: 'AMD RyZen 9', brand: 'AMD'},
]

const myIntelCpus = myCpus.filter((cpu) => cpu.brand == 'Intel')
```

**3**
``` jsx
const IntelBrand = {
        name: "Intel",
        sloagun: "Leap Ahead",
        ceo: "Robert Holmes Swan",
        stock: 52.82
    }

    const AmdBrand = {
        name: "AMD",
        sloagun "Fusion is Future",
        ceo: "Lisa Tzwu-Fang Su",
        stock: 83.1
    }

    const myCpus = [
        { name: "Intel Core i7", brand: IntelBrand },
        { name: "Intel Core i5", brand: IntelBrand },
        { name: "AMD RyZen 9", brand: AmdBrand }
    ]

    const myIntelCpus = myCpus.filter(cpu => cpu.brand.stock <= 50.0);
```

<br/>


### 3.12 반복되는 switch문

switch문은 모조리 조건부 로직을 다형성으로 바꾸기로 없애야 할 대상은 아니다.

중복된 switch문이 문제가 되는 이유는 조건절을 하나 추가할 때마다 다른 switch문들도 모두 찾아서 함께 수정해야 하기 때문이다.

위의 이유에 해당하는 switch문은 다형성을 사용하여 최신 스타일의 코드베이스로 바꿔주도록 하자!

<br/>


### 3.13 반복문

일급함수를 지원하는 언어가 많아졌기 때문에 반복문을 파이프라인으로 바꾸기를 적용하여 반복문 사용을 지양하도록하자.

filter or map과 같은 파이프라인 연산을 사용하면 각 원소들이 어떻게 처리되는지도 쉽게 파악할 수 있다.

하지만 어디든 예외는 있으니 파이프라인 연산이 필요한지 아닌지 판단할 수 있는 능력을 갖추자

**예외 코드**
```jsx
listA.stream() // A{x, y}
  .filter()
  .map() // x 필요
  .map() // x' 필요
  .map() // x'' & y 필요
// y를 마지막 map까지 끌고가야 한다. Pair<T, R> ?
 
또는 Map<T, A> a와 Map<T, B> b를 같이 순회해야 하는 경우
a.key intersect b.key 해서 공통 key를 얻고 stream()을 돌리는 것도 가능은 하지만...
```
<br/>


### 3.14 성의 없는 요소

- 의미 없는 한줄짜리 함수, 메서드가 하나 뿐인 클래스 등이 해당한다.
- 함수 인라인하기, 클래스 인라인하기로 제거하도록하자.

의미가 있느냐 없느냐가 제거 판단의 기준이 됩니다.

**의미 없는 코드의 예시**
``` jsx
const str = "Hello, World"

function get_str(){
	return "Hello, World"
}
const = get_str()
```
<br/>

### 3.15 추측성 일반화

- '나중에 필요할 거야'라는 생각으로 당장 필요없는 모든 종류의 후킹 포인트와 케이스 처리 로직을 작성해두는 경우.
- 나중에 쓰면 좋지만, 안쓴다면 낭비일 뿐이다. 당장 걸리적거리는 코드는 눈앞에서 치워버리자

ex) 하는 일이 거의 없는 함수나 클래스

<br/>

### 3.16 임시 필드

- 객체를 가져올 때는 당연히 모든 필드가 채워져 있으리라 기대하는게 보통이라, 특정 상황에서만 값이 존재하는 임시 필드는 코드를 이해하기 어렵게 한다.
- 클래스 추출하기로 임시 필드를 제거해준다.
- 널객체 때문에 임시필드가 발생하는 경우라면 널 객체를 따로 정의해준다.

```jsx
const c = new Customer('kiwi');
if (c && c.isTimeToPay)
{
	c.pay();
}
```

```jsx
const e = DB.Customer("Kiwi")

if (c.isTimeToPay)
{
	c.pay();
}

class CustomerNull extends Customer{
  pay() {
			// 아무것도 하지 않는다.
  }
}
```


<br/>

### 3.17 메시지 체인

메시지 체인을 무조건 나쁘게 생각할 필요는 없다.

해당 사항에 대해서는 합리적인 중도를 지향하도록 하자.

```jsx
let managerName = aPerson.department.manager.name 
// 문제점은 네비게이션 중간 단계를 수정하면 클라이언트 코드도 수정해야 한다는 것.
// 개선책은 위임 숨기기
let managerName = aPerson.department.managerName // manager 객체의 존재를 숨김(위임 숨기기)
let managerName = aPerson.manager.name // department 객체의 존재를 숨김
let managerName = aPerson.managerName // manager, department 둘 다 숨김
// 또는 목적에 따라서 아예 함수 분리
```

<br/>

### 3.18 중개자

- 객체의 대표적인 기능 하나로, 외부로부터 세부사항을 숨겨주는 캡슐화가 있다.
- 캡슐화하는 과정에서는 위임이 자주 활용된다.
- 사소한 세부사항은 숨기고 캡슐화하기 위한 수단 중 하나
- 하지만 해당 클래스의 메서드 중 절반이 다른 클래스에 구현을 위임하고 있다면?
- 이럴 때는 중개자를 제거한 후 남는 일이 거의 없다면 호출하는 쪽으로 인라인하자

```jsx
const manager = aPerson.manager

class Person {
    get manager() {
    return this.department.manager
    }
}
```

```jsx
const manager = aPerson.department.manager
```


### 3.19 내부자 거래

모듈간의 결합도를 줄이자

- 부모-자식 상속 구조에서 더 이상 수용이 안되는 경우, 서브클래스를 위임으로 바꾸기나 슈퍼클래스를 위임으로 바꾸기를 활용하자.


### 3.20 거대한 클래스

한 클래스가 너무 많은 일을 할 때

- 필드 수가 너무 많아진 클래스
    - 클래스 추출하기, 슈퍼클래스 추출하기, 서브클래스 추출하기
- 코드량이 너무 많은 클래스
    - 중복 제거
- 클라이언트 호출 패턴에서 기능 그룹을 묶을 단서를 얻은 뒤, 클래스 분리

### **3.21 서로 다른 인터페이스의 대안 클래스들**

- 인터페이스가 같아야 클래스를 갈아끼울 수 있으니, 메서드 시그니처 일치 시켜준다.
- 대안 클래스(구현 클래스)들 사이에 중복이 발생하면, 슈퍼클래스 추출하기를 적용할지 고려.
> 메서드 시그니처(Method signature) : 
메서드의 정의에서 메서드 이름과 매개변수 리스트의 조합
>

<br/>

### 3.22 **데이터 클래스**

- public 필드는 캡슐화 해주고, 변경하면 안되는 필드는 세터 제거하기.
- 불변 필드는 굳이 캡슐화 할 필요가 없고, 게터를 통하지 않고 그냥 필드 자체를 공개해도 된다.
- **한편, 데이터 클래스는 필요한 동작이 엉뚱한 곳에 정의돼 있다는 신호일 수 있다.**

> DTO(Data Transfer Object) : 계층 간 데이터 교환을 하기 위해 사용하는 객체로, DTO는 로직을 가지지 않는 순수한 데이터 객체(getter & setter 만 가진 클래스)입니다
>

```jsx
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
}

const user = new User("Bubble", -1);

console.log(user);
```

<br/>

### **3.23 상속 포기**

- 서브클래스에서, 상속 받은 멤버가 필요 없을 때
- 예전에는 계층 구조를 잘못 설계했기 때문으로 봤다. ⇒ 공통되지 않은 항목은 모두 서브클래스로.
- 하지만 지금은 항상 위와 같이 해야한다고 생각하지는 않는다.
    
     일부 동작을 재활용하기 위한 목적으로 상속을 활용 하는 것은 실무 관점에서 유용한 방식이기 때문.
    
- 상속을 위임으로 바꾸기 를 고려해볼 수 있다.

<br/>


### 3.24 **주석**

- 주석을 남겨야겠다는 생각이 들면, 가장 먼저 주석이 필요 없는 코드로 리팩터링해본다.
- 그 밖에 주석이 필요한 경우
    - 현재 진행 상황 뿐만 아니라 확실하지 않은 부분에 대해서
    - 코드를 지금처럼 작성한 이유에 대해서