/**
 *  @typedef {object} Bird
 *  @property {string} name
 *  @property {'유럽제비'|'아프리카제비'|'노르웨이 파랑앵무'} type
 *  @property {number} totalCount
 *  @property {number} voltage
 *  @property {boolean} isNailed
 *
 * * */

/**
 *  @param {Bird} bird
 * */
function plumage(bird) {
 	switch (bird.type){
	  case '유럽제비':
			return '보통이다;'
	  case '아프리카제비':
			return bird.totalCount > 2 ? '지쳣다' : '보통이다';
	  case '노르웨이 파랑앵무':
			return bird.voltage > 100 ? '그열렷다' : '예쁘다'
	  default:
			return  '알수없다'
	 }
	
}

/**
 *  @param {Bird} bird
 * */
function airSpeedVelocity(bird) {
	switch (bird.type){
		case '유럽제비':
			return 35
		case '아프리카제비':
			return 40 -2 * bird.totalCount;
		case '노르웨이 파랑앵무':
			return bird.isNailed ? 0 : 10 + bird.voltage / 10;
		default:
			return null;
	}
	
}

/**
 *  @param {Bird[]} birds
 * */
function plumAges(birds) {
	return new Map(birds.map(b => [b.name], plumage))
}


/**
 *  @param {Bird[]} birds
 * */
function speeds(birds){
	return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
}