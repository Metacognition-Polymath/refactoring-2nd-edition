let _repositoryData;
initialize()

function initialize() {
	_repositoryData = {};
	_repositoryData.customers = new Map();
}

function registerCustomer(id) {
	if (! _repositoryData.customers.has(id)){
		_repositoryData.customers.set(id, new Customer(id));
	}
	return findCustomer(id);
}

function findCustomer(id) {
	return _repositoryData.customers.get(id);
}

class Customer {
  constructor(id) {
    this._id = id;
		this._testData;
  }
  get id() {
    return this._id;
  }

	get testData() {
		return this._testData;
	}

	set testData(arg) {
		this._testData = arg;
	}
}

class Order {
  constructor(data) {
    this._number = data.number
    this._customer = registerCustomer(data.customer);
  }
  get customer() {
    return this._customer
  }
}

const o1 = new Order({ number: 1, customer: 'a' });
const o2 = new Order({ number: 2, customer: 'a' });
console.log(o1.customer.testData);
o2.customer.testData = 'hello'
console.log(o1.customer.testData);