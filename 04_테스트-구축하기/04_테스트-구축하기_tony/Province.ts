function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

type TProducer = {
  name: string;
  cost: number;
  production: number;
};

type Doc = {
  name: string;
  producers: TProducer[];
  demand: number;
  price: number;
};

/**
 * Province 생성자 : JSON문서로 부터 만들어진 자바스크립트 객체를 받음
 * JSON 데이터로 부터 지역 정보를 읽어오는 코드
 */
class Province {
  private _name: string;
  private _producers: TProducer[];
  private _totalProduction: number;
  private _demand: any;
  private _price: number;
  constructor(doc: Doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg: any) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(arg: number) {
    this._demand = +arg;
  }
  get price() {
    return this._price;
  }
  set price(arg) {
    this._price = +arg;
  }
  get shortfall() {
    return this._demand - this.totalProduction;
  }

  // 수익을 계산하는 코드
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost) // cost 오름차순
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}

/**
 * 단순 데이터 저장소
 */
class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: any | number;
  constructor(aProvince: Province, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
  get name() {
    return this._name;
  }
  get cost() {
    return this._cost;
  }
  set cost(arg) {
    this._cost = +arg;
  }

  get production() {
    return this._production;
  }
  set production(amountStr) {
    // 리팩터링을 하고 싶지만 먼저 테스트 코드를 작성해야 한다
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
