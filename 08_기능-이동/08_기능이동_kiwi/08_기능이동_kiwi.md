### 8.0 기능 이동

[학습 내용 정리 Notion Page](https://first-hare-34f.notion.site/08-583ec20d68564588b8cc60af41547b39)


- 요소를 다른 컨텍스트(클래스나 모듈 등)로 옮기는 일운 리팩터링의 중요한 축이다.

- 함수 옮기기 : 다른 클래스나 모듈로 함수를 옮길 때

- 필드 옮기기 : 다른 클래스나 모듈로 필드를 옮길 때

- 문장을 함수로 옮기기, 문장을 호출한 곳으로 옮기기, 문장 슬라이드하기, 인라인 코드를 함수 호출로 바꾸기 : 문장 단위에서의 기능 이

- 반복문 쪼개기, 반복문을 파이프라인으로 바꾸기 : 반복문 관련 리팩터링

- 죽은 코드 제거하기 : 필요 없는 문장들을 제거할 때

<br>
<br>


### 8.1 함수 옮기기
<br>


**배경**

함수를 한 곳에서 다른 곳으로 이동 

아래의 여러 가지 형태를 보일 수 있음

- inner 함수를 최상위로 이동
- A 클래스의 메서드를 B 클래스로 이동
- A 모듈의 함수를 B 모듈로 이동
- 기타
    - 함수가 자신이 속한 모듈의 요소들보다 다른 모듈의 요소들을 더 많이 참조할 때
    - 다른 함수 안에서 도우미 역할로 정의된 함수 중 독립적인 가치가 있는 함수가 있을 때
<br>


**절차**

1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
2. 선택한 함수가 다형 메서드인지 확인한다.
3. 선택한 함수를 타깃 컨텍스트로 복사한다.(이 때 원래의 함수를 소스 함수라 하고 복사해서 만든 새로운 함수를 타깃 함수하 한다.) 
    
    타깃 함수가 새로운 터전에 잘 자리 잡도록 다듬는다.
    
4. 정적 분석을 수행한다.
5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
7. 테스트한다.
8. 소스 함수를 인라인할지 고민해본다.
<br>




before
```jsx
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  // 총 거리 계산
  function calculateDistance() {
    let result = 0;

    for (let i = 0; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }

    return result;
  }

  // 두 지점의 거리 계산
  function distance(p1, p2) {
    const EARTH_RADIUS = 3959; // mile
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) *
        Math.cos(radians(p1.lat)) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
}

  // 라디안 값으로 변환
  function radians(degrees) {
    return (degrees * Math.PI) / 180;
}

  // 총 시간 계산
  function calculateTime(params) {}
}
```


after

```jsx
function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);

  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace,
  };

  function totalDistance() {
    let result = 0;

    for (let i = 0; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }

    return result;
  }

  // 두 지점의 거리 계산
  function distance(p1, p2) {
    // 하버사인 공식은 다음 링크 참고
    // http://www.movable-type.co.uk/scrips/latlong.html
    const EARTH_RADIUS = 3959; // mile
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) *
        Math.cos(radians(p1.lat)) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
  }

  // 라디안 값으로 변환
  function radians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function calculateTime(params) {}

}
```

<br>
<br>


### 8.2. 필드 옮기기
<br>


**배경**

필드를 한 곳에서 다른 곳으로 이동즉, 데이터 구조의 변경아래 목록에서 "레코드"는 "클래스"나 "객체"로 치환 가능

- 함수에 어떤 레코드를 넘길 때 마다 또 다른 레코드의 필드도 함께 넘기고 있을 때
- 한 레코드를 변경하는데 다른 레코드의 필드까지 변경해야 할 때
- 구조체 여러 개에 정의된 똑같은 필드들을 갱신해야 할 때
<br>


**절차**

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
2. 테스트한다.
3. 타깃 객체에 필드(와 접근자 메서드들)를 생성한다.
4. 정적 검사를 수행한다.
5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
6. 접근자들이 타깃 필드를 사용하도록 수정한다.
7. 테스트한다.
8. 소스 필드를 제거한다.
9. 테스트한다.
<br>


**예시**

before

```jsx
class Customer {
  constructor(name, discountRate) {
	  this._name = name;
	  this._setDiscountRate(discountRate);
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._contract.discountRate;
  }

  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);

    // 다른 멋진 일들
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}
```


after 

```jsx
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }

  get discountRate() {
    return this._contract.discountRate;
  }

  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);

    // some code
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }

  set discountRate(arg) {
    this._discountRate = arg;
  }
}
```
<br>
<br>



### 8.3 문장을 함수로 옮기기
<br>


**배경**

문장을 함수로 옮겨 수정시에 단 한곳만 수정하여 해결할 수 있음

함수와 같이 사용하는 문장을 함수 안으로 이동 피호출 함수와 한 몸은 아니지만, 여전히 함께 호출돼야 하는 경우라면 둘을 합쳐 별개의 함수로 추출(6.1)하는 방법도 가능

- 특정 함수를 호출할 때 마다 그 앞이나 뒤에서 똑같은 문장이 반복될 때
<br>


**절차**

1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이스하기(8.6)를 적용해 근처로 옮긴다.
2. 타깃 함수를 호출하는 곳이 한 곳뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트한다. 이 경우하면 나머지 단계는 무시한다.
3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장등을 함께' 다른 함수로 추출(6.1)한다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.
4. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인(6.2)한 후 원해 함수를 제거한다.
6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다(6.5). (더 나은 이름이 있다면 그 이름을 쓴다)
<br>


before

```jsx
function renderPerson(outStream, person) {
  const result = [];

  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`);//.  <- 제목 출력
  result.push(emitPhotoData(person.photo));

  return result.join('\n');
}

