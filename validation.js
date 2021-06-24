const User = require('./models/User')
const Category = require('./models/Category')

module.exports.emailExists = (req,res,next) => {

	User.findOne({email: req.body.email})
	.then(findResult => {
		console.log(findResult)
		if(findResult){
			res.send({error: "Email already exists."})
		} else {
			next()
		}
	})
	.catch(err => {
		res.send(err)
	})

}

module.exports.categoryExists = (req,res,next) => {

	Category.find({userId: req.user.id})
	.then(findResult => {
		console.log(findResult)
		let foundCategory = findResult.find(category => {
			return category.name.toLowerCase() === req.body.name.toLowerCase()
		})
		if(foundCategory){
			console.log(foundCategory)
			res.send({error: `Category name ${category.name} already exists.`})
		} else {
			next()
		}
	})
	.catch(err => {
		res.send(err)
	})

}