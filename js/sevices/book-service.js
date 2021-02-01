'use strict';
const STORAGE_KEY = 'all-books';
var gBooks;
var gBookNames = [
  'Little Prince',
  'Grey City',
  'Angels',
  'The Cook Book',
  'Speedy Queen',
  'Match Made in Heavan',
  '1984',
  'Max the Dog',
  'The Cutest'
];
var gSortBy;

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 5; i++) {
      var book = _createBook();
      books.push(book);
    }
  }
  gBooks = books;
  _saveBooksToStorage();
  return books;
}

function _createBook(nameFromUser, priceFromUser) {
  var randImgNum = getRandomIntInclusive(1, 8);
  var book = {
    id: getRandomId(),
    name: addBookName(nameFromUser),
    price: addBookPrice(priceFromUser),
    imgUrl: `img/img_${randImgNum}.jpg`,
    txt: getRandTxt(),
    isModalOpen: false,
    rating: getRandomIntInclusive(0, 10),
  };
  return book;
}

function addBook(bookName, bookPrice) {
  var newBook = _createBook(bookName, bookPrice);
  gBooks.push(newBook);
  saveToStorage(STORAGE_KEY, gBooks);
}

function addBookName(nameFromUser) {
  var randIdx = getRandomIntInclusive(0, gBookNames.length - 1);
  var bookName = nameFromUser
    ? nameFromUser
    : gBookNames.splice(randIdx, 1).join('');
  return bookName;
}

function addBookPrice(priceFromUser) {
  var randPrice = getRandomIntInclusive(20, 150);
  var bookPrice = priceFromUser ? priceFromUser : randPrice;
  return bookPrice;
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
  return gBooks;
}

function updateBook(bookId, bookPrice) {
  var currBook = findBookById(bookId);
  currBook.price = bookPrice;
  _saveBooksToStorage();
}

function submitRating(userRating) {
  var book = gBooks.find(function (bookOpened) {
    return bookOpened.isModalOpen === true;
  });
  if (!book) console.log('couldnt find the book in gBooks');

  book.rating = parseInt(userRating);
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}

function getBooksForDisplay() {
  var books = gBooks;
  if (gSortBy === 'name') {
    return _sortByName(books);
  } else if (gSortBy === 'price') {
    return _sortByNumber(books);
  }
  return books;
}

function _sortByName(books) {
  return books.sort(function (book1, book2) {
    return book1.name.localeCompare(book2.name);
  });
}

function _sortByNumber(books) {
  return books.sort(function (price1, price2) {
    return price1[gSortBy] - price2[gSortBy];
  });
}
