//middle data
import { createStatementData } from "./1-6-createStatementData.js";

export { htmlStatement };
export { statement };

/**
 * [Insight]
  1. 전체 로직에서 구성하는 요소를 각각이 더 뚜렷이 부각하는 것이 좋다.
  2. 계산과 출력 형식의 분리
  3. 모듈화는 과정을 쉽게 파악 할 수 있게 한다.
     -> 명시적인 코드의 중요성
  4. 조건부 로직(10.4장)은 클래스를 통해서 조건부 로직으로 다형성 있게 바꿀 수 있다.
  5. 생성자를 팩터리 함수로 바꿈으로서 서브클래스
 */

/**
 *
 * [Refactoring point]
  1. 단위 쪼개기
  2. statementData 중간 데이터 구조로 옮김으로서 매개변수 삭제
  3. 중간데이터 구조에서 가져오면서 함수 옮기기(8.1장) 적용
  4. 반복문을 파이프라인으로 바꾸기 (8.8장) 적용
     -> for문을 사용한 total값 reduce 적용
  5. 중간데이터 생성 담당 function 생성
 *
 */
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    }석)\n`;
  }
  result += `총액 : ${usd(data.totalAmount / 100)}\n`;
  result += `적립 포인트 : ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }
}
function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}
function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber);
}
