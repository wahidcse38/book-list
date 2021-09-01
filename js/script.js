// Get UI element
let form = document.querySelector('#book_form');
let bookList = document.querySelector('#book_list');


//Creating a Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
    constructor() {

    }
    addToBookList(book) {
        // console.log(book);
        let list = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }
    // Clear Field
    clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    // Function for allert
    showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book_form');
        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }
      // remove book from table.  
    deleteFromBook(target) {
        let ui = new UI();
        if (target.hasAttribute("href")){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            ui.showAlert("Book Removed!","success");
        }      
    }
}

// Local storage class
class Store {
    
    static getBook(){
        let books;
        //let store = new Store();
        if (localStorage.getItem('books')=== null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;

    }
    static addBook(book){
        let books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    // Display book in UI from Storage
    static displayBook() {
        let books = Store.getBook();
        books.forEach(element => {
            let ui = new UI();
            ui.addToBookList(element);

        });
    }
    //Remove book parmanently
    static removeBook(isbn){
        let books = Store.getBook();
        books.forEach((book, index) => {
           if (book.isbn === isbn) {
            books.splice(index, 1);
           }  
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Add event Listeneer
form.addEventListener('submit', newBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());

//Define Function
function newBook(e) {
    // console.log("Hello");
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

    // Success or Error Alert
    let ui = new UI();

    if (title === ''|| author === ''|| isbn === '') {
        ui.showAlert("Please Fill All Fields!", "error");
    } else {
        let book = new Book(title, author, isbn);
  
        ui.addToBookList(book);

        ui.showAlert("Book Added Sucessfully", "success");

        // Clear Field
        ui.clearFields();

       
        Store.addBook(book);
    }
    e.preventDefault();
}

// Function for delete book
function removeBook(e) {
    let ui = new UI();
    ui.deleteFromBook(e.target);
  
    e.preventDefault();
}