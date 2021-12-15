// const printOwing = (invoice) => {
// 	let outstanding = 0;
// 	// 배너출력
// 	console.log("******************");
// 	console.log("**** 고객채무 ****");
// 	console.log("******************");
// 	// 미해결 채무 계산
// 	for (const o of invoice.orders) {
// 		outstanding += o.amount;
// 	}
// 	// 마감일 기록
// 	const today = new Date();
// 	invoice.dueDate = new Date(
// 		today.getFullYear(),
// 		today.getMonth(),
// 		today.getDate() + 30
// 	);
// 	// 세부 사항 출력
// 	console.log(`고객명: ${invoice.customer}`);
// 	console.log(`채무액: ${outstanding}`);
// 	console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`);
// };

// printOwing({
// 	customer: "hyeonmin",
// 	orders: [
// 		{ name: "사채", amount: 100 },
// 		{ name: "대출", amount: 1000 },
// 	],
// });

// -------------------------------------

const printOwing = (invoice) => {
	let outstanding = 0;
	// 배너출력
	printBanner();

	// 미해결 채무 계산
	outstanding = invoice.orders.reduce((total, order) => total + order.amount, 0)
	// 마감일 기록
	const today = new Date();
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 30
	);
	// 세부 사항 출력
	printDetails();

	function printBanner() {
		console.log("******************");
		console.log("**** 고객채무 ****");
		console.log("******************");
	}

	function printDetails() {
		console.log(`고객명: ${invoice.customer}`);
		console.log(`채무액: ${outstanding}`);
		console.log(`마감일: ${invoice.dueDate?.toLocaleString()}`);
	}
};

printOwing({
	customer: "hyeonmin",
	orders: [
		{ name: "사채", amount: 100 },
		{ name: "대출", amount: 1000 },
	],
});