function photoDiv(p) {
  return ['<div>', `<p>제목: ${p.title}</p>`, emitPhotoData(p), '</div>'].join(
    '\n',
  );
}

function emitPhotoData(aPhoto) {
  const result = [];

  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);

  return result.join('\n');
}
```

after
```jsx
function renderPerson(outStream, person) {
  const result = [];

  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
	result.push(emitPhotoData(person.photo));

  return result.join('\n');
}

function photoDiv(p) {
  return [
				'<div>',
				emitPhotoData(p),
				'</div>'].join('\n',
  );
}

function emitPhotoData(p){
	return [
				`<p>제목: ${p.title}</p>`,
			  `<p>위치: ${p.location}</p>`);
			  `<p>날짜: ${p.date.toDateString()}</p>`);
				].join("\n");
} 
				
```
<br><br>



### 8.4 문장을 호출한 곳으로 옮기기
<br>


**배경**

함수의 기능을 쪼개서 문장을 밖으로 이동

경우에 따라 문장을 더 슬라이스 하거나 함수로 추출할 수도 있음

- 함수가 둘 이상의 다른 일을 하는데, 그 중 하나만 변경이 필요할 때
<br>


**절차**

1. 호출자가 한두 개뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음(혹은 마지막)줄(들)을 잘라내어 호출자(들)로 복사해 넣는다(필요하면 적당히 수정한다). 테스트만 통과하면 이번 리팩토링은 여기서 끝이다.
2. 더 복잡한 상황에서는, 이동하지 '않길' 원하는 모든 문장을 함수로 추출(6.1)한 다음 검색하기 쉬운 임시 이름을 지어준다.
3. 원래 함수를 인라인(6.2)한다.
4. 추출된 함수의 이름을 원래 함수의 이름으로 변경한다(6.5). (더 나은 이름이 있다면 그 이름을 쓴다)
<br>


before
```jsx
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);

  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff())
    .forEach((p) => {
      outStream.write('<div>\n');
      emitPhotoData(outStream, p);
      outStream.write('</div>\n');
    });
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
```

after
```jsx
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
  outStream.write(`<p>위치: ${person.photo.location}</p>\n`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff())
    .forEach((p) => {
      outStream.write('<div>\n');
      emitPhotoData(outStream, p);
      outStream.write(`<p>위치: ${p.location}</p>\n`);
      outStream.write('</div>\n');
    });
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
}
```
<br>



### 8.5 인라인 코드를 함수 호출로 바꾸기
<br>


**배경**

똑같은 코드를 반복하는 대신 함수 호출로 변경

해당 기능을 하는 함수가 이미 존재한다면 이 방법 사용해당 기능을 하는 함수가 없다면 함수 추출하기(6.1) 사용

- 동일한 목적의 같은 코드가 반복 사용되고, 해당 목적의 함수가 존재할 때
    - (우연히) 같은 코드가 있더라도 다른 목적이라면 적용 X
<br>


**절차**

1. 인라인 코드를 함수 호출로 대체한다.
2. 테스트한다.
<br>


**예시**

before
```jsx
let appliesToMass = false;

