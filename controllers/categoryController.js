const Category = require('../models/Category')

module.exports.addCategory = (req,res) => {

	console.log(req.body)

	let newCategory = new Category({

		name: req.body.name,
		type: req.body.type,
		userId: req.user.id

	})

	newCategory.save()
	.then(category => {
		res.send({message: `Category ${category.name} has been added.`})
	})
	.catch(err => {
		res.send(err)
	})


}

module.exports.getCategories = (req,res) => {

	Category.find({userId: req.user.id})
	.then(categories => {
		res.send(categories)
	})
	.catch(err => {
		res.send(err)
	})

}

module.exports.getCategory = (req,res) => {

	Category.findOne({_id: req.params.id, userId: req.user.id},{_id:0,userId:0})
	.then( category => {
		console.log(req.user.id)
		res.send(category)
	})
	.catch(err => {
		res.send(err)
	})

}

module.exports.updateCategory = (req,res) => {

	let updates = {
		name: req.body.name,
		type: req.body.type
	}

	Category.findByIdAndUpdate(req.params.id,updates,{new:true})
	.then( category => {
		console.log(req.user.id)
		res.send({message: `Category ${category.name} has been updated.`})
	})
	.catch(err => {
		res.send(err)
	})

}

module.exports.deleteCategory = (req,res) => {

	Category.findByIdAndDelete(req.params.id)
	.then((deletedItem) => {
		console.log(deletedItem)
		res.send({message:`Category ${deletedItem.name} has been deleted.`})
	})
	.catch(err => {
		res.send(err)
	})

}