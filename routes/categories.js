const { verifyToken } = require('../auth')
const { categoryExists } = require('../validation')
const router = require('express').Router()
const categoryController = require('../controllers/categoryController')


router.post('/', verifyToken, categoryExists, categoryController.addCategory)

router.get('/', verifyToken, categoryController.getCategories)

router.get('/:id', verifyToken, categoryController.getCategory)

router.put('/:id', verifyToken, categoryController.updateCategory)

router.delete('/:id', verifyToken, categoryController.deleteCategory)

module.exports = router