module.exports = function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      time: totalTime,
      distance: totalDistance,
      pace: pace,
    };
  
    // 총 거리 계산
    function calculateDistance() {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
  
      return result;
    }
  
    // 두 지점의 거리 계산
    function distance(p1, p2) {
      const EARTH_RADIUS = 3959; // mile
      const dLat = radians(p2.lat) - radians(p1.lat);
      const dLon = radians(p2.lon) - radians(p1.lon);
      const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(radians(p2.lat)) *
          Math.cos(radians(p1.lat)) *
          Math.pow(Math.sin(dLon / 2), 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return EARTH_RADIUS * c;
  }
  
    // 라디안 값으로 변환
    function radians(degrees) {
      return (degrees * Math.PI) / 180;
  }
  
    // 총 시간 계산
    function calculateTime(params) {}
}
