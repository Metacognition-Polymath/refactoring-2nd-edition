const discount = (inputValue, quantity) => {
	let result = inputValue;
  if (inputValue > 50) result = result - 2
  if (quantity > 100) result = result - 1
  return result
}