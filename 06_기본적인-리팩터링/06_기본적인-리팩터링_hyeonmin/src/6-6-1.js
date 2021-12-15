let defaultOwner = { firstName: '마틴', lastName: '파울러' }

const spaceship = {
  owner: defaultOwner,
}

const getDefaultOwner = () => defaultOwner
const setDefaultOwner = arg => {
  defaultOwner = arg
}

spaceship.owner = getDefaultOwner();
setDefaultOwner({ firstName: '레베카', lastName: '파슨스' });

console.log(spaceship.owner);
console.log(defaultOwner);