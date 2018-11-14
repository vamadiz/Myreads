import findBy from 'array-find-by';

export const shelfNames = {
  none: 'None',
  read: 'Read',
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want To Read'
};

export function shelfToList(bookShelf) {
  const shelfIds = ['read', 'currentlyReading', 'wantToRead'];
  var bookList = [];
  for(var i = 0; i < shelfIds.length; ++i) {
    var shelf = bookShelf[shelfIds[i]];
    for(var j = 0; j < shelf.length; ++j)
      bookList.push({id: shelf[j].id, shelf: shelf[j].shelf});
  }
  return bookList;
}

export function findBookById(books, id) {
  const book = findBy.call(books, 'id', id);
  if(book.length !== 2)
    return null;
  return book[0];
}
