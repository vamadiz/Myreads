import findBy from 'array-find-by';

export const shelfNames = {
  read: 'Read',
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want To Read',
  none: 'None'
};

export function shelfToList(shelf_books) {
  const shelfIds = ['read', 'currentlyReading', 'wantToRead'];
  var bookList = [];
  var i;
  var j;
  for(i = 0; i < shelfIds.length; ++i) {
    var shelf = shelf_books[shelfIds[i]];
    for(j = 0; j < shelf.length; ++j)
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
