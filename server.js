'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Book = require('./models/book.js');


// const app = express();
app.use(cors());
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is live!');

});

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {

  response.send('test request received');

});

app.get('/book', getBooks);


async function getBooks(request, response) {
  try {
    let dbBooks = await Book.find();
    response.status(200).send(dbBooks);

  } catch (error) {
    console.log(error.message);
    response.status(400).send('Bad Request');

  }
}

app.get('*', (request, response) => {
  response.status(404).send('Sorry, this page does not exist.');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
