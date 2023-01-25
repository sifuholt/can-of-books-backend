'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Book = require('./models/books.js');


// middleware

app.use(cors());
app.use(express.json());


// all that is needed to connect to library
mongoose.connect(process.env.DB_URL);


// confirm connection

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// console.log('Mongoose is live!');
// 
// });


//  define port
const PORT = process.env.PORT || 3001;


//  route
app.get('/', (request, response, next) => {

  response.send('test request received');

});

// call routes
app.get('/book', getBooks);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook);

// code that runs out of order, waiting on model
async function getBooks(request, response, next) {

  try {
    let dbBooks = await Book.find();
    response.status(200).send(dbBooks);

  } catch (error) {
    next(error);

  }
}


async function postBook(request, response, next) {
  console.log(request.body);

  try {
    let createBook = await Book.create(request.body);
    response.status(200).send(createBook);

  } catch (error) {
    next(error);
  }
}


async function deleteBook(request, response, next) {
  let id = request.params.id;

  try {
    await Book.findByIdAndDelete(id);
    response.status(200).send('The Book has been removed.');

  } catch (error) {
    next(error);
  }
}


async function putBook(request, response, next) {
  let id = request.params.id;

  try {
    let data = request.body;
    let updateBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true});
    response.status(200).send(updateBook);

  } catch (error) {
    next(error);

  }
}

app.get('*', (request, response) => {
  response.status(404).send('This one is not available.');

});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);

});



app.listen(PORT, () => console.log(`Loud and clear on:  ${PORT}`));



  // endpoint to delete
  // must have path parameter
  // use a variable to capture id
  // create variable with colon
  // app.delete('/modules/:bookID', deleteBook);

  // async function deleteBook(request, response, next) {

    // try {
      // let
    // }













 




