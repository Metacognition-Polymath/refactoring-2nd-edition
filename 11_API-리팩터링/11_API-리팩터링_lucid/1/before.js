function setOffAlarms() {
	
}

function alertForMicsreant(peoples) {
	for (const people of peoples) {
		if (people === '조커'){
			setOffAlarms();
			return '조커'
		}
		if (people === '사루만'){
			setOffAlarms();
			return '사루만';
		}
	}
	return  ''
	
}