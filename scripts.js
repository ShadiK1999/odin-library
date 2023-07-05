let table = document.querySelector(".library");

let form = document.querySelector("#form");
let newTitle = document.querySelector("#title");
let newAuthor = document.querySelector("#author");
let newPages = document.querySelector("#pages");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(book) {
  myLibrary.push(book);
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  updateTable();
}

function getRead() {
  return document.querySelector('input[name="read-status"]:checked').value;
}

function changeRead(book) {
  if (book.read == "Read") {
    book.read = "Not Read";
  } else {
    book.read = "Read";
  }
}

function updateTable() {
  book = myLibrary[myLibrary.length - 1];

  let name = book.title;
  let author = book.author;
  let pages = book.pages;
  let read = book.read;
  let index = myLibrary.indexOf(book);

  let template = `
                <tr>
                    <td>${name}</td>
                    <td>${author}</td>
                    <td>${pages}</td>
                    <td>${read}</td>
                    <td><button class="readButton" value='${index}'>change read status</button></td>
                    <td><button class="delButton" value='${index}'>delete</button></td>
                </tr>`;
  table.innerHTML += template;
}

function resetForm() {
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
}

function init() {
  book1 = new Book("The Hobbit", "J.R.R Tolkien", 192, "Read");
  addBook(book1);
  updateTable();
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let titleValue = newTitle.value;
    let authorValue = newAuthor.value;
    let pagesValue = newPages.value;
    let readValue = getRead();

    newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    addBook(newBook);
    updateTable();
    resetForm();
  });
} else {
  console.log("form is null");
}

window.onload = init();

let delButton = document.querySelector(".readButton");
let readButton = document.querySelector(".delButton");

if (delButton) {
  console.log(delButton.value);
  delButton.addEventListener("click", deleteBook(delButton.value));
} else {
  console.log("del is null");
}
