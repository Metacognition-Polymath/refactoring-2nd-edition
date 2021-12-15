const printOwing = (invoice) => {
	// 배너출력
	printBanner();

	// 미해결 채무 계산
	const outstanding = calculateOutstanding(invoice)
	// 마감일 기록
	recordDueDate(invoice);
	// 세부 사항 출력
	printDetails(invoice, outstanding);
};

function accumulateValues(values) {
	return values.reduce((total, value) => total + value, 0);
}

function calculateOutstanding(invoice) {
	return accumulateValues(invoice.orders.map(order => order.amount));
}

function recordDueDate(invoice) {
	const today = new Date();
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 30
	);
}

function printBanner() {
	console.log("******************");
	console.log("**** 고객채무 ****");
	console.log("******************");
}

function printDetails(invoice, outstanding) {
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
	console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`);
}

printOwing({
	customer: "hyeonmin",
	orders: [
		{ name: "사채", amount: 100 },
		{ name: "대출", amount: 1000 },
	],
});