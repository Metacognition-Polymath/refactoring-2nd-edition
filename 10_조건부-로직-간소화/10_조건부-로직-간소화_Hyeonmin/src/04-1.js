const feathers = birds => new Map(birds.map(b => [b.name, feather(b)]))
const velocities = birds => new Map(birds.map(b => [b.name, velocity(b)]))

/*
1. Bird 클래스 생성, 조건문을 게터로 옮기기
2. 객체를 얻을 때 필요한 팩터리 함수 생성
3. Bird 종류 별 서브클래스 만들기 - 각 case 문을 해당 서브클래스에 오버라이드
4. 각각의 서브클래스를 만들 때마다 테스트 진행
5. 슈퍼클래스의 메서드는 기본 동작용으로 남겨놓는다.
*/

function feather(bird) {
	return createBird(bird).feather;
}

function velocity(bird) {
	return createBird(bird).velocity;
}

function createBird(bird) {
	switch (bird.type) {
		case '유럽 제비':
			return new EuropeanSwallow(bird);
		case '아프리카 제비':
			return new AfricanSwallow(bird);
		case '노르웨이 파랑 앵무':
			return new NorwegianBlueParrot(bird);
		default:
			return new Bird(bird);
	}
}

// Bird 슈퍼클래스
class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}

	get feather() {
		return '알수없음';
	}

	get velocity() {
		return null;
	}
}

// 유럽제비 서브클래스
class EuropeanSwallow extends Bird {
	get feather() {
		return '보통';
	}

	get velocity() {
		return 35;
	}
}

// 아프리카 제비 서브클래스
class AfricanSwallow extends Bird {
	get feather() {
		return this.numberOfCoconuts > 2 ? '지침' : '보통';
	}

	get velocity() {
		return 40 - 2 * this.numberOfCoconuts;
	}
}

// 노르웨이 파랑 앵무 서브클래스
class NorwegianBlueParrot extends Bird {
	get feather() {
		return this.voltage > 100 ? '그을림' : '예쁨';
	}

	get velocity() {
		return this.isNailed ? 0 : 10 + this.voltage / 10;
	}
}

const birds = [
  { name: '유제', type: '유럽 제비' },
  { name: '아제1', type: '아프리카 제비', numberOfCoconuts: 2 },
  { name: '아제2', type: '아프리카 제비', numberOfCoconuts: 4 },
  { name: '파앵1', type: '노르웨이 파랑 앵무', isNailed: false, voltage: 3000 },
  { name: '파앵2', type: '노르웨이 파랑 앵무', isNailed: true, voltage: 50 },
]
console.log(...feathers(birds))
console.log(...velocities(birds))