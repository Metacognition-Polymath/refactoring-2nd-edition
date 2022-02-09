/*
- 실내온도 제어 시스템: 사용자는 온도조절기로 온도 설정 가능, 목표 온도는 난방 계획에서 정한 범위에서만 선택.
- targetTemperature() 메서드가 전역 객체인 thermostat에 의존하는 것이 신경쓰임
- 그러니, 이 전역 객체에 건네는 질의 메서드를 매개변수로 옮겨서 의존성을 끊어보자.
-
*/

const thermostat = {
	selectedTemperature: 25,
	currentTemperature: 27,
};

class HeatingPlan {
	#max;
	#min;
	get targetTemperature() {
		return this.targetTemperature(thermostat.selectedTemperature);
	}

	targetTemperature(selectedTemperature) {
		if (selectedTemperature > this.#max) return this.#max;
		else if (selectedTemperature < this.#min) return this.#min;
		else return selectedTemperature;
	}
}

const temperatureController = () => {
	const setToHeat = () => {};
	const setToCool = () => {};
	const setOff = () => {};

	const heatingPlan = new HeatingPlan();
	if (heatingPlan.targetTemperature > thermostat.currentTemperature)
		setToHeat();
	else if (heatingPlan.targetTemperature < thermostat.currentTemperature)
		setToCool();
	else setOff();
};
