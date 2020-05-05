
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  username: { type: String, required: true },
  page: { type: String, required: false },
  quote: { type: String, required: true },
  thoughts: { type: String, required: false },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;