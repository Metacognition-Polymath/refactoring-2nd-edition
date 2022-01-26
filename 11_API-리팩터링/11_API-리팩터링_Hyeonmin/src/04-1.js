/*
- 실내온도 모니터링 시스템: 일일 최저, 최고 기온이 난방 계획에서 정한 범위를 벗어나는지 확인
- 최저, 최고 기온을 뽑아내어 인수를 건네는 대신 범위 객체를 통째로 건넬 수도 있다.
 */
class TemperatureRange {
	high;
	low;
	constructor(low, high) {
		this.high = high;
		this.low = low;
	}
}
class Room {
	daysTempRange;
	constructor(min, max) {
		this.daysTempRange = new TemperatureRange(min, max);
	}
}
const room = new Room(22, 24);

class HeatingPlan {
	_temperatureRange;
	constructor(low, high) {
		this._temperatureRange = new TemperatureRange(low, high);
	}
	withinRange(aNumberRange) {
		return (
			(aNumberRange.low >= this._temperatureRange.low) &&
			(aNumberRange.high <= this._temperatureRange.high)
		);
	}
}

const client = () => {
	const plan = new HeatingPlan(21, 25);
	if (!plan.withinRange(room.daysTempRange)) {
		console.log("방 온도가 지정 범위를 벗어났습니다.");
	} else {
		console.log("적정 온도입니다.");
	}
};
client();
