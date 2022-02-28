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

function formSubmit(){
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);
    closeForm();
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(book);
    
}

function displayBook(book) {
    let div = document.createElement('div');
    div.classList.add('book');
    div.setAttribute("data-id", myLibrary.length-1);

    let title = document.createElement('h3');
    title.innerText = `${book.title}`;
    div.appendChild(title);
    let author = document.createElement('p');
    author.innerText = `Author: ${book.author}`;
    div.appendChild(author);
    let pages = document.createElement('p');
    pages.innerText = `Pages: ${book.pages}`;
    div.appendChild(pages);
    let read = document.createElement('p');
    read.classList.add('read');
    read.innerText = `Read: ${book.read ? 'Read' : 'Unread'}`;
    div.appendChild(read);
    
    let buttons = document.createElement('div');
    buttons.classList.add('book-buttons');
    buttons.setAttribute("data-id", myLibrary.length-1);


    let toggleButton = document.createElement('button');
    toggleButton.innerText = "Toggle Read";
    toggleButton.addEventListener('click', onToggle);
    let deleteButton =  document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', onDelete)
    buttons.appendChild(toggleButton);
    buttons.appendChild(deleteButton);
    div.appendChild(buttons);

    library.appendChild(div);
}

function onToggle(e){
    const id = e.target.parentNode.dataset.id;
    myLibrary[id].read = !myLibrary[id].read;
    const div = e.target.parentNode.parentNode;
    div.querySelector('.read').innerText = `Read: ${myLibrary[id].read  ? 'Read' : 'Unread'}`;
}


function onDelete(e){
    const div = e.target.parentNode.parentNode;
    div.parentNode.removeChild(div);
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
    container.classList.toggle('active');
}

function showBookForm() {
    clearForm();
    showCover();
    modal.style.display = 'block';
    container.classList.toggle('active');
}

function clearForm(){
    form.title.value = '';
    form.author.value = '';
    form.pages.value = 0;
    form.read.checked = false;
}

document.getElementById('show-button').addEventListener('click', showBookForm);
document.getElementById('form-close').addEventListener('click', closeForm);
document.getElementById('form-submit').addEventListener('click', formSubmit);

addBookToLibrary('Klara and the sun', 'Kazuo Ishuguro', 307, false);
