//middle data
import { createStatementData } from "./1-8-createStatementData.js";

export { htmlStatement };
export { statement };

/**
 * [Insight]
  1. 전체 로직에서 구성하는 요소를 각각이 더 뚜렷이 부각하는 것이 좋다.
  2. 계산과 출력 형식의 분리
  3. 모듈화는 과정을 쉽게 파악 할 수 있게 한다.
     -> 명시적인 코드의 중요성
 */

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
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

function renderPlainText(data, plays) {
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
