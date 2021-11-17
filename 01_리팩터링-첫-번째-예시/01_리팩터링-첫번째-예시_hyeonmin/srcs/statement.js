import fs from 'fs';
import createStatementData from './createStatementData.js';

const plays = JSON.parse(fs.readFileSync('../data/plays.json'));
const invoice = JSON.parse(fs.readFileSync('../data/invoices.json'));

// 메인 함수
function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}

// 텍스트 렌더링 함수
function renderPlainText(data, plays) {
	let result = `청구 내역 (고객명: ${data.customer})\n`;
	for (let perf of data.performances) {
		result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
	}
	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
	return result;
}

function htmlStatement(invoice, plays) {
	return renderHtml(createStatementDate(invoice, plays));
}

function renderHtml(data) {
	let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
	result += "<table>\n";
	result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
	for (let perf of data.performances) {
		result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
		result += `<td>${usd(perf.amount)}</td></tr>\n`;
	}
	result += "</table>\n";
	result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
	result += `<p>적립 포인트: <em>${usd(data.totalVolumeCredits)}</em>점</p>\n`;
	return result;
}

function usd(aNumber) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}

console.log(statement(invoice, plays));