//리팩토링 전
{
  let points = [];
  let totalAscent = 0;

  calculateAscent();

  function calculateAscent() {
    for (let i = 1; i < points.length; i++) {
      const verticalChange = points[i].elevation - points[i - 1].elevation;
      totalAscent += verticalChange > 0 ? verticalChange : 0;
    }
  }
}

//리팩토링 후 - 갱신 사실을 밖으로 알리기
//- 변수 갱신하는 함수의 수정된 값을 반환
//-> 호출자 코드를 읽을 때 변수 갱신 될 것임을 인지하게 한다.
{
  let points = [];
  const totalAscent = calculateAscent();

  function calculateAscent() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      const verticalChange = points[i].elevation - points[i - 1].elevation;
      result += verticalChange > 0 ? verticalChange : 0;
    }
    return totalAscent;
  }
  function calculateTime() {}
  function calculateDistance() {}
}
