const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const uid = require("../utils/uid");

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
			if (!user) return res.status(400).send("Email not found");
			const isMatch = await user.isPasswordMatch(password);
			if (!isMatch) return res.status(400).send("Invalid password");
			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
			res.header("auth-token", token).send({ token });
		} catch (error) {
			res.status(500).send(error);
		}
	}

	async forgotPassword(req, res) {
		const { email } = req.body;
		console.log(email);
		try {
			const user = await User.findOne({ email });
			if (!user) return res.status(400).send("Email not found");
			const token = await Token.findOne({ userId: user._id });
			if (token) await token.deleteOne();
			// generate token
			const resetToken = uid();
			const newToken = new Token({
				userId: user._id,
				token: resetToken
			});
			await newToken.save();
			// send email with token
			console.info({token: newToken, id: user._id});
			const link = `http://localhost:3000/v1/auth/resetPassword?token=${resetToken}&id=${user._id}`;
			console.info(link);
			res.status(200).send("Password reset link sent to email");
		} catch (error){
			res.status(400).send(error);
		}
	}

	async resetPassword(req, res) {
		const { id, token, password } = req.body;
		if(!(id, token, password)) return res.status(400).send("All fields are required");
		try {
			const user = await User.findOne({ _id: id });
			if (!user) return res.status(400).send("User not found");
			const exitToken = await Token.findOne({ userId: user._id });
			if (!exitToken) return res.status(400).send("Invalid token");
			const isMatch = await exitToken.compareToken(token);
			if (!isMatch) return res.status(400).send("Invalid token");
			user.password = password;
			await user.save();
			res.send("Password reset successfully");
		} catch (error) {
			res.status(400).send(error);
		}
	}
}

module.exports = new AuthController();
