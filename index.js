let myLibrary = [];
let form = document.getElementById('book-form');
let modal = document.getElementById('book-modal');
let container = document.getElementById('container');
let library = document.getElementById('library');


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}
Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary() {
    console.log(form.title.value);
    console.log(form.author.value);
    console.log(form.pages.value);
    console.log(form.read.checked);
    let book = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked);
    myLibrary.push(book);
    displayBook(book);
    closeForm();
}

function displayBook(book) {
    let div = document.createElement('div');
    div.classList.add('book');
    div.setAttribute("data-book-id", myLibrary.length-1);
    let title = document.createElement('h3');
    title.innerText = `Title: ${book.title}`;
    let author = document.createElement('p');
    title.innerText = `Author: ${book.author}`;
    div.appendChild(title);
    library.appendChild(div);
}

function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';

    // make the page unscrollable while the modal form is open
    document.body.style.overflowY = 'hidden';

    document.body.append(coverDiv);
}

function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
}

 
function closeForm() {
    hideCover();
    modal.style.display = 'none'; 
    container.classList.remove('active');
}

function showBookForm() {
    clearForm();
    showCover();
    modal.style.display = 'block';
    container.classList.add('active');
}

function clearForm(){
    form.title.value = '';
    form.author.value = '';
    form.pages.value = 0;
    form.read.checked = false;
}

document.getElementById('show-button').addEventListener('click', showBookForm);
document.getElementById('form-close').addEventListener('click', closeForm);
document.getElementById('form-submit').addEventListener('click', addBookToLibrary);