type Point = {
  elevation: number;
};

type Points = Point[];
// const points = [{ elevation: 5 }, { elevation: 4 }, { elevation: 2 }];
const points = [
  { elevation: 1 },
  { elevation: 2 },
  { elevation: 5 },
  { elevation: 12 },
];
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

const totalAscent1 = points.reduce((accumulatedPoint, currentPoint, index) => {
  console.log("accumulatedPoint before", accumulatedPoint);
  console.log("currentPoint", currentPoint);
  const verticalChange = currentPoint.elevation - accumulatedPoint.elevation;
  accumulatedPoint.elevation = verticalChange > 0 ? verticalChange : 0;
  console.log("accumulatedPoint after", accumulatedPoint);
  return currentPoint;
}).elevation;

console.log("totalAscent1", totalAscent1);
// reduce 결론 : index가 0부터가 아닌 previous가 있는 1부터 시작한다.
// parameter의 첫 번째 인자는 전에 return한 것이다.
// reduce로 구하는 방법은 잘 모르겠다 그냥 이렇게 복잡한 것은 for문이 짱이다.
