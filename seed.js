'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');



async function seed() {

  await Book.create( {
    title: 'The Three-Body Problem -- Trilogy',
    author: 'Cixin Liu',
    description: 'The best set Sci-Fi books I have ever read!',
    status: 'Done'

  });
  await Book.create({
    title: 'Ulysses',
    author: 'James Joyce',
    description: 'A life-changing understanding of what it means to be aware.',
    status: 'Done'

  });
  await Book.create({
    title: 'Infinite Jest',
    author: 'David Foster Wallace',
    description: 'The single greatest book I have ever read.',
    status: 'Done'

  });

  mongoose.disconnect();
}

seed();

