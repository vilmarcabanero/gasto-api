const { verifyToken } = require('../auth')
const { verify } = require('../middlewares/auth');
const { categoryExists } = require('../validation')
const router = require('express').Router()
const categoryController = require('../controllers/categoryController')


router.post('/', verify, categoryExists, categoryController.addCategory)

router.get('/', verify, categoryController.getCategories)

router.get('/:id', verify, categoryController.getCategory)

router.put('/:id', verify, categoryController.updateCategory)

router.delete('/:id', verify, categoryController.deleteCategory)

module.exports = router