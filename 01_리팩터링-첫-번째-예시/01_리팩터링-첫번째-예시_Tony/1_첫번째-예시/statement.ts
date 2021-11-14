// 1. 첫 번째 예시
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

// 1.1 공연료 청구서를 출력하는 함수
type Invoice = {
  customer: string;
  performances: {
    playID: 'hamlet' | 'asLike' | 'othello';
    audience: number;
  }[];
};

type PlayDetail = {
  name: string;
  type: 'tragedy' | 'comedy';
};

type Plays = {
  hamlet: PlayDetail;
  asLike: PlayDetail;
  othello: PlayDetail;
};

function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  //   console.log(format(10000)); // $10,000.00 : string

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0; // 총액

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0); // 음수 일 경우 포인트는 0점이 적립
    // 희극 관객 5명 마다 추가 포인트를 제공
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5); // 소수값 버림
    // 청구 내역을 출력
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 : ${volumeCredits}점\n`;
  return result;
}

const resultOfStatement = statement(invoiceData, playData);
console.log(resultOfStatement);
