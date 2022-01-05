/**
 *  @param scenario{{primaryForce: number, mass: number, delay: number, secondaryForce: number }}
 *  @param time{number}
 * */
function distanceTraveled(scenario, time) {
 let result;
	// TODO:: 01 기존 acc 역활이 다른데 두번이나 연산되어있다. acc =>   primaryAcceleration
	// TODO:: 01 상수로 변경했다. 그 이후 테스트한다. 원래 중복 사용하던 변수는 선언해준다
 const primaryAcceleration = scenario.primaryForce / scenario;
 let primaryTime = Math.min(time, scenario.delay)     ;
 let secondaryTime = time - scenario.delay;
	result = 0.5 * primaryAcceleration * primaryTime; // 전파된 거리
	
	if (secondaryTime > 0){
	 let primaryVelocity = primaryAcceleration * scenario.delay;
	 let secondAcceleration = (scenario.primaryForce + scenario.secondaryForce)  / scenario.mass;   // TODO:: 01 acc 기존으로 선언한다 02. 다시 어울리는 이름으로 상세히 변경해준다(acc => second
	 result += primaryVelocity * secondaryTime + 0.5 * secondAcceleration * secondaryTime * secondaryTime;
 }
 return result;
	
}

/**
 *  javascript 는 call by value 여서 인자를 바꿔도 호출자에게 문제가없다!!
 * */


function discount(originInputValue, quantity) {  // 먼저 처음 매개변수 이름을 바꾼다
	let result = originInputValue; // 기존에 있는값을 주입하고, 다시 변경한다 inputValue => result
	if (result > 50) result = result - 2;
	if (quantity > 100) result = result -1;
	return result;
}
