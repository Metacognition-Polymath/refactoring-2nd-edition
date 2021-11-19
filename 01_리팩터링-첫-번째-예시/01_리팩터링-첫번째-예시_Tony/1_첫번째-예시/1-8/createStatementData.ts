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

  get volumeCredits() {
    // 포인트 적립
    let result = 0;
    return (result += Math.max(this.performance.audience - 30, 0)); // 음수 일 경우 포인트는 0점이 적립
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5); // 소수값 버림
  }
}

function createPerformanceCalculator(
  aPerformance: Performance,
  aPlay: PlayDetail,
) {
  // 팩터리 함수 : javascript에선 생성자가 서브 클래스의 인스턴스를 반환할 수 없어서 만듦
  // return new PerformanceCalculator(aPerformance, aPlay);
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
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
    // 팩터리함수(createPerformanceCalculator)가 play의 type에 따라 다른 인스턴스를 반환하는 역할도 함
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance),
    ); // 생성자 대신 팩터리 함수 이용 : js에선 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문 - 뭔말인지 이해 안됨
    return {
      ...aPerformance,
      play: calculator.play,
      amount: calculator.amount, // amountFor(performance),
      volumeCredits: calculator.volumeCredits, // volumeCreditsFor(performance),
    };
  }
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

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