for (const s of states) {
  if (s === 'MA') {
    appliesToMass = true;
  }
}
```

after
```jsx
let appliesToMass = states.includes('MA');
```

### 8.6 문장 슬라이드하기
<br>


**배경**

관련 있는 코드들을 한 곳으로 뭉치도록 이동

- 관련있는 코드가 흩어져 있을 때
<br>


**절차**

1. 코드 조각(문장들을 이동할 목표위치를 찾는다.
    
    코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다.
    
    다음과 같은 간섭이 있다면 이 리팩터링을 포기한다.
    
2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
3. 테스트한다.
<br>


before
```jsx
let result;

if (availableResources.length === 0) {
  result = createResource();
  allocatedResources.push(result);
} else {
  result = availableResources.pop();
	allocatedResources.push(result);
}

return result;
```

after
```jsx
let result;

if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}

allocatedResources.push(result);
return result;
```
<br>


### 8.7 반복문 쪼개기

<br>

**배경**

반복문을 단일 목적만을 수행하는 여러개의 반복문으로 쪼개기

리팩터링과 최적화는 구분하자. 여러개의 반복문이 병목이라는게 밝혀지면 그때 합치는건 간단

- 반복문 하나에서 두 가지 이상의 일을 할 때
<br>

**절차**

1. 반복문을 복제해 두 개로 만든다.
2. 반복문이 중복되어 생기는 부수효과를 파악해서 제거한다.
3. 테스트한다.
4. 완료됐으면, 각 반복문을 함수로 추출(6.1)할지 고민해본다.

<br>

**예시**

before
```jsx

let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) {
    youngest = p.age;
  }
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```

after
```jsx
function youngestAge() {
  let youngest = people[0] ? people[0].age : Infinity;

  for (const p of people) {
    if (p.age < youngest) {
      youngest = p.age;
    }
  }

  return youngest;
}

function totalSalary() {
  let totalSalary = 0;

  for (const p of people) {
    totalSalary += p.salary;
  }

  return totalSalary;
}

function example() {
  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}
```

after_bonus(반복문 -> 파이프라인 함수 사용)
```jsx
function youngestAge() {
  return Math.min(...people.map((p) => p.age));
}

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}

function example() {
  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}
```
<br><br>

### 8.8 반복문을 파이프라인으로 바꾸기
<br>

**배경**

반복문을 파이프라인으로 변경하여 논리의 흐름을 쉽게 파악할 수 있다.
<br>
**절차**

1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
2. 각각의 단위 행위를 파이프라인 연산으로 대체한다. 반복문의 첫줄부터 시작하며 각 단위의 행위를 수정한 뒤 테스트를 진행한다.
3. 수정이 완료되면 반복문을 제거한다.
<br>

**예시**

before
```jsx
function acquireData(input) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];

  for (const line of lines) {
    if (firstLine) {
      firstLine = false;

      continue;
    }

    if (line.trim() === '') {
      continue;
    }

    const record = line.split(',');

    if (record[1].trim() === 'India') {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }

  return result;
}
```

after
```jsx
function acquireData(input) {
  const lines = input.split('\n');

  const result = lines
    .slice(1)
    .filter((line) => line.trim !== '')
    .map((line) => line.split(','))
    .filter((record) => record[1].trim() === 'India')
    .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

  return result;
}
```


### 8.9 죽은 코드 제거하기

**배경**

사용하지 않는 코드는 제거한다. 남겨놓으면 소스코드가 복잡해지며 나중에 다시 사용하게 된다면 버전 관리 시스템을 이용한다.

**절차**

1. 죽은 코드를 외부에서 참조할 수 있는 경우라면 혹시라도 호출하는 곳이 있는지 확인한다.(ex 함수 하나가 통째로 죽었을 때)
2. 없다면 죽은 코드를 제거한다.
3. 테스트한다.


**예시**

```jsx
/**
 * 리팩토링 전
 */
if (false) {
  doSomethingThatUsedToMatter();
}

/**
 * 리팩토링 후
 */
```


