const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const uid = require("../utils/uid");
const sendEmail = require("../utils/sendEmail");

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
			const userClient = process.env.CLIENT_URL;
			const port = process.env.PORT;
			const version = process.env.VERSION;
			// send email with token
			const link = `${userClient}${port}/v${version}/auth/resetPassword?token=${resetToken}&id=${user._id}`;
			const html = `
			<html>
			<head>
			  <style>
				/* Add some basic styles to the email */
				body {
				  font-family: Arial, sans-serif;
				  color: #333;
				  background-color: #f8f8f8;
				}
				h1 {
				  color: #0080ff;
				}
				p {
				  margin: 10px 0;
				}
				a{
					color: #0080ff;
					font-weight: bold;
				}
			  </style>
			</head>
			<body>
				<h1>Réinitialisé le mots de passe</h1>
				<p>Veuillez cliquez sur le liens ci dessous pour réinitialisé votre mots de passe</p>
				<a href="${link}">Cliquer ici </a>
				</body>
		  </html>
			`;
			await sendEmail(email, "Réinitialisé le mots de passe", html);
			res.status(200).send({"message": "Password reset link sent to email"});
		} catch (error) {
			res.status(400).send({"error": error});
		}
	}

	async resetPassword(req, res) {
		const id = req.query.id;
		const token = req.query.token;
		if (!(id, token)) return res.status(400).send({"error": "All fields are required"});
		try {
			const user = await User.findOne({ _id: id });
			if (!user) return res.status(400).send({"error": "User not found"});
			const exitToken = await Token.findOne({ userId: user._id });
			if (!exitToken) return res.status(400).send({"error": "Invalid token"});
			const isMatch = await exitToken.compareToken(token);
			if (!isMatch) return res.status(400).send({"error": "Invalid token"});
			// TODO might change later
			const password = 'qwerty1234';
			user.password = password;
			await user.save();

			// send email with new password
			const html = `
			<html>
			<head>
			  <style>
				/* Add some basic styles to the email */
				body {
				  font-family: Arial, sans-serif;
				  color: #333;
				  background-color: #f8f8f8;
				}
				h1 {
				  color: #0080ff;
				}
				p {
				  margin: 10px 0;
				}
			  </style>
			</head>
			<body>
			  <h1>Nouveau mot de passe</h1>
			  <p>Bonjour,</p>
			  <p>Vous avez demandé à réinitialiser votre mot de passe. Votre nouveau mot de passe est :</p>
			  <p><strong>${password}</strong></p>
			  <p>Nous vous conseillons de changer ce mot de passe dès que possible en vous connectant à l'application et en modifiant votre profil.</p>
			  <p>Cordialement,<br />L'équipe de Balance ton poids</p>
			</body>
		  </html>
			`;
			await sendEmail(user.email, "Mots de passe temporaire", html);
			res.status(200).send({"message": "Password reset successfully"});
		} catch (error) {
			res.status(400).send({"error": error.message});
		}
	}
}

module.exports = new AuthController();
