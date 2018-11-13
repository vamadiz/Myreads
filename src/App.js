import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import Search from './Search';
import { shelfNames, shelfToList } from './utils';

class BooksApp extends React.Component {
  state = {
    bookShelf: {
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      var bookShelf = {
        read: [],
        currentlyReading: [],
        wantToRead: []
      };
      for(var i = 0; i < books.length; ++i)
        bookShelf[books[i].shelf].push(books[i]);
      this.setState({bookShelf});
    });
  }

  moveBook = (book, src, dst) => {
    if(src === dst)
      return;
    BooksAPI.update(book, dst)
      .then(() => {
        this.setState((state) => {
          var bookShelf = state.bookShelf;
          if(src in this.state.bookShelf)
            bookShelf[src] = bookShelf[src].filter((b) => b.id !== book.id);
          if(dst !== 'none') {
            book.shelf = dst;
            bookShelf[dst].push(book);
          }
          return {bookShelf};
        });
      });
    }


    render() {
      return (
        <div className="app">
          <Route path='/search' render={() => (
            <Search
              moveBook={this.moveBook}
              shelfList={shelfToList(this.state.bookShelf)}
              />
          )}/>

          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {['currentlyReading', 'wantToRead', 'read'].map((shelf_id) => (
                    <div className="bookshelf"
                         key={'bs-'+shelf_id}>
                      <h2 className="bookshelf-title"
                          key={'h2-'+shelf_id}>
                          {shelfNames[shelf_id]}
                      </h2>
                      <BookShelf
                        key={shelf_id}
                        shelfId={shelf_id}
                        books={this.state.bookShelf[shelf_id]}
                        moveBook={this.moveBook}
                        />
                    </div>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add book</Link>
              </div>
            </div>

          )}/>
        </div>
      );
    }




}

export default BooksApp
