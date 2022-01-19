class Bird {
	/**
	 *  @param {Bird} birdObj
	 * */
	constructor(birdObj) {
		Object.assign(this, birdObj)
	}
	
	get plumage(){
		switch (this.type){
			case '유럽제비':
				return '보통이다;'
			case '아프리카제비':
				return this.totalCount > 2 ? '지쳣다' : '보통이다';
			case '노르웨이 파랑앵무':
				return this.voltage > 100 ? '그열렷다' : '예쁘다'
			default:
				return  '알수없다'
		}
	}
	
	get airSpeedVelocity(){
		switch (this.type){
			case '유럽제비':
				return 35
			case '아프리카제비':
				return 40 -2 * this.totalCount;
			case '노르웨이 파랑앵무':
				return this.isNailed ? 0 : 10 + this.voltage / 10;
			default:
				return null;
		}
	}
}

console.log(
	new EuroSwallow().plumage
)

class EuroSwallow extends Bird{
	constructor(bird) {
		super(bird);
	}
	
	get plumage() {
		return '보통이다;'
	}
	
}

function AfricanSwallow(bird) {
	return undefined;
}

class NorwgianBlueParrot {
	constructor(bird) {
		
	}
	
}

/**
 *  @param {Bird} bird;
 * */

function createBird(bird) {
	switch (this.type){
		case "유럽제비":
			return new EuroSwallow(bird)
		case '아프리카제비':
			return new AfricanSwallow(bird);
		case '노르웨이 파랑앵무':
			return new NorwgianBlueParrot(bird);
		default:
			return new Bird();
	}
}

function plumage(bird) {
	return createBird(bird).plumage;
}


/**
 *  @param {Bird} bird
 * */
function airSpeedVelocity(bird) {
	return createBird(bird).airSpeedVelocity;
	
}
