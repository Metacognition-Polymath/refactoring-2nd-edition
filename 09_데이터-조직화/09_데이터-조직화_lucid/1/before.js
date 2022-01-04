/**
 *  @param scenario{{primaryForce: number, mass: number, delay: number, secondaryForce: number }}
 *  @param time{number}
 * */
function distanceTraveled(scenario, time) {
 let result;
 let acc = scenario.primaryForce / scenario; // 힘 질량
 let primaryTime = Math.min(time, scenario.delay)     ;
 let secondaryTime = time - scenario.delay;
 if (secondaryTime > 0){
	 let primaryVelocity = acc * scenario.delay;
	 acc = (scenario.primaryForce + scenario.secondaryForce)  / scenario.mass;
	 result += primaryTime * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
 }
 return result;
	
}
