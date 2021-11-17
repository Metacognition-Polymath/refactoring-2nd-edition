# 리펙터링: 첫번째 예시

<hr/>

## 서론

- 리펙토링 역사, 원칙 나열 (x)
- 예시를 들 수 있게 제일 앞장에 배치, 이 예시로 원칙들을 소개할 예정
- 코드는 너무 긴 코드(x), 사용하기 쉬운 코드
- 항상 대규모라 생각하고 해라

## 1.1 함수 소개

- 다양한 연극을 외주로 공현하는 극단
- 연극의 장르와 규모 기준으로 비용 책정,
- 비극, 희극(코미디) 기준으로 가격 및 포인트 지급(할인해주는거같음)

~~~javascript
/**
 *  @typedef {object} invoice
 *  @property {string} customer
 *  @property {object} performances
 * */


/**
 *  @typedef {object} performances
 *  @property {string} playID
 *  @property {number} audience
 *
 * */

function statement(invoice, plays) {
	log(invoice, plays, 'args')
	
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `\t청구 내역 (고객명: ${invoice.customer})\n`
	
	const format = new Intl.NumberFormat('ko-KR',
		{
			style: "currency", currency: "KRW",
			minimumFractionDigits: 2
		}).format;
	
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = 0;
		
		switch (play.type) {
			case "tragedy":
				thisAmount = 40000;
				if (perf.audience > 30) {
					thisAmount += 1000 * (perf.audience - 30)
				}
				break;
			case "comedy":
				thisAmount = 30000;
				if (perf.audience > 20) {
					thisAmount += 1000 + 500 * (perf.audience - 20)
				}
				thisAmount += 300 * perf.audience;
				break;
			default:
				throw new Error("알수 없는 장르:" + play.type)
		}
		// 포인트를 적립한다
		volumeCredits += Math.max(perf.audience - 30, 0);
		
		if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
		
		// 청구 내역을 출력한다.
		result += `\t${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
		totalAmount += thisAmount;
	}
	result += `\t총액: ${format((totalAmount / 100))}\n`
	result += `\t적립 포인트: ${volumeCredits}점\n`
	
	return result;
}

~~~

- 결과 값

~~~
    청구 내역 (고객명: BigCo)
      Halmet:         ₩650.00 (55석)
      As You Like It: ₩490.00 (35석)
      Othello:        ₩500.00 (40석)
    총액:              ₩1,640.00
    적립 포인트: 47점

~~~

## 1.2 소감

- 나쁘지 않다. 하지만 수백줄짜리 프로그램이라면 이해하기 어렵다.
- 지저분 하다의 기준: 사람의 미적 기준(x), 컴파일러 기준은 상관없다, 하지만 사람이 수정해야하니, 미적 상태는 민감
- 설계가 나쁜 코드는 수정이 어렵다. 이럴 경우 구조 부터 바로 잡고, 수정 하는 편이 쉽다
- 컴퓨터가 이해하는 코드는 바보도 한다. 사람이 이해하도록 해야 진정한 실력자다
- 현재 코드 수정 부분

    1. 청구 내역을 html 으로 출력하는 기능(기존 코드는 조건문에 코드가 들어가서 지저분해진다, 나중에 코드 수정할때 복잡해짐)
    2. 다양한 연극 종류에 따른 계산법, 적립 포인트가 정리 되있지않는다
- 바꿀일이 없다면 상관없지만, 누군가 코드를 읽을때 파악하기 어려우면 대책을 마련해야함

## 1.3 첫 단계

- 테스트 코드 부터 마련해야한다
- 테스트 코드는 시간이 좀 거릴지만, 디버깅 시간 및 작업 시간이 단축된다

## 1.4 statement() 함수 쪼개기

- switch 문, 한 번의 공연 요금 계산 코드

~~~javascript
   function amountFor(perf, play) {
	let result = 0;  // 명확한 이름으로 벼녁ㅇ
	
	switch (play.type) {
		case "tragedy":
			result = 40000;
			if (perf.audience > 20) {
				result += 1000 * (perf.audience - 30)
			}
			break;
		case "comedy":
			result = 30000;
			if (perf.audience > 20) {
				result += 1000 + 500 * (perf.audience - 20)
			}
			result += 300 * perf.audience;
			break;
		default:
			throw new Error("알수 없는 장르:" + play.type)
	}
	return result;
}
~~~

- 휘발성이 높은 코드로 머리속에 기록, 잊지 않으려면 코드에 반영(워드 커닝햄)
- 코드 조각을 별도 함수 추출 방식, 파악한 정보를 코드에 반영, 추출 코드 하는 일을 설명하는 이름으로 지은다
- 함수로 뺄 경우 스코프에 벋어나는 변수 확인, perf, play, thisAmount 해당됨(thisAmount 는 함수 안에서 값이 바뀜, 조심히 다뤄야함)
- 리팩터링은 작은 단계로 진행, 중간에 실수 나올 경우 쉽게 찾을 수 잇음
- statement 중첩 함수로 만들수 있음(js 특성), 기존에 쓰던 변수명을 같은 함수 스코르에 하니 편하다
- 작은 단위로 푸쉬하자(롤백이 쉬움), 테스트 하기 용이함
- 결과 값은 결과값으로 변수명을 변경하자

~~~javascript
   // let thisAmount = 0;
let result
~~~

### play 변수 제거하기(변수 인라인화 하기)

- 평소에는 타입이 드러나게 적지만 정확히 모를때는 관사를 적는다

 ```javascript
 function amountFor(aPerformance, play) { // 
```

- play 를 제거하기 위해 함수로 만든다 (임시 변수를 질의 함수로 바꾼다)

~~~javascript
    function playFor(aPerformance) {
	
	return plays[aPerformance.playID];
}
  // 기존에 있던 play를 지역변수 제거 해서 추출 작업이 쉬어졌다
  function amountFor(aPerformance) { // aPerformance 를 넣고 play 에 의존되어있는 변수를  다 변경했다
	let result = 0;  // 명확한 이름으로 변경
	
	switch (playFor(aPerformance).type) {
		case "tragedy":
			result = 40000;
			if (aPerformance.audience > 20) {
				result += 1000 * (aPerformance.audience - 30)
			}
			break;
		case "comedy":
			result = 30000;
			if (aPerformance.audience > 20) {
				result += 1000 + 500 * (aPerformance.audience - 20)
			}
			result += 300 * aPerformance.audience;
			break;
		default:
			throw new Error("알수 없는 장르:" + playFor(aPerformance).type)
	}
	return result;
}

~~~

### 적립 포인트 계산 코드 추출

 - volumeCredits 반복문에 있어 까다 롭다, 그래서 초기화 후 계속 더 해주는 함수로 추출

### format 변수 제거하기

 - 임시 변수로 format 이 존재한다.format 은 함술를 대입 형태, 직접 선언해서 바꿔보자
 - 이름이 너무 추상적이다. formatAsaUSD 는  장황함
 - 핵심 기능에 맞게 화폐 단위 맞추는 이름을 골라 함수 선언 바꾸기적용 
~~~javascript
    function usd(aNumber) { // 인자 값을 받아서 format 형식으로 바꿔준다
		return new Intl.NumberFormat('ko-KR',
			{
				style: "currency", currency: "KRW",
				minimumFractionDigits: 2
			}).format(aNumber);
	}
~~~
 - 반복문안에 쪼개서 성능 걱정 => 성능 영향은 미미하다
 - 리펙터링은 성능개선이 아니다(추가로 개선할 경우도 필요하다)

### volumeCredit, totalPrice 분리하기
                      
 - 기존 반복문에 있는걸 분리 시켜줘서 각자 roof 가 돌개해주고 result 를 반환 시켜준다
~~~javascript
  result += `\t총액: ${krw((totalAmount() / 100))}\n`
  result += `\t적립 포인트: ${totalVolumeCredit()}점\n`

   function totalVolumeCredit() {
    
      let result = 0
      for (let perf of invoice.performances) {
        result += Math.max(perf.audience - 30, 0);
        if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);
      }
      return result
    }
    function totalAmount() {
      let result = 0;
      for (let perf of invoice.performances){
        result += amountFor(perf)
      }
      return result;
    }

~~~

## 1.5 중간 점검: 난무하는 중첩ㅎ함수
 
 - 코드 구조가 좋아졌다(메인함수는 줄어들었고 함수를 많이 만들었다)
 - 난 더 복잡해진거같다

## 1.6 계산 단계와 포맷팅 단계 분리
                
 - statement 함수는 계산단계와 html 코드를 출력하는 단계가 공존한다
 - 단계 나누기 방법을 제시한다
   1) 우선 전체 복사
   2) 컴파일-테스트-커밋
   3) 중간 데이터 구조 객체 전달
   4) 반복문을 파이프라인으로 바꾸기

## 1.7 중간 점검
 - 두 파일로 분리되서 html 코드와 계산코드를 기능을 명백히 나눌수 있었다

## 1.8 다형성을 활용해 계산 코드 재구성
- 조건부 로직을 통해서 해결하는 문제를 다형성을 활용해 각자의 값을 만들어보자
- es6 부터 클래스를 지원하니 활용해보자.
- 조구부 로직 => 다형성 클래스(부모,상속)