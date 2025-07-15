const Bookmark = require('../models/Bookmark');
const { fetchMetadataAndSummary } = require('../utills/fetchMetadataAndSummary');

const createBookmark = async (req, res) => {
  try {
    const { url, tags } = req.body;
    const user = req.user.id;
    const { title, favicon, summary } = await fetchMetadataAndSummary(url);
    const order = await Bookmark.countDocuments({ user });
    const bookmark = await Bookmark.create({ url, title, favicon, summary, tags, user, order });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error creating bookmark' });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).sort('order');
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    await Bookmark.deleteOne({ _id: id, user: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bookmark' });
  }
};

const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const bookmark = await Bookmark.findOneAndUpdate({ _id: id, user: req.user.id }, update, { new: true });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error updating bookmark' });
  }
};

const reorderBookmarks = async (req, res) => {
  try {
    const { order } = req.body; // [{id, order}, ...]
    for (const item of order) {
      await Bookmark.findOneAndUpdate({ _id: item.id, user: req.user.id }, { order: item.order });
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error reordering bookmarks' });
  }
};

module.exports = { createBookmark, getBookmarks, deleteBookmark, updateBookmark, reorderBookmarks }; 