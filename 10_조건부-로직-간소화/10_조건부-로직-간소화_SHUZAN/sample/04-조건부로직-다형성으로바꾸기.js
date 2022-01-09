//샘플 데이터
const birds = [
  { name: "EuropeanSwallow", type: "EuropeanSwallow" },
  { name: "AfricanSwallow1", type: "AfricanSwallow", numberOfCoconuts: 2 },
  { name: "AfricanSwallow2", type: "AfricanSwallow", numberOfCoconuts: 4 },
  { name: "NorwegianBlueParrot1", type: "NorwegianBlueParrot", isNailed: false, voltage: 3000 },
  { name: "NorwegianBlueParrot2", type: "NorwegianBlueParrot", isNailed: true, voltage: 50 },
];

/************************************************************************************************ */
//Bird Class
class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    switch (this.type) {
      default:
        return "unknown"; //기본 동작
    }
  }

  get airSpeedVelocity() {
    switch (this.type) {
      default:
        return null;
    }
  }
}

//Bird subclass - 종별 서브 클래스
class EuropeanSwallow extends Bird {
  get plumage() {
    return "average";
  }
  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "tired" : "average";
  }
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}
class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this.voltage > 100 ? "scorched" : "beautiful";
  }
  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

/************************************************************************************************ */
// 서브클래스 인스턴스를 생성할 팩터리 함수
const createBird = (bird) => {
  switch (bird.type) {
    case "EuropeanSwallow":
      return new EuropeanSwallow(bird);
    case "AfricanSwallow":
      return new AfricanSwallow(bird);
    case "NorwegianBlueParrot":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
};

/**
 * Speed 계산 로직
 * @param {*} birds
 * @returns
 */
const speed = (birds) => new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
const airSpeedVelocity = (bird) => {
  return createBird(bird).airSpeedVelocity;
};

/**
 * plumage 계산 로직
 * @param {*} birds
 * @returns
 */
const plumage = (bird) => {
  return createBird(bird).plumage;
};
const plumages = (birds) => {
  return new Map(birds.map((b) => [b.name, plumage(b)]));
};

console.log(speed(birds));
/**
         * Spped 결과
         * 
         * Map { 'EuropeanSwallow' => 35,
          'AfricanSwallow1' => 36,
          'AfricanSwallow2' => 32,
          'NorwegianBlueParrot1' => 310,
          'NorwegianBlueParrot2' => 0 }
          ​​​​​at ​​​​​​​​speed(birds)​​​
         * 
         */
console.log(plumages(birds));
/**
         * plumage 결과
         * Map { 'EuropeanSwallow' => 'average',
          'AfricanSwallow1' => 'average',
          'AfricanSwallow2' => 'tired',
          'NorwegianBlueParrot1' => 'scorched',
          'NorwegianBlueParrot2' => 'beautiful' }
          ​​​​​at ​​​​​​​​plumages(birds)
         */
