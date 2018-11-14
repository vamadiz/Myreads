import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { shelfNames } from './utils';

class ShelfChanger extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    changeBook: PropTypes.func.isRequired
  }


  render() {
    const opts = ['none', 'read', 'currentlyReading', 'wantToRead'];
    const { book, shelf, changeBook } = this.props;


    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={shelf}
          onChange={(event) => {
            const { book, shelf, changeBook } = this.props;
            var target = event.target.value;
            changeBook(book, shelf, target);
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
