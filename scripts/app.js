console.log("App.js linked");

class Book{
    constructor(names, author, type, price){
        this.names = names;
        this.author = author;
        this.type = type;
        this.price = price;
    }
}

class Display{
    
    //Methods
    show(){
        let bookStorage = localStorage.getItem("bookstr");
        let bookObj = [];
    
        if (bookStorage == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(bookStorage);
        }
    
        let tableBody = document.getElementById('table-body');
        console.log(bookObj);
        bookObj.forEach(function(element, index){
            tableBody.innerHTML+= `<tr>
            <th scope="row">${index+1}</th>
            <td>${element.names}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td>Rs. ${element.price}.00</td>
        </tr>
        `
        });
    }


    add(book){
        let bookStorage = localStorage.getItem("bookstr");
        let bookObj = [];
    
        if (bookStorage == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(bookStorage);
        }
        obj = {
            names: book.names,
            author: book.author,
            type: book.type,
            price: book.price
        }
        bookObj.push(obj);
        localStorage.setItem('bookstr', JSON.stringify(bookObj));
        this.show();
    }

    clear(){
        let libraryForm = document.getElementById('library-form');
        libraryForm.reset();
    }

    validateMe(book){
        if(book.names.length <=2 || book.author.length <=2 || book.price < 0){
            return false;
        }
        else{
            return true;
        }
    }

    showMessage(message, type, desc){
        let msg = document.getElementById('msg');
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${message}</strong> ${desc}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    
      setTimeout(() => {
        msg.innerHTML = '';
      }, 1500);
    } 
} 



class Submit extends Display{

    constructor(){
        super();
        let libraryForm = document.getElementById('library-form');
        libraryForm.addEventListener('submit', this.libraryFormSubmit);
    }


    libraryFormSubmit(event){
        event.preventDefault();
    
        //Grabbing details of the book
        let names = document.getElementById('name').value;
        let author = document.getElementById('author').value;
        let price = document.getElementById('price').value;
        let type = "";
    
        let fiction = document.getElementById('fiction');
        let selfHelp = document.getElementById('self-help');
        let biography = document.getElementById('biography');
        let comics = document.getElementById('comics');
    
        if(fiction.checked){
            type = fiction.value;
        }
        else if(selfHelp.checked){
            type = selfHelp.value;
        }
        else if(biography.checked){
            type = biography.value;
        }
        else if(comics.checked){
            type = comics.value;
        }
    
        let book = new Book(names, author, type, price);
    
        //adding to table body
        let validate = super.validateMe(book);
        if(validate){
            super.add(book);
            //Blank the form Value
            this.clear();
            super.showMessage('Success', 'success', 'You have successfully added the book.');
        }
        else{
           super.showMessage('Err', 'danger', 'Inputs are invalid');
        }
    }
}


//To be implemented in the DOM
class Library{
    constructor(bookList){
        this.bookList = bookList;
        this.issuedBooks = {};
    }

    getBookList(){
        this.bookList.forEach(element=>{
            console.log(element);
        })
    }

    issueBook(bookname, user){
        if (this.issuedBooks[bookname] == undefined){
            this.issuedBooks[bookname] = user;
        }
        else{
            console.log('This book is already issued')
        }
    }

    returnBook(bookname){
        delete this.issuedBooks[bookname];
        this.bookList
    }
}

let submit = new Submit();
submit.show();