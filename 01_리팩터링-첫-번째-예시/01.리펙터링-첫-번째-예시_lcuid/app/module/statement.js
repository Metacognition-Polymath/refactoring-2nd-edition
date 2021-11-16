const {createStatement} = require("./createStatement");

function renderHtml(data) {
	let result = `<h1>청구내역 (고객명: ${data.customer}</h1>`;
	result += "<table/>";
	result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>"
	
	for (let perf of data.performances){
		result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`
		result += `<td>${krw(perf.amount)}</td></tr><br>`;
	}
	result += "</table>";
	result += `<p>총액: <em>${krw(data.totalAmount)}</em></p>`
	result += `<p>적립 포인트: <em>${data.totalVolumeCredit}</em>점</p>`
	return result;
}

function krw(aNumber) {
		return new Intl.NumberFormat('ko-KR',
			{
				style: "currency", currency: "KRW",
				minimumFractionDigits: 2
			}).format(aNumber);
	}

function htmlStatement(invoice, plays) {
	return renderHtml(createStatement(invoice, plays))
}


module.exports = {
	htmlStatement
};

