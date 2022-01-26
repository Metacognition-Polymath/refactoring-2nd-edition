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
	return (usage > 100 ? Math.min(usage, 200) - 100 : 0);
}
const bottomBand = usage => Math.min(usage, 100)
const middleBand = usage => (usage > 100 ? Math.min(usage, 200) - 100 : 0)
const topBand = usage => (usage > 200 ? usage - 200 : 0)
const baseCharge0 = usage => {
  if (usage < 0) return usd(0)
  const amount = bottomBand(usage) * 0.03 + withinBand(usage, 100, 200) * 0.05 + topBand(usage) * 0.07
  return usd(amount)
}