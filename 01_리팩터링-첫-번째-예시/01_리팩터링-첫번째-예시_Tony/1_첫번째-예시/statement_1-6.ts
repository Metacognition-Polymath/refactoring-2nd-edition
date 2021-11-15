{
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

  // 1.6 계산 단계와 포맷팅 단계 분리하기

  type Performance = {
    playID: 'hamlet' | 'asLike' | 'othello';
    audience: number;
  };

  type Invoice = {
    customer: string;
    performances: Performance[];
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

  function renderPlainText(statementData: StatementData, plays: Plays) {
    let result = `청구 내역 (고객명: ${statementData.customer})\n`;
    // if (!statementData.performances) {
    //   throw new Error('statementData.performances is undefined');
    // }
    for (let perf of statementData.performances) {
      const play = playFor(plays, perf); // 이건 굳이 함수로 만들어야 되나? plays[perf.playID];
      const thisAmount = amountFor(perf, play); // 총액
      // 청구 내역을 출력
      result += `${play.name}: ${formatAsUSD(thisAmount)} (${
        perf.audience
      }석)\n`;
    }

    const totalAmountNumber = totalAmount(plays) ?? 0;
    if (!totalAmount(plays) && totalAmount(plays) !== 0) {
      console.log('totalAmount(plays)', totalAmount(plays));
      throw new Error('totalAmount(plays) is undefined');
    }
    result += `총액 : ${formatAsUSD(totalAmountNumber)}\n`;
    result += `적립 포인트 : ${totalVolumeCredits(plays)}점\n`;
    return result;

    function amountFor(aPerformance: Performance, play: PlayDetail) {
      let result = 0;
      switch (play.type) {
        case 'tragedy':
          result = 40000;
          if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
          }
          break;
        case 'comedy':
          result = 30000;
          if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${play.type}`);
      }
      return result;
    }

    function playFor(plays: Plays, aPerformance: Performance) {
      // 책엔 plays를 받지 않지만 typescript에선 받지 않으면 에러이므로 parameter를 추가 함
      return plays[aPerformance.playID];
    }

    function volumeCreditsFor(play: PlayDetail, perf: Performance) {
      // 포인트 적립
      let result = 0;
      result += Math.max(perf.audience - 30, 0); // 음수 일 경우 포인트는 0점이 적립
      // 희극 관객 5명 마다 추가 포인트를 제공
      if (play.type === 'comedy') result += Math.floor(perf.audience / 5); // 소수값 버림
      return result;
    }

    function formatAsUSD(aNumber: number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }

    function totalVolumeCredits(plays: Plays) {
      let volumeCredits = 0;
      // if (!statementData.performances) {
      //   throw new Error('statementData.performances is undefined');
      // }
      for (let perf of statementData.performances) {
        const play = playFor(plays, perf);
        // 포인트 적립
        volumeCredits += volumeCreditsFor(play, perf);
      }
      return volumeCredits;
    }

    function totalAmount(plays: Plays) {
      let totalAmount = 0;
      if (!statementData.performances) {
        return console.error('statementData.performances is undefined');
      }
      for (let perf of statementData.performances) {
        const play = playFor(plays, perf); // 이건 굳이 함수로 만들어야 되나? plays[perf.playID];
        const thisAmount = amountFor(perf, play); // 총액
        totalAmount += thisAmount;
      }
      return totalAmount;
    }
  }

  type StatementData = {
    customer: string; // customer?: string; 로 선언했던 것을 statementData에 직접 선언하므로서 undefined를 잡지 않아도 됨
    performances: Performance[];
  };

  function statement(invoice: Invoice, plays: Plays) {
    const statementData: StatementData = {
      // 이 안에 바로 대입해줘야 undefined에 대한 예외처리를 하지 않아도 됨
      customer: invoice.customer,
      performances: invoice.performances.map(enrichPerformance),
    };
    // statementData.customer = invoice.customer;
    // statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays); // 두 번째 단계 : 청구 내역 출력

    function enrichPerformance(aPerformance: Performance) {
      return { ...aPerformance }; // Object.assign({}, aPerformance) 와 동일
    }
  }

  const resultOfStatement = statement(invoiceData, playData);
  console.log(resultOfStatement);
}
