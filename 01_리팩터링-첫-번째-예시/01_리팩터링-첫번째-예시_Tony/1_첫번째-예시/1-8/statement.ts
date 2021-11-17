import createStatementData from './createStatementData';
import { Invoice, Plays, StatementData } from './type';

const playData: Plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  asLike: { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoiceData: Invoice = {
  customer: 'BigCo',
  performances: [
    {
      playID: 'hamlet',
      audience: 55,
    },
    {
      playID: 'asLike',
      audience: 35,
    },
    {
      playID: 'othello',
      audience: 40,
    },
  ],
};

function formatAsUSD(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderPlainText(statementData: StatementData) {
  let result = `청구 내역 (고객명: ${statementData.customer})\n`;
  for (let perf of statementData.performances) {
    // 청구 내역을 출력
    result += `${perf.play.name}: ${formatAsUSD(perf.amount)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액 : ${formatAsUSD(statementData.totalAmount)}\n`;
  result += `적립 포인트 : ${statementData.totalVolumeCredits}점\n`;
  return result;
}

function statement(invoice: Invoice, plays: Plays) {
  return renderPlainText(createStatementData(invoice, plays)); // 두 번째 단계 : 청구 내역 출력
} // statement() 끝

const resultOfStatement = statement(invoiceData, playData);
console.log(resultOfStatement);

/**
 * statement()의 HTML 버전
 */
function renderStatementHTML(statementData: StatementData) {
  const HtmlString = String.raw`
    <h1>청구 내역 (고객명: ${statementData.customer})</h1>
    <table>
      <tr>
        <th>연극</th><th>좌석 수</th><th>금액</th>
      </tr>
      ${statementData.performances
        .map(perf => {
          // 청구 내역을 출력
          return String.raw`
            <tr>
              <td>${perf.play.name}</td>
              <td>${perf.audience}</td>
              <td>${formatAsUSD(perf.amount)}</td>
            </tr>
          `;
        })
        .join('')}
    </table>
    <p>총액 : <em>${formatAsUSD(statementData.totalAmount)}</em></p>
    <p>적립 포인트 : ${statementData.totalVolumeCredits}점</p>
  `;
  // const stringToHTML = document.createElement('div');
  // stringToHTML.innerHTML = HtmlString;
  // return stringToHTML;
  return HtmlString;
}

function HTMLStatement(invoice: Invoice, plays: Plays) {
  return renderStatementHTML(createStatementData(invoice, plays)); // 두 번째 단계 : 청구 내역 출력
}

// console.log('HTMLStatement', HTMLStatement(invoiceData, playData));
