const router = require('express').Router()
const { verifyToken } = require('../auth')

const entryController = require('../controllers/entryController')

console.log(entryController)

router.post('/', verifyToken, entryController.addEntry)

router.get('/', verifyToken, entryController.getEntries)

router.get('/expenses', verifyToken, entryController.getExpenses)

router.get('/income', verifyToken, entryController.getIncome)

router.get('/:id', verifyToken, entryController.getEntry)

router.put('/:id', verifyToken, entryController.updateEntry)

router.delete('/:id', verifyToken, entryController.deleteEntry)

module.exports = router