const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// TODO: Add routes here

module.exports = app;