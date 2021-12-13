// 예시: 유효범위를 벗어나는 변수가 없을때
function printOwing(invoice: any) {
  let outstanding = 0;
  printBanner();

  // 미해결 채무(outstanding) 계산한다
  for (const o of invoice.orders){
    outstanding += o.amount;
  }

  // 마감일(dueDate)를 기록한다
  const today = Clock.toDay();
  invoice.newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  printDetail();

  function printBanner(){
    console.log('************')
    console.log('*** 고객 채무 ****')
    console.log('************')
  }
  function printDetail(){
    // 세부 사항을 출력한다
    console.log(`고객명: ${invoice.customer}`)
    console.log(`채무액: ${outstanding}`)
    console.log(`마감일: ${invoice.dueDate.toLocaleString()}`)
  }
}

class Clock {

  constructor() {

  }
  static toDay(){
    return new Date()
  }

}