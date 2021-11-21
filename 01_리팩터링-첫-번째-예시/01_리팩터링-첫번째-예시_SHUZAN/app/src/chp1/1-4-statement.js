const invoices = require("./data/invocies.json");
const plays = require("./data/plays.json");

/**
 * [Insight]
  1. ✨긴 함수를 리팩터링 할 떄는 전체 동작을 각각 부분으로 나눌 수 있는 지점을 찾는다.
     (ex) swtich
  2. 코드 조각을 별도 함수로 추출한다.
  3. 별도 함수로 뺏을 때, 유효범위를 벗어나는 변수 유무를 확인한다.
  4. ✨리팩토링은 조금씩 변경하고 테스트하여, 피드백 주기를 짧게 가져감으로서 실수하더라도 버그를 쉽게 잡도록 한다.
  5. 추출 함수코드에서 명확하게 표현할 수 있는 방법을 찾는다.
     (ex) 명확한 변수명
     (tip) 매개변수의 역할이 뚜렷하지 않을 떄는 부정관사(a/an)을 붙인다.
  6. 계산 가능한 매개변수는 임시변수를 질의함수로 바꾸기를 통해 (7.4장) 리팩토링 할 수 있다.
  7. 지역 변수를 제거하여 얻는 큰 장점은 추출 작업이 쉬워진다는 것이다.
     -> 유효 범위를 신경 쓸 대상이 줄어든다.
  8. 임시 변수 -  자신이 속한 루틴에만 의미가 있어서 루틴이 길고 복잡해 질 수 있다.
  9. 함수명 - 함수의 핵심에 맞춰서 이름을 붙인다. 함수 선언 바꾸기 (6)
 
 */

/**
 *
 * [Refactoring point]
 *
  1. switch 함수추출
  2. 별도 함수를 뺏을 때, 유효범위를 벗어나는 유무 확인
     (1) 값이 바뀌지 않는 변수
         -> 매개변수로 전달
     (2) 값이 바뀌는 변수
       -> 변수를 초기화하여 사용하고 반환
  3. 명학환 변수명
  4. computed하게 계산 가능한 불필요한 변수 제거
  5. 변수 인라인 하기
  6. 함수 선언 바꾸기
  7. 임시 변수 제거
 *
 */

//Root Function ******************************************************************
export function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
  }
  result += `총액 : ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트 : ${totalVolumeCredits()}점\n`;
  return result;

  //start nested funtion

  //[total] ------------------------------------------------------------------
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumneCreditFor(perf);
    }
    return result;
  }

  //[unit format] ---------------------------------------------------------------------
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }
  //[computed value] ------------------------------------------------------------------------
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumneCreditFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다
    if (playFor(perf).type === "comedy")
      result += Math.floor(perf.audience / 5);
    return result;
  }

  function amountFor(aPerformance) {
    //(1) aPerformance,play
    //(2) result
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy": //비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": //희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    // (2)
    return result;
  }
}

const result = statement(invoices, plays);
