const router = require('express').Router();
const { emailExists } = require('../validation');
const { verifyToken } = require('../auth');
const { verify } = require('../middlewares/auth');

const {
	registerUser,
	loginUser,
	userDetails,
} = require('../controllers/userController');

// router.post('/register', emailExists, registerUser);

// router.post('/login', loginUser);

router.get('/', verify, userDetails);

module.exports = router;
