/**
 *  @param scenario{{primaryForce: number, mass: number, delay: number, secondaryForce: number }}
 *  @param time{number}
 * */
function distanceTraveled(scenario, time) {
 let result;
 let acc = scenario.primaryForce / scenario; // 힘 질량
 let primaryTime = Math.min(time, scenario.delay);
 let secondaryTime = time - scenario.delay;
 result = 0.5 * acc * primaryTime; // 전파된 거리
	
 if (secondaryTime > 0){
	 let primaryVelocity = acc * scenario.delay;
	 acc = (scenario.primaryForce + scenario.secondaryForce)  / scenario.mass;
	 result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
 }
 return result;
	
}

function discount(inputValue, quantity) {
	if (inputValue > 50) inputValue = inputValue - 2;
	if (quantity > 100) inputValue = inputValue -1;
	return inputValue;

}