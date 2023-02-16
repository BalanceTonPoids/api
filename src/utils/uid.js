/**
 * this function generate a unique id based on the current time and a random number
 * @returns {string} - A unique id
 */
const uid = () => {
	const head = Date.now().toString(36);
	const tail = Math.random().toString(36).substring(2);
	return head + tail;
};

module.exports = uid;
