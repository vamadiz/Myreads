import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { shelfNames } from './utils';

class ShelfChanger extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  //updateBook = event =>
  //  this.props.moveBook(this.props.book, this.props.shelf, event.target.value)

  render() {
    const opts = ['read', 'currentlyReading', 'wantToRead', 'none'];
    const { book, shelf, moveBook } = this.props;
    //let currentBook = 'none';

    /*for (let item of shelf) {
      if (item.id === book.id) {
        currentBook = item.shelf;
        break;
      }
    }*/
    //const book = this.props.book;
    //var shelf = this.props.shelf !== 'search-shelf' ? this.props.shelf : 'none';

    return (
      <div className="book-shelf-changer">
        <select
          //onChange={this.updateBook}
          defaultValue={shelf}
          onChange={(event) => {
            const { book, shelf, moveBook } = this.props;
            var target = event.target.value;
            moveBook(book, shelf, target);
          }}>
          <option value="none" disabled>Move to...</option>
          {opts.map((opt) => (
            <option
              key={opt}
              value={opt}>
              {shelfNames[opt]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChanger
