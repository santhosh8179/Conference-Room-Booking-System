const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  cancel,
  checkAvailability,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAll);
router.get('/availability', protect, checkAvailability);
router.get('/:id', protect, getOne);
router.post('/', protect, create);
router.put('/:id', protect, update);
router.patch('/:id/cancel', protect, cancel);

module.exports = router;
