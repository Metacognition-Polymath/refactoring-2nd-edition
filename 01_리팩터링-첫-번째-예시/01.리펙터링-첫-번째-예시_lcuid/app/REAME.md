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

- 평소에는 타입이 드러나게 적지만 정확히 모를때는 관사를 적는다

 ```javascript
 function amountFor(aPerformance, play) { // 
```