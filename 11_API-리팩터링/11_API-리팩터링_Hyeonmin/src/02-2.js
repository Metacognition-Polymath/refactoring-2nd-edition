/*
- 대역(band)을 다루는 세 함수의 로직이 상당히 비슷하므로, 매개변수화 함수로 통합
- 통합 시에는, 먼저 대상 함수 중 하나를 골라 매개변수를 추가. (다른 함수들까지 고려)
*/

const usd = aNumber =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)

const withinBand = (usage, bottom, top) => {
	return (usage > bottom ? Math.min(usage, top) - bottom : 0);
}
const baseCharge = usage => {
  if (usage < 0) return usd(0)
  const amount =
	withinBand(usage, 0, 100) * 0.03
	+ withinBand(usage, 100, 200) * 0.05
	+ withinBand(usage, 200, Infinity) * 0.07
  return usd(amount)
}