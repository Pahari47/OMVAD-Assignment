const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');

app.use('/auth', authRoutes);
app.use('/bookmarks', bookmarkRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server error' });
});

module.exports = app;