
/**
 *  지연 변수의 값을 변경할때
 *  지역 변수에 값을 대입할시 문제가 복잡해짐,
 *
 * */

function printOwing3(invoice: any) {
  printBanner();


  const outstanding = calcOutstanding(invoice);
  recordDate(invoice);
  printDetail(invoice, outstanding);

  function printBanner(){
    console.log('************')
    console.log('*** 고객 채무 ****')
    console.log('************')
  }

  function calcOutstanding(invoice: any){
    // 미해결 채무(outstanding) 계산한다
    let result = 0; // 맨 위에 있던 선언문을 이 위치로 이동(먼저 선언되는 변수가 사용되는 코드 근처로 슬라이드한다)
    for (const o of invoice.orders){
      result += o.amount;
    }
    return result
  }

}

function printDetail(invoice: any, outstanding: number){
  // 세부 사항을 출력한다
  console.log(`고객명: ${invoice.customer}`)
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invoice.dueDate.toLocaleString()}`)

}

function recordDate(invoice: any){
  // 마감일(dueDate)를 기록한다
  const today = Clock.toDay();
  invoice.newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}
