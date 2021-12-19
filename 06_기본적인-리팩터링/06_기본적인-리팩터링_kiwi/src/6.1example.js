//before
function printOwing(invoice) {
	let outstanding = 0;

  console.log("***************");
  console.log("*** 고객 채무 ***");
  console.log("***************");

  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);

	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}


//after
function printOwing(invoice) {
	let outstanding = 0;

  printBanner();
  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);
	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
  printDetails();

  function printBanner(){
      console.log("***************");
      console.log("*** 고객 채무 ***");
      console.log("***************");
  }
  function printDetails(){
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}