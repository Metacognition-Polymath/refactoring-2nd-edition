/**
 * [함수 인라인]
 * - 간접 호출이 과하면 인라인 대상이 된다.
 */

//과한 간접 호출.version
{
  function getRating(driver) {
    return driver.numberOfLateDeliveries > 5;
  }

  function moreThanFiveLateDeliveries() {
    return driver.numberOfLateDeliveries > 5;
  }
}

//인라인.version
{
  function getRating(driver) {
    return driver.numberOfLateDeliveries > 5;
  }
}
