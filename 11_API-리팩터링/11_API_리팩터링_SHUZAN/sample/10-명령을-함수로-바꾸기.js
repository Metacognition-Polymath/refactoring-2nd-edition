const charge = (customer, usage, provider) => {
  const baseCharge = customer * usage; //생성자와 메서드 호출 인라인
  return baseCharge + provider;
};

//호출자
const monthCharge = charge(customer, usage, provider).charge;
