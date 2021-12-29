const states = ['a', 'b', 'MA']

let appliesToMass = false;

for (const s of states) {
  if (s === 'MA') {
    appliesToMass = true;
  }
}
module.exports = appliesToMass