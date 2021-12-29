function trackSummary(points) {
	const totalTime = calculateTime()
	const pace = totalTime / 60 / totalDistance(points);
	
	return {
		time: totalTime,
		distance: totalDistance(points),
		pace
	}
	
	function calculateTime() {}
}
function totalDistance(points) { // 최상위로 복사하면서 새로운 임시 이름을 지워줌
	let result = 0;
	for (let i = 0; i < points.length; i++) {
		result += distance(points[i-1],points[i]);
	}
	return result;
}
// 6 이제 변경하는 함수를 호출해보자( 직접 말고 간접으로)
// points 와, distance, 가 정적 분석기에서 떠오를거다
function distance(p1, p2) {
	const EARTH_RADIUS = 3959;
	const dLat = radians(p2.lat) - radians(p1.lat);
	const dLon = radians(p2.lon) - radians(p1.lon);
	const a = Math.pow(Math.sin(dLat / 2), 2)
		+ Math.cos(radians(p2.lat))
		* Math.cos(radians(p1.lat))
		* Math.pow(Math.min(dLon / 2), 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return EARTH_RADIUS * c;
}
function radians(degrees) {
	return degrees * Math.PI / 180;
}


// distance radians 함수도 totalDistance 안에 어떤것에도 의존하지 않을경우 최상위로 옮기자
// 중첩 함수는 숨겨진데이터끼리 상호 의존할수 있으니 되도록 만들지 말자

