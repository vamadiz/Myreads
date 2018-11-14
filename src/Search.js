import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import './App.css';

class Search extends Component {

  static propTypes = {
    changeBook: PropTypes.func.isRequired,
    shelfList: PropTypes.array.isRequired
  }

  state = {
    searchQuery: '',
    searchResults: [],
    searchError: false
  };


  changeBookShelf = (books) => {
    let searchResults = this.state.searchResults
    let shelfList = this.props.shelfList
    for (let book of searchResults) {
      book.id = 'None'
    }

    for (let book of searchResults) {
      for (let b of shelfList) {
        if (b.id === book.id) {
          book.id = b.shelf
        }
      }
    }
    return books;
  }

  updateQuery = event => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });

    if (searchQuery) {
      BooksAPI.search(searchQuery.trim(), 20).then(shelfList => {
        shelfList.length > 0
          this.changeBookShelf(shelfList)
          ? this.setState({ searchResults: shelfList, searchError: false })
          : this.setState({ searchResults: [], searchError: true });
      });
    } else this.setState({ searchResults: [], searchError: false });
  };


  render() {
    const { searchQuery, searchResults, searchError } = this.state;
    const { changeBook, shelfList } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              //value={searchQuery}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        {searchResults.length > 0 && (
          <BookShelf
            key='search-shelf'
            shelfId='search-shelf'
            books={searchResults}
            changeBook={changeBook}
            shelfList={shelfList}
            />
          )}
          {searchError && (
            <h3>No results found. Please try again!</h3>
          )}

      </div>
    );
  }


}

export default Search
