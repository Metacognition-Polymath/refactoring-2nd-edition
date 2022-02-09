//리팩토링 전
{
  function getTotalOutstandingAndSendBill() {
    const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
    sendBill();
    return result;
  }

  function sendBill() {
    emailGateway.send(formatBill(customer));
  }
}
//리팩토링 후 - 부수효과 제거
{
  function getTotalOutstandingAndSendBill() {
    const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  }

  function sendBill() {
    emailGateway.send(formatBill(customer));
  }
}
