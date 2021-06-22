const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const chalk = require('chalk');

module.exports.createAccessToken = user => {
	const data = {
		id: user._id,
		email: user.email,
		firstName: user.firstName,
		fullName: user.fullName,
		username: user.username,
		isAdmin: user.isAdmin,
	};

	return jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_TOKEN_EXPIRE,
	});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (token) {
		token = token.slice(7, token.length);

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res
					.status(401)
					.send({ auth: 'Invalid verification of token and secret.' });
			} else {
				req.user = decoded;
				next();
			}
		});
	} else {
		return res
			.status(401)
			.send({ auth: 'Only logged in users can access this route.' });
	}
};

module.exports.verifyAdmin = (req, res, next) => {
	if (req.user.isAdmin) {
		next();
	} else {
		res.status(401).send({ auth: 'Only admin users can access this route.' });
	}
};

module.exports.sendEmail = async (req, res, next) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const { email } = req.body;

	let mailOptions = {
		from: process.env.EMAIL_ADDRESS,
		to: email,
		subject: 'Hello G, from V.',
		text: 'It works.',
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log('Error: ', chalk.bold.red(err.message));
		} else {
			console.log(chalk.bold.green('Email sent!'));
		}
	});

	next();
};
