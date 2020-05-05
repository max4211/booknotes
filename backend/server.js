/* VERSION OF EXPRESS */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* CONFIGURES ENVIRONMENT VARIABLES */
require('dotenv').config();

/* CREATE EXPRESS SERVER */
const app = express();
const port = process.env.PORT || 5000;

/* MIDDLEWARE, ALLOWS US TO PARSE JSON */
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/* REQUIRE AND USE FILES */
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

app.use('/books', booksRouter);
app.use('/users', usersRouter);

/* START THE SERVER LISTENING ON A PORT */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});