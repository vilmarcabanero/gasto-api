const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../middlewares/auth.js');
// import sendEmail from '../utils/sendEmail.js';
// import crypto from 'crypto';

module.exports.register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, confirmPassword } = req.body;
		const [username] = email.split('@');

		const user = await User.findOne({ email: email });

		if (user) {
			return res.send({
				success: false,
				message: `${email} is already registered.`,
			});
		}

		if (password !== confirmPassword) {
			return res.send({
				success: false,
				message: `Passwords do not match.`,
			});
		}

		const hashedPw = bcrypt.hashSync(password, 10);

		const newUser = new User({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: hashedPw,
		});

		const _newUser = {
			name: newUser.fullName,
			username: username,
			email: email,
		};

		await newUser.save();

		const token = createAccessToken(newUser);

		return res.send({
			success: true,
			message: 'User created successfully.',
			token: token,
			user: _newUser,
		});
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

module.exports.login = async (req, res) => {
	try {
		let userByEmail = { email: req.body.email };

		const user = await User.findOne(userByEmail);

		if (!user) {
			return res.send({
				success: false,
				message: `${userByEmail.email} is not yet registered.`,
			});
		}

		const isPasswordCorrect = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (isPasswordCorrect) {
			const token = createAccessToken(user);

			return res.send({
				success: true,
				token: token,
				message: `${user.fullName} was logged in successfully.`,
			});
		} else {
			return res.send({ success: false, message: 'Invalid password' });
		}
	} catch (err) {
		console.log(err);
		res.status(401).send(err.message);
	}
};

// export const setAdmin = (req, res) => {
// 	try {
// 		User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true })
// 			.then(user => {
// 				return res.send({
// 					message: `${user.fullName} was successfully set as admin.`,
// 				});
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const updateUserInfo = async (req, res) => {
// 	try {
// 		const foundUser = await User.findOne({ _id: req.user.id });

// 		const { firstName, lastName, mobileNo } = req.body;

// 		const updatedUserInfo = {
// 			firstName: firstName ? firstName : foundUser.firstName,
// 			lastName: lastName ? lastName : foundUser.lastName,
// 			mobileNo: mobileNo ? mobileNo : foundUser.mobileNo,
// 		};

// 		const updates = {
// 			previous: {
// 				firstName: foundUser.firstName,
// 				lastName: foundUser.lastName,
// 				mobileNo: foundUser.mobileNo,
// 			},
// 			current: {
// 				firstName: firstName ? firstName : foundUser.firstName,
// 				lastName: lastName ? lastName : foundUser.lastName,
// 				mobileNo: mobileNo ? mobileNo : foundUser.mobileNo,
// 			},
// 		};

// 		User.findByIdAndUpdate(req.user.id, updatedUserInfo, { new: true })
// 			.then(() => {
// 				return res.send({
// 					message: 'Your info was updated successfully.',
// 					updates: updates,
// 				});
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const forgotPassword = async (req, res) => {
// 	const { email } = req.body;

// 	try {
// 		const user = await User.findOne({ email });

// 		if (!user) {
// 			return res.status(400).send({
// 				message: `${email} is not yet registered.`,
// 			});
// 		}

// 		const resetToken = user.getResetPasswordToken();

// 		await user.save();

// 		// const message = `Hello ${user.firstName}, please use the above reset token to reset your password.`;

// 		const message = `
// 		<h1>Hello ${user.firstName},</h1>
// 		<p>Please use the below reset token to reset your password.</p>
// 		<p> ${resetToken} </p>
// 	`;

// 		try {
// 			sendEmail({
// 				to: user.email,
// 				subject: 'Password Reset Request',
// 				text: message,
// 			});

// 			return res.send({
// 				success: true,
// 				message: `Hello ${user.firstName}, please check your email to reset your password.`,
// 			});
// 			// return res.send({
// 			// 	token: resetToken,
// 			// 	message: message,
// 			// });
// 		} catch (err) {
// 			user.resetPasswordToken = undefined;
// 			user.resetPasswordExpire = undefined;

// 			await user.save();

// 			return res.status(500).send({
// 				message: 'Email could not be sent.',
// 			});
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const resetPassword = async (req, res) => {
// 	const resetPasswordToken = crypto
// 		.createHash('sha256')
// 		.update(req.params.resetToken)
// 		.digest('hex');

// 	try {
// 		const user = await User.findOne({
// 			resetPasswordToken,
// 			resetPasswordExpire: { $gt: Date.now() },
// 		});

// 		if (!user) {
// 			return res.status(400).send({
// 				message: 'Invalid reset token.',
// 			});
// 		}

// 		const hashedPw = bcrypt.hashSync(req.body.password, 10);

// 		user.password = hashedPw;
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordExpire = undefined;

// 		await user.save();
// 		return res.send({
// 			success: true,
// 			message: `Hello ${user.firstName}, you've successfully reset your password.`,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
