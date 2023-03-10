const checkRole = (role) => (req, res, next) => {
	if (req.user.role !== role) {
		return res.status(401).send({"error" :"Unauthorized"});
	}
	next();
};

module.exports = checkRole;