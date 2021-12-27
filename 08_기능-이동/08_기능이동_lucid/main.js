
// 함수에서 중청함수 calculateDistance()를 최상위로 옮겨서 추적 거리를 다른 정보화 독립적을고 계산하고 싶다

// 3. 가장 먼저 할 을 이 함수로 최상위로 복사한다는것이다

function trackSummary(points) {
	const totalTime = calculateTime()
	const totalDistance = calculateDistance(points);
	const pace = totalTime / 60 / totalDistance;
	
	return {
		time: totalTime,
		distance: totalDistance,
		pace
	}
	
	function calculateTime() {}
	function calculateDistance() {
		return top_calculateDistance(points);
	}
}

function top_calculateDistance(points) { // 최상위로 복사하면서 새로운 임시 이름을 지워줌
	let result = 0;
	for (let i = 0; i < points.length; i++) {
		result += distance(points[i-1],points[i]);
	}
	return result;

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
}
// 6 이제 변경하는 함수를 호출해보자( 직접 말고 간접으로)