console.log("This is index.js");

// Constructor
function Book(names, author, type, price){
    this.names = names;
    this.author = author;
    this.type = type;
    this.price = price;
}

//Dusplay Constructor
function Display(){

}

//Add Methods to display prototype
Display.prototype.show = function(){

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

Display.prototype.clear = function(){
    let libraryForm = document.getElementById('library-form');
    libraryForm.reset();
}

Display.prototype.add = function(book){
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


//Validate function
Display.prototype.valitade = function(book){
    if(book.names.length <=2 || book.author.length <=2 || book.price < 0){
        return false;
    }
    else{
        return true;
    }
}

// ShowMessage Function 
Display.prototype.showMessage = function(message, type, desc){
    let msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${message}</strong> ${desc}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

  setTimeout(() => {
    msg.innerHTML = '';
  }, 1500);
}


//Add Submit event listener Library form
let libraryForm = document.getElementById('library-form');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(event){
    event.preventDefault();
    console.log("You have submitted library form");

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

    let display = new Display();

    //adding to table body
    if(display.valitade(book)){
        display.add(book);
        //Blank the form Value
        display.clear();
        display.showMessage('Success', 'success', 'You have successfully added the book.');
    }
    else{
       display.showMessage('Err', 'danger', 'Inputs are invalid');
    }

}

let display = new Display();
display.show();