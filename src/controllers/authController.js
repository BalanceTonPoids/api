const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const uid = require("../utils/uid");

class AuthController {
	async register(req, res) {
		const { email } = req.body;
		try {
			const isTaken = await User.isEmailTaken(email);
			if (isTaken) {
				return res.status(400).send({"error":"Email already taken"});
			}
			const user = new User(req.body);
			await user.save();
			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
			res.header("auth-token", token).send({ token });
		} catch (error) {
			res.status(400).send({"error": error});
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		if (!(email, password)) return res.status(400).send({"error": "Email and password required"});
		try {
			const user = await User.findOne({ email }).select("+password");
			if (!user) return res.status(400).send({"error": "Email not found"});
			const isMatch = await user.isPasswordMatch(password);
			if (!isMatch) return res.status(400).send({"error": "Invalid password"});
			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
			res.header("auth-token", token).send({ token });
		} catch (error) {
			res.status(500).send({"error": error});
		}
	}

	async forgotPassword(req, res) {
		const { email } = req.body;
		console.log(email);
		try {
			const user = await User.findOne({ email });
			if (!user) return res.status(400).send({"error": "Email not found"});
			const token = await Token.findOne({ userId: user._id });
			if (token) await token.deleteOne();
			// generate token
			const resetToken = uid();
			const newToken = new Token({
				userId: user._id,
				token: resetToken,
			});
			await newToken.save();
			// send email with token
			console.info({ token: newToken, id: user._id });
			const link = `http://localhost:3000/v1/auth/resetPassword?token=${resetToken}&id=${user._id}`;
			const html = `
				<h1>Réinitialisé le mots de passe</h1>
				<p>Veuillez cliquez sur le liens ci dessous pour réinitialisé votre mots de passe</p>
				<a href="${link}">${link}</a>
			`;

			await sendEmail(email, "Réinitialisé le mots de passe", html);
			console.info(link);
			res.status(200).send({"message": "Password reset link sent to email"});
		} catch (error) {
			res.status(400).send({"error": error});
		}
	}

	async resetPassword(req, res) {
		const { id, token, password } = req.body;
		if (!(id, token, password)) return res.status(400).send({"error": "All fields are required"});
		try {
			const user = await User.findOne({ _id: id });
			if (!user) return res.status(400).send({"error": "User not found"});
			const exitToken = await Token.findOne({ userId: user._id });
			if (!exitToken) return res.status(400).send({"error": "Invalid token"});
			const isMatch = await exitToken.compareToken(token);
			if (!isMatch) return res.status(400).send({"error": "Invalid token"});
			user.password = password;
			await user.save();
			res.send({"message": "Password reset successfully"});
		} catch (error) {
			res.status(400).send({"error": error});
		}
	}
}

module.exports = new AuthController();
