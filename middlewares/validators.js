import { check, validationResult } from 'express-validator';

export const isRequestValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.array().length > 0) {
		return res.status(400).json({ message: errors.array()[0].msg });
	}
	next();
};

export const validateRegisterRequest = [
	check('firstName').notEmpty().withMessage('First name is required.'),
	check('lastName').notEmpty().withMessage('Last name is required.'),
	check('email').isEmail().withMessage('Valid email is required.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long.'),
];

export const validateLoginRequest = [
	check('email').isEmail().withMessage('Valid email is required.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long.'),
];

