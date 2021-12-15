//인라인 Before
{
  let basePrice = anOrder.basePrice;
  return basePrice > 1000;
}
//인라인 After
{
  return basePrice > 1000;
}
