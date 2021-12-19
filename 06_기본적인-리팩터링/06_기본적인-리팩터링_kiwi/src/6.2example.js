//before
function getRaintg(driver) {
  return moreThanFiveLateDeilveries(driver) ? 2: 1;
}
function moreThanFiveLateDeilveries(dvr) {
  return dvr.numberOFLateDeliveries > 5;
}


//after
function getRaintg(driver) {
  return driver.numberOFLateDeliveries > 5 ? 2: 1;
}