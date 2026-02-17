const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/roomController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, admin, create);
router.put('/:id', protect, admin, update);
router.delete('/:id', protect, admin, remove);

module.exports = router;
