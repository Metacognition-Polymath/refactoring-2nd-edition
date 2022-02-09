//리팩토링 전
{
  const low = aRoom.daysTempRange.low;
  const high = aRoom.daysTempRange.high;
  if (aPlan.withinRange(low, high)) {
    console.log("with in range 👍");
  }
}
//리팩토링 후 - 객체 통째로 넘김
{
  if (aPlan.withinRange(aRoom.daysTempRange)) {
    console.log("with in range 👍");
  }
}
