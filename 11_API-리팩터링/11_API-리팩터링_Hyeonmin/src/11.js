/*
- GPS 위치 목록으로 다양한 계산을 수행하는 코드
- 이번 리팩터링에선 고도 상승분(Ascent) 계산만을 고려한다.

1. 먼저 totalAscent 값을 반환하고, 호출한 곳에서 변수에 대입하게 고친다.
2. 계산을 수행하는 함수의 반환 값을 수정하고, 반환 값을 담을 지역변수를 선언
3. 이 계산이 변수 선언과 동시에 수행되도록 하고, const를 붙여 불변으로 만든다.
*/

const calculateAscent = () => {
	let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation
    result += verticalChange > 0 ? verticalChange : 0
  }
	return result;
}
const calculateTime = () => {}
const calculateDistance = () => {}

let points = []
let totalTime = 0
let totalDistance = 0
const totalAscent = calculateAscent();
calculateTime()
calculateDistance()
const pace = totalTime / 60 / totalDistance