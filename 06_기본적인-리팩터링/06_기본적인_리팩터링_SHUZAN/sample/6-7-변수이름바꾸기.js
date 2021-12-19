/**
 * 예시 : 변수 바꾸기
 * - 캡슐화하기
 */
{
  let tpHd = "untitle";
  let result = `<h2>${tpHd}</h2>`;
}

{
  let _title = "";
  let result = `<h2>${title()}</h2>`;
  setTitle("article title");
  function title() {
    return _title;
  }
  function setTitle(arg) {
    _title = arg;
  }
  let result = `<h2>${tpHd}</h2>`;
}

/**
 * 예시 : 상수 이름 바꾸기
 * - 점진적으로 바꾼다.
 */
{
  const cpNm = "daji Company";
}
{
  const cpNm = "daji Company";
  const companyName = cpNm;
}
