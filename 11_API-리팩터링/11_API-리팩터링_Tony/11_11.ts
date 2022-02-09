type Point = {
  elevation: number;
};

type Points = Point[];
// const points = [{ elevation: 5 }, { elevation: 4 }, { elevation: 2 }];
const points = [{ elevation: 1 }, { elevation: 2 }, { elevation: 5 }];
const totalAscent = calculateAscent(points);

function calculateAscent(points: Point[]) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += verticalChange > 0 ? verticalChange : 0;
  }
  return result;
}

console.log("totalAscent", totalAscent);

const totalAscent1 = points.reduce((accumulatedPoint, currentPoint) => {
  const verticalChange = accumulatedPoint.elevation - currentPoint.elevation;
  accumulatedPoint.elevation = verticalChange > 0 ? verticalChange : 0;
  return accumulatedPoint;
}).elevation;

console.log("totalAscent1", totalAscent1); // 값이 틀린데 나중에 원인 파악 해보기
