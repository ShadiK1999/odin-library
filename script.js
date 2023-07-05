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

function createBook() {
  let titleValue = newTitle.value;
  let authorValue = newAuthor.value;
  let pagesValue = newPages.value;
  let readValue = getRead();

  newBook = new Book(titleValue, authorValue, pagesValue, readValue);
  if (!validateBook(newBook)) return;
  addBookToLibrary(newBook);
  updateTable();
  resetForm();
}

function validateBook(book) {
  if (book.title == "") return false;
  if (book.author == "") return false;
  if (book.pages <= 0) return false;

  return true;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateTable();
}

function deleteBookFromLibrary(index) {
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

  updateTable();
}

function updateTable() {
  table.innerHTML = " ";

  myLibrary.forEach((book) => {
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
  });

  init();
}

function resetForm() {
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
}

function init() {
  let delButton = document.querySelector(".delButton");
  let readButton = document.querySelector(".readButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    createBook();
  });

  delButton.addEventListener("click", function () {
    deleteBookFromLibrary(delButton.value);
  });

  readButton.addEventListener("click", function () {
    index = readButton.value;
    console.log("clicked");
    changeRead(myLibrary[index]);
  });
}

book1 = new Book("The Hobbit", "J.R.R Tolkien", 192, "Read");
addBookToLibrary(book1);
window.onload = init();
