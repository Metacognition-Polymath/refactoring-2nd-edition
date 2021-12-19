const pad2digit = digit => digit.length >= 2 ? digit : `0${digit}`

//before
const timerFormat = value => `${pad2digit(`${parseInt(value / 60)}`)}:${pad2digit(`${value % 60}`)}`


//after
const timerFormat = value => {
  const _minutes = parseInt(value / 60)
  const minutes = pad2digit(`${_minutes}`)
  const seconds = pad2digit(`${value % 60}`)

  return `${minutes}:${seconds}`
}