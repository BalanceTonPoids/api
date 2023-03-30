const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject,
			html: html,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error)
				return console.log(error);
			return res.status(200).json({
				success: true,
				message: "Email sent",
			});
		});
	} catch (error) {
		return error;
	}
};

module.exports = sendEmail;
