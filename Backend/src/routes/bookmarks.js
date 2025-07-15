const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBookmark, getBookmarks, deleteBookmark, updateBookmark, reorderBookmarks } = require('../controllers/bookmarkController');

router.use(auth);
router.post('/', createBookmark);
router.get('/', getBookmarks);
router.delete('/:id', deleteBookmark);
router.put('/:id', updateBookmark);
router.put('/reorder', reorderBookmarks);

module.exports = router; 