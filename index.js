let form = document.getElementById('book-form');
let modal = document.getElementById('book-modal');
let container = document.getElementById('container');
let libraryElement = document.getElementById('library');

class Book  {
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    toggleRead() {
        this.read = !this.read;
    }



}

class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(title, author, pages, read) {
        let book = new Book(title, author, pages, read);
        this.library.push(book);
        displayBook(book);
    }

    toggleBook(id) {
        console.log(this, id)
        this.library[id].toggleRead();
    }
    
}


function onDelete(e){
    const div = e.target.parentNode.parentNode;
    div.parentNode.removeChild(div);
}

function onToggle(e){
    const id = e.target.parentNode.dataset.id;
    console.log(e.target)
    lib.toggleBook(id)
    const div = e.target.parentNode.parentNode;
    div.querySelector('.read').innerText = `Read: ${lib.library[id].read  ? 'Read' : 'Unread'}`;
}

function displayBook(book) {
    let div = document.createElement('div');
    div.classList.add('book');
    div.setAttribute("data-id", lib.library.length-1);

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
    buttons.setAttribute("data-id", lib.library.length-1);


    let toggleButton = document.createElement('button');
    toggleButton.innerText = "Toggle Read";
    toggleButton.addEventListener('click', onToggle); /* ++++ */
    let deleteButton =  document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', onDelete)
    buttons.appendChild(toggleButton);
    buttons.appendChild(deleteButton);
    div.appendChild(buttons);

    libraryElement.appendChild(div);
}

function formSubmit(){
    lib.addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);
    closeForm();
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

let lib = new Library();
lib.addBookToLibrary('Klara and the sun', 'Kazuo Ishuguro', 307, false);
