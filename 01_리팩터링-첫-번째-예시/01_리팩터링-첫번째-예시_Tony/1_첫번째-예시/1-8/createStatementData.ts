import {
  Invoice,
  Performance,
  PlayDetail,
  Plays,
  StatementData,
  StatementPerformance,
} from './type';

class PerformanceCalculator {
  public performance;
  public play;
  constructor(aPerformance: Performance, aPlay: PlayDetail) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
  get amount() {
    let result = 0;
    switch (this.play.type) {
      case 'tragedy':
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    // 포인트 적립
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0); // 음수 일 경우 포인트는 0점이 적립
    // 희극 관객 5명 마다 추가 포인트를 제공
    if (this.play.type === 'comedy')
      result += Math.floor(this.performance.audience / 5); // 소수값 버림
    return result;
  }
}

function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData: StatementData = {
    // 이 안에 바로 대입해줘야 undefined에 대한 예외처리를 하지 않아도 됨
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: NaN,
    totalVolumeCredits: NaN,
  };
  return {
    ...statementData,
    totalAmount: totalAmount(statementData),
    totalVolumeCredits: totalVolumeCredits(statementData),
  };

  function enrichPerformance(aPerformance: Performance): StatementPerformance {
    const calculator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance),
    );
    const performance = {
      ...aPerformance,
      play: calculator.play,
    }; // Object.assign({}, aPerformance) 와 동일
    return {
      ...performance,
      amount: calculator.amount, // amountFor(performance),
      volumeCredits: calculator.volumeCredits, // volumeCreditsFor(performance),
    };
  }

  // function volumeCreditsFor(perf: Performance & { play: PlayDetail }) {
  //   // 포인트 적립
  //   let result = 0;
  //   result += Math.max(perf.audience - 30, 0); // 음수 일 경우 포인트는 0점이 적립
  //   // 희극 관객 5명 마다 추가 포인트를 제공
  //   if (perf.play.type === 'comedy') result += Math.floor(perf.audience / 5); // 소수값 버림
  //   return result;
  // }

  function playFor(aPerformance: Performance) {
    // 책엔 plays를 받지 않지만 typescript에선 받지 않으면 에러이므로 parameter를 추가 함
    return plays[aPerformance.playID];
  }

  // function amountFor(aPerformance: Performance & { play: PlayDetail }) {
  //   // calculator를 만들어 놓고 이 함수는 사용을 안하는 것 같은데 왜 이렇게 하는걸까
  //   return new PerformanceCalculator(aPerformance, playFor(aPerformance))
  //     .amount;
  // }

  function totalVolumeCredits(statementData: StatementData) {
    return statementData.performances.reduce(
      (total, performance) => total + performance.volumeCredits,
      0,
    ); // 초기값을 0 을 줘서 total이 자동으로 number로 타입이 지정 됨
  }

  function totalAmount(statementData: StatementData) {
    return statementData.performances.reduce(
      (total, performance) => total + performance.amount,
      0,
    );
  }
}

export default createStatementData;
