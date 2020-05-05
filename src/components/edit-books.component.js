import React, { Component } from 'react';
import axios from 'axios';

export default class EditBooks extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeQuote = this.onChangeQuote.bind(this);
        this.onChangeThoughts = this.onChangeThoughts.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            page: 0,
            quote: '',
            thoughts: '',
            users: []
        }
    }

    /* LIFE CYCLE METHOD IN REACT - RIGHT BEFORE THINGS IN PAGE DISPLAY */
    componentDidMount() {
        axios.get('http://localhost:5000/books/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    page: response.data.page,
                    quote: response.data.quote,
                    thoughts: response.data.thoughts
                })
            })
        axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({ 
              users: response.data.map(user => user.username),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    /* CREATE METHODS TO HANDLE THE FORM */
    onChangeUsername(e) {
        this.setState( {
            username: e.target.value
        });
    }

    onChangePage(e) {
        this.setState( {
            page: e.target.value
        });
    }

    onChangeQuote(e) {
        this.setState( {
            quote: e.target.value
        });
    }

    onChangeThoughts(e) {
        this.setState( {
            thoughts: e.target.value
        });
    }

    onSubmit(e) {
        // Prevent default HTML form submit from occuring
        e.preventDefault();

        const book = {
            username: this.state.username,
            page: this.state.page,
            quote: this.state.quote,
            thoughts: this.state.thoughts
        }

        /* SUBMIT EXERCISE TO DATABASE */
        console.log(book);

        axios.post('http://localhost:5000/books/update/'+this.props.match.params.id, book)
            .then(res => console.log(res.data));

        /* TAKE PERSON BACK TO HOMEPAGE */
        window.location = '/';

    }

  render() {
    return (
        <div>
        <h3>Edit Book Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                    {/* JavaScript */}
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Page: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.page}
                onChange={this.onChangePage}
                />
          </div>
          <div className="form-group">
            <label>Quote: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.quote}
                onChange={this.onChangeQuote}
                />
          </div>
          <div className="form-group">
            <label>Thoughts: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.thoughts}
                onChange={this.onChangeThoughts}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Book Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}