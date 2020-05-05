const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const page = Number(req.body.page);
  const quote = req.body.quote;
  const thoughts = req.body.thoughts;

  const newBook = new Book({
    username,
    page,
    quote,
    thoughts
  });

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;