function renderPerson(outStream, person) {
	const result = [];
	result.push(`<p>${person.name}</p>`);
	result.push(renderPhoto(person.photo))
	result.push(emitPhotoData(person.photo))
	return result.join('\n');
}

function photoDiv(p) {
	return [
		"div",
		`<p>제목: ${p.title}</p>`,
		emitPhotoData(p),
		"div",
	].join("\n")
}

// 두번이나 emitPhotoData 를 호출하며, 두 곳 모두 바로 앞에는 제목 출력코드를 나온다. 중복을 없애자.
// 가장 먼저 호출자 중 하나에 함수 추출하기를 적용하자

// emitPhotoData 함수를 합친후 이름을 변경한다
function emitPhotoData(p) {
	return [
		`<p>제목: ${p.title}</p>`,
		`<p>위치: ${p.location}</p>`,
		`<p>날짜: ${p.date.toDateString()}</p>`,
	].join("\n")
}

// result.push(`<p>제목: ${person.photo.title}</p>`); // 제목 출력
// result.push(emitPhotoData(person.photo));
// TODO:: title 부분이 겹친다