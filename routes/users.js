const router = require('express').Router()
const {emailExists} = require('../validation')
const { verifyToken } = require('../auth')

const {registerUser,loginUser,userDetails} = require('../controllers/userController')

router.post('/',emailExists, registerUser)

router.post('/login', loginUser)

router.get('/', verifyToken, userDetails)

module.exports = router