const data = "data";

function test() {
  if (data) {
    return data;
  } else {
    // throw new OrderProcessingError(-23);
    throw new Error("-23");
  }
}
