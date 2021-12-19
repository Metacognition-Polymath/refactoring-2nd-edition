const pad2digit = digit => digit.length >= 2 ? digit : `0${digit}`

//before
function a() {
  const isEnd = next > -1;
  return isEnd;
}

//after
function a() {
  return next > -1;
}