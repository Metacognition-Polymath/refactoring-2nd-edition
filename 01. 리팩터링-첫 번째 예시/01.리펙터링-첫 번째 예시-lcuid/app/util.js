const useDebugger = true;

const log = (...args) => useDebugger ? console.log(args) : null;

module.exports = {
	log
}