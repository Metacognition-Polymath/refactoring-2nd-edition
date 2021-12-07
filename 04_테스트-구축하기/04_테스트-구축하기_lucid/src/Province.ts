import Producer from "./Producer";

interface IProvince {
	name: string
	demand: number;
	price: number;
	producers: any[];
	totalProduction: number;
  shortfall: number;
  profit: number;
  demandValue: number;
	addProducer: (producer: Producer) => {}
}


class Province implements IProvince{
	private readonly _name: string;
	private readonly _producers: any[];
	private _demand: number;
  private _price: number
  private _totalProduction: number;

	constructor(doc: any) {
		this._name = doc.name;
		this._producers = []
		this._price = doc.price;
		this._totalProduction = 0;
		this._demand = doc.demand;
		doc.producers.forEach((d: any) => this.addProducer(new Producer(this, d)));
	}

	addProducer(producer: Producer): {} {
		return {};
	}
	get name(){ return this._name; }

	get producers(){ return this._producers.slice() }

	get totalProduction(){ return this._totalProduction; }

	set totalProduction(args){ this._totalProduction = args; }

	get demand(){ return this._demand }
	set demand(arg: number){ this._demand = arg; }

	get price(){ return this._price; }
  set price(args){ this._price = args; }

  get shortfall(){
    return this.demand - this.totalProduction;
  }

  get profit(){
    return this.demandValue - this.demandCost;
  }
  get demandValue(){
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand(){
    return Math.min(this._demand, this.totalProduction)
  }

  get demandCost(){
    let reamingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a,b) => a.cost -b.cost)
      .forEach(p => {
        const contribution = Math.min(reamingDemand, p.production);
        reamingDemand -= contribution;
        result += contribution * p.cost;
      })
    
    return result;
  }

}


export default Province;