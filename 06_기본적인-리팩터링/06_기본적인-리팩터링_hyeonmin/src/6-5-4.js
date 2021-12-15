const inNewEngland = aCustomer => {
  return xxNEWinNewEngland(aCustomer.address.state);
}

function inNewEngland(stateCode) {
	return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));