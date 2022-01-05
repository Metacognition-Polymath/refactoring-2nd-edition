const distanceTravelled = (scenario, time) => {
  let result
  let acc = scenario.primaryForce / scenario.mass // (a = F / m)
  let primaryTime = Math.min(time, scenario.delay)
  result = 0.5 * acc * primaryTime ** 2
  let secondaryTime = time - scenario.delay
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay
		// ! acc 변수에 값이 두 번 대입된다. => 역할이 두 개라는 신호
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass
    result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime ** 2
  }
  return result
}