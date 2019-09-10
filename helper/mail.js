// eslint-disable-next-line no-unused-vars
const nodemailer = require("nodemailer");
async function sendResetMail(sendTo, token) {
	// Disabled as it is still on dev.
	/*
	let testAccount = await nodemailer.createTestAccount();
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: "587",
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	});

	let info = await transporter.sendMail({
		from: "passwordreset@yelpcamp.com",
		to: sendTo,
		subject: "Reset Password",
		text: "http://localhost:3000/reset/" + token
	});
	*/

	console.log("http://localhost:3000/reset/" + token);
}

module.exports = sendResetMail;