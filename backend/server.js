const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // helps connect to mongodb database
require('dotenv').config(); // gets env variables

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true, // handles the updates to the connection string by mongoose
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established');
});


const app = express();
const port = process.env.PORT || 5000; // create server

app.use(cors());
app.use(express.json()); // middleware to parse json

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); // when some one goes to URL with /exercises, it loads all the exercises
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
}); // starts the server