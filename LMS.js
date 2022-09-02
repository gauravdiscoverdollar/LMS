
let books = [];                         //books array 
let deleted_books = [];                 //deleted books array


// function for addding new book
function addBook(book_name,book_author,price,book_id,desc,genre){

    // checking all the book data is filled or not
    if(book_name && book_author && price && book_id && desc && genre){

        // creating book data as object
        let book = {
            book_name,book_author,price,book_id,desc,genre
        }

        // finding if book is already in current list
        let check = books.filter((val,id)=>{
            return val.book_id === book_id;
        })

        // if passed book data is not in current list
        if(check.length === 0){
            books.push(book);
            console.log("Book is Added Successfully")
        }else{                                              //if passed book data is in current list
            console.error("Warning!! --> Book is Already Added")
        }
    }else{                                                 //if passed data is not enough
        console.error("Inappropriate Data");
        console.log("Please Enter Data in Manner with Data- \n 'this.addBook(book_name,book_author,price,book_id,desc,genre)' ")
    }
}


// function to edit existing books with new data
function editBook(book_id,newData){
    
    // getting index of book_id if available
    let index;
    books.map((val,id)=>{
        if(val.book_id === book_id){
            index = id;
        }
    })

    // checking if book_id is available in current booklist
    if(index !== undefined){
        
        if(Object.keys(newData).length=== 0){
            console.error("Warning! You Have Passed Empty Data");
            return;
        }

        // checking if new bookname is passed or not
        for(key in newData){
            if(books[index][key]){
                books[index][key] = newData[key];
            }else{
                console.error(`Your Key: ${key} for Book is Inapproprite`);
                console.log(`Please Edit Again ${key} With Proper Key Value`);
            }
        }
        
        
    }else{                                  //sending warning if book_id is not found in current booklist
        console.error(`Sorry! Book with book_id: ${book_id} is not Present in Book List`);
        console.log('Please do listBooks() to Get Booklist IDs')
    }

}


// function to display current booklist
function listBooks(){
    console.log(books)
}



