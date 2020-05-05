import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* IMPLEMENTED AS A FUCNTIONAL REACT COMPONENT */
/* TODO - restyle as a button */
const Book = props => (
    <tr>
      <td>{props.book.username}</td>
      <td>{props.book.page}</td>
      <td>{props.book.quote}</td>
      <td>{props.book.thoughts}</td>
      <td>
        <Link to={"/edit/"+props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
      </td>
    </tr>
  )

  /* IMPLEMENTED AS A CLASS COMPONENT */
export default class BooksList extends Component {

    constructor(props) {
        super(props);

        this.deleteBook = this.deleteBook.bind(this);

        this.state = {books: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/books/')
        .then(response => {
            this.setState({ 
                books: response.data
            });
        })
        .catch((error) => {
          console.log(error);
        })
    }

    deleteBook(id) {
        axios.delete('http://localhost:5000/books/'+id)
          .then(res => console.log(res.data));

          // Remove books that do not match the given id
        this.setState({
          books: this.state.books.filter(el => el._id !== id)
        })
      }

      /* ITERATES THROUGH ALL BOOKS, RETURNS INDIVIDUAL COMPONENTS (ROW IN TABLE) */
      bookList() {
        return this.state.books.map(currentBook => {
          return <Book book={currentBook} deleteBook={this.deleteBook} key={currentBook._id}/>;
        })
      }

    render() {
        return (
        <div>
        <h3>Logged Books</h3>
        <table className="table">
            <thead className="thead-light">
            <tr>
                <th>Username</th>
                <th>Page</th>
                <th>Quote</th>
                <th>Thoughts</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            { this.bookList() }
            </tbody>
        </table>
        </div>
        )
    }
}