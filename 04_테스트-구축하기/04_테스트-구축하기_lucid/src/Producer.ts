import Province from "./Province";

interface IProducer {
  name: string;
  cost: number;
  province: Province;
  production: number;
}

export interface ProducerData {
  name: string;
  cost: number;
  production: number;
}

class Producer implements IProducer {
  private readonly _name: string;
  province: Province;

  private _cost :number;
  private _production: number;

  constructor(province: Province, data: any) {
    this._name = data.name
    this._cost = data.cost;
    this._production = data.production || 0;
    this.province = province;
  }

  get name(){ return this._name }
  get cost(){ return this._cost }
  set cost(arg) { this._cost = arg }
  get production(){ return this._production }
  set production(arg){
    const newProduction = Number.isNaN(arg) ?  0: arg;
    this.province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
  
}

export default Producer;