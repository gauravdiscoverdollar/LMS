
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
    sortName(books);
    console.log("Booklist:\n",books)
}

// function to display deleted booklist
function deletedListBook(){
    console.log("Deleted Booklist:\n",deleted_books);
}

// function to search book with the book_id
function searchBook(book_id){
    // finding book
    let book = books.map((val,id)=>{
        if(val.book_id === book_id){
            return val;
        }
    })

    // checking if book found or not
    if(book[0]===undefined){                        //if not found
        console.warn(`Book with book_id: ${book_id} not found`);
    }else{                                          //if found
        console.log(`Book Found --> see Details\n `,book[0])
    }
}


// function to delete a particular book
function deleteBook(book_id){
    // getting index of book_id if available
    let index;
    books.map((val,id)=>{
        if(val.book_id === book_id){
            index = id;
        }
    });

    if(index !== undefined){
        deleted_books.push(books[index]);
        books = books.filter((val,id)=>{
            return id !== index;
        })

        console.log("Book Deleted Successfully");
    }else{
        console.warn(`Book with book_id: ${book_id} for deleting not found`);
    }
  
}



// function to query books
function query(){
    let q = prompt("Predetermined Queries:\n1. Get the top 5 most expensive books that are present in the library.\n2. Number of books in each Genre.\nEnter Option 1 or 2 or 0 for Exit");
    if(q==1){
        let top5 = [];
        let i = 0;
        books.map((val,id)=>{
            if(i<5){
                top5.push(val);
                i++;   
            }else{
                sortPrice(top5);
                if(val.price > top5[0].price){
                    top5[0] = val;
                }
            }
        })
        console.log('List of Top 5 Most Expensive Books',top5);
    
    }else if(q==2){
        console.log('Genre');
    }else{
        if(q!=0){
            console.warn('Please Enter Appropriate Option');
            query();
        }else{
            console.warn(`You Close the Query!`)
        }
    }
}


// function to sort array according to name in ascending order
function sortName(arr){
    return arr.sort((a, b) => a.book_name.localeCompare(b.book_name))
}

// function to sort array according to price in ascending order
function sortPrice(arr){
    return arr.sort((a, b) => a.price - b.price)
}

