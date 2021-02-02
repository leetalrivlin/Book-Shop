'use strict';

var gRatingCounter = 0;

function onInit() {
  gBooks = _createBooks();

  var bookOpened = gBooks.find(function (bookOpened) {
    return bookOpened.isModalOpen === true;
  });
  if (bookOpened) bookOpened.isModalOpen = false;

  _saveBooksToStorage();
  doTrans();
  renderBooks();
}

function findBookById(bookId) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });
  return book;
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTML = books
    .map(function (book) {
      return `<tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${formatCurrency(book.price)}</td>
                <td>${book.rating}⭐</td>
                <td><button data-trans="read" class="btn read-btn" onclick="onRead('${book.id}')">${getTrans('read')}</button></td>
                <td><button data-trans="update" class="btn update-btn" onclick="onUpdateBook('${book.id}')">${getTrans('update')}</button></td>
                <td><button data-trans="delete" class="btn delete-btn" onclick="onRemoveBook('${book.id}')">${getTrans('delete')}</button></td>
            </tr>`;
    })
    .join('');
  document.querySelector('.table-content').innerHTML = strHTML;
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') {
      document.body.classList.add('rtl');
  } else {
      document.body.classList.remove('rtl');
  }
  doTrans();
  renderBooks();
}

function openAddBook() {
  var elAddBtn = document.querySelector('.add-book-btn');
  var elAddBook = document.querySelector('.add-book');
  elAddBook.hidden = !elAddBook.hidden;
  elAddBtn.innerText = elAddBook.hidden ? '+' : 'x';
}

function onAddBook() {
  var bookName = document.querySelector('.input-name').value;
  var bookPrice = document.querySelector('.input-price').value;
  bookPrice = parseInt(bookPrice);

  addBook(bookName, bookPrice);
  renderBooks();
}

function onRead(bookId) {
  var bookOpened = gBooks.some(function (bookOpened) {
    return bookOpened.isModalOpen === true;
  });
  if (bookOpened) return;

  var book = findBookById(bookId);

  document.querySelector('.detail-modal .name').innerText = book.name;
  document.querySelector('.rating-stars').innerText = renderRatingStars(
    book.rating
  );
  document.querySelector('.detail-modal .img-book').src = book.imgUrl;
  document.querySelector('.detail-modal .text').innerText = book.txt;
  document.querySelector('.detail-modal').hidden = false;

  book.isModalOpen = true;
  _saveBooksToStorage();
}

function renderRatingStars(rating) {
  var starStr = '';
  for (let i = 0; i < rating; i++) {
    starStr += '⭐';
  }
  return starStr;
}

function onUpdateBook(bookId) {
  var newBookPrice = +prompt('Enter new price:');
  // var priceInCurrLang = formatCurrency(newBookPrice);
  updateBook(bookId, newBookPrice);
  renderBooks();
}

function onRemoveBook(bookId) {
  var isConfirmed = confirm(getTrans('confirm'));
  if (!isConfirmed) return;
  removeBook(bookId);
  renderBooks();
}

function onFilterBy(elHeaderSort) {
  if (elHeaderSort.dataset.sort === 'title') {
    gSortBy = 'name';
    renderBooks();
  } else if (elHeaderSort.dataset.sort === 'price') {
    gSortBy = 'price';
    renderBooks();
  }
}

function incrementValue() {
  var elRatingVal = document.querySelector('.rating-num');
  if (gRatingCounter < 10) {
    gRatingCounter++;
    elRatingVal.value = gRatingCounter;
  }
}

function decrementValue() {
  var elRatingVal = document.querySelector('.rating-num');
  if (gRatingCounter > 0) {
    gRatingCounter--;
    elRatingVal.value = gRatingCounter;
  }
}

function onSubmitRating(ev) {
  ev.preventDefault();
  var elRatingVal = document.querySelector('.rating-num').value;
  document.querySelector('.rating-stars').innerText = renderRatingStars(elRatingVal);
  submitRating(elRatingVal);
  renderBooks();
  document.querySelector('.rating-form').reset();
  document.querySelector('.rating-num').innerText = '0';
  elRatingVal = '0';
  gRatingCounter = 0;
}

function onCloseModal() {
  document.querySelector('.detail-modal').hidden = true;

  var bookOpened = gBooks.find(function (bookOpened) {
    return bookOpened.isModalOpen === true;
  });

  bookOpened.isModalOpen = false;
  _saveBooksToStorage();
}
