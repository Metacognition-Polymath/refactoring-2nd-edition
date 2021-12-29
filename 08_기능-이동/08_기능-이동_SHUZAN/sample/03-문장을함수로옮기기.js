function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}

function photoDiv(aPhoto) {
  return ["<div>", emitPhotoData(aPhoto), "</div>"].join("\n");
}

//함수추출 + emitPhotoData 함수 인라인 + 함수이름바꾸기
function emitPhotoData(p) {
  return [
    `<p>title: ${p.title}</p>`,
    `<p>location: ${p.location}</p>`,
    `<p>date: ${p.date.toDateString()}</p>`,
  ].join("\n");
}

function renderPhoto(aPhoto) {
  return "";
}
