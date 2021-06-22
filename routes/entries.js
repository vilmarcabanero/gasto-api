const router = require('express').Router();
const { verifyToken } = require('../auth');
const { verify } = require('../middlewares/auth');

const entryController = require('../controllers/entryController');

// console.log(entryController)

// router.post('/', verifyToken, entryController.addEntry)

// router.get('/', verifyToken, entryController.getEntries)

// router.get('/expenses', verifyToken, entryController.getExpenses)

// router.get('/income', verifyToken, entryController.getIncome)
// router.get('/category/:category', verifyToken, entryController.getEntriesByCategory)
// router.get('/:id', verifyToken, entryController.getEntry)

// router.put('/:id', verifyToken, entryController.updateEntry)

// router.delete('/:id', verifyToken, entryController.deleteEntry)

router.post('/', verify, entryController.addEntry);

router.get('/', verify, entryController.getEntries);

router.get('/expenses', verify, entryController.getExpenses);

router.get('/income', verify, entryController.getIncome);
router.get('/category/:category', verify, entryController.getEntriesByCategory);
router.get('/:id', verify, entryController.getEntry);

router.put('/:id', verify, entryController.updateEntry);

router.delete('/:id', verify, entryController.deleteEntry);

module.exports = router;
