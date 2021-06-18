const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {createAccessToken} = require("../auth.js")

module.exports.registerUser = (req,res) => {

	const hashedPw = bcrypt.hashSync(req.body.password, 10)
	if(req.body.password.length < 8) return res.send({err: "Password is too short."})
	if (req.body.password !== req.body.confirmPassword) return res.send({err:"Passwords don't match."})

	let newUser = new User({

			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			password: hashedPw

	})
	
	newUser.save()
	.then(user => {
		res.send(user)
	})
	.catch(err => {
		res.send(err)
	})


}



module.exports.loginUser = (req,res) => {

	User.findOne({email: req.body.email})
	.then(foundUser => {

		if(foundUser === null){
			res.send({err: "Email is not registered."})
		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)
			if(isPasswordCorrect){
				res.send({accessToken: createAccessToken(foundUser)})
			} else {

				res.send({err: "Password is incorrect."})
			}

		}

	})
	.catch(error => {
		res.send(error)
	})

}

//get user details
module.exports.userDetails = (req,res) => {

	User.findById(req.user.id, {password: 0})
	.then(foundUser => {
		res.send(foundUser)
	})
	.catch(error => {
		res.send(error)
	})

}
