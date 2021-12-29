{
  const trackSummary = (points: number[]): object => {
    //(내부로 함수 옮김) - 사용하는 컨텍스트 안으로
    const distance = (p1: number, p2: number): number => Math.abs(p1 - p2);
    const calculateTime = (): number => 10000;

    //(중첩 함수를 최상위로 올리기)
    //- const로 선언해서 function이 아닌 호이스팅으로 인한 메모리 참조가 불가하여, 미리 위에 선언해둠.
    //-> 최상위로 복사하면서 새로운 임시 이름 지어줌
    const calculateDistance = (points: number[]) => {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
      return result;
    };

    const totalTime: number = calculateTime(); //숫자
    const pace = totalTime / 60 / calculateDistance(points);

    return {
      time: totalTime,
      distance: calculateDistance(points),
      pace: pace,
    };
  };
  console.log(trackSummary([30, 250, 150, 550, 660]));
}


{

  


}