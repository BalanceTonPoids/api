const jwt = require("jsonwebtoken");
const User = require("../models/user");

class AuthController {
	async register(req, res) {
		const { email } = req.body;
		try {
			if (await User.isEmailTaken(email)) {
				return res.status(400).send("Email already taken");
			}
			const user = new User(req.body);
			await user.save();
			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
			res.header("auth-token", token).send({ token });
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		if (!(email, password)) return res.status(400).send("Email and password required");
		try {
			const user = await User.findOne({ email }).select("+password");
			console.log("user ", user);
			if (!user) return res.status(400).send("Email not found");
			const isMatch = await user.isPasswordMatch(password);
			if (!isMatch) return res.status(400).send("Invalid password");
			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
			console.log("token ", token);
			res.header("auth-token", token).send({ token });
		} catch (error) {
			res.status(500).send(error);
		}
	}
}

module.exports = new AuthController();
