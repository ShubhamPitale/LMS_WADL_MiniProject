require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const issueRoutes = require('./routes/issue');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`connected to db & listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
