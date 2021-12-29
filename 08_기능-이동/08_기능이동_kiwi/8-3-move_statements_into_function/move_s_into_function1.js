module.exports = function renderPerson(outStream, person) {
    const result = [];
  
    result.push(`<p>${person.name}</p>`);
    result.push(`<p>제목: ${person.photo.title}</p>`);//.  <- 제목 출력
    result.push(emitPhotoData(person.photo));
  
    return result.join('\n');
}
  
function photoDiv(p) {
    return ['<div>', `<p>제목: ${p.title}</p>`, emitPhotoData(p), '</div>'].join(
        '\n',
    );
}

function emitPhotoData(aPhoto) {
    const result = [];

    result.push(`<p>위치: ${aPhoto.location}</p>`);
    result.push(`<p>날짜: ${aPhoto.date}</p>`);

    return result.join('\n');
}

const person = {
    name: "case1",
    photo : {
        title: "title",
        location : "seoul",
        date: "2021-12-29"
    }
}

