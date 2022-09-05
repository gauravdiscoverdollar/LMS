
let books = [];                         //books array 
let deleted_books = [];                 //deleted books array


// Start --> function for addding new book
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
// End --> function for addding new book




//Start --> function to edit existing books with new data
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
        console.log("Book is Successfully Edited");
        
        
    }else{                                  //sending warning if book_id is not found in current booklist
        console.error(`Sorry! Book with book_id: ${book_id} is not Present in Book List`);
        console.log('Please do listBooks() to Get Booklist IDs')
    }
}
//End --> function to edit existing books with new data



//Start --> function to display current booklist
function listBooks(){
    if(books.length !== 0){
        sortName(books);
        console.log("Booklist:\n",books)
    }else{
        console.warn("No Books in Library!")
    }
   
}
//End --> function to display current booklist




//Start --> function to display deleted booklist
function deletedListBook(){
    if(deleted_books.length !== 0){
        console.log("Deleted Booklist:\n",deleted_books);
    }else{
        console.warn("No Books is yet Deleted!")
    }
}
//End --> function to display deleted booklist




//Start --> function to search book with the book_id
function searchBook(book_id){
    // finding book
    let book = books.filter((val,id)=>{
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
//End --> function to search book with the book_id


//Start --> function to delete a particular book
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
        console.warn(`Book with book_id: ${book_id} for deleting not found in Library`);
    }
}
//End --> function to delete a particular book




//Start --> function to query books
function query(){
    if(books.length === 0){
        console.warn("There is no book in Library. Please add few books to perform Query!")
        return;
    }
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
        console.log('List of Top 5 Most Expensive Books',sortName(top5));
    
    }else if(q==2){  
        const genreCount = books.reduce((acc,curr)=>{
           if(acc[curr.genre] !== undefined){
            acc[curr.genre] = ++acc[curr.genre]
           }else{
            acc[curr.genre] = 1;
           }
           return acc;
        },{})
        console.log("Number of books in each Genre:",genreCount);
    }else{
        if(q!=0){
            console.warn('Please Enter Appropriate Option');
            query();
        }else{
            console.warn(`You Close the Query!`)
        }
    }
}
//End --> function to query books


//Start --> function to sort array according to name in ascending order
function sortName(arr){
    return arr.sort((a, b) => a.book_name.localeCompare(b.book_name))
}
//End --> function to sort array according to name in ascending order


//Start --> function to sort array according to price in ascending order
function sortPrice(arr){
    return arr.sort((a, b) => a.price - b.price)
}
//End --> function to sort array according to price in ascending order



//Start --> Working With HTML UI

//Start --> function to handle with opening adding booklist
async function openAddBook(){
    let form = ` <h2>Add New Book</h2>
    <form id="addBookForm">
        <div>
            <label>Book ID : </label>
            <input type="number" name="book_id" id="add_book_id" />
        </div>
        <div>
            <label>Book Name : </label>
            <input type="text" name="book_name" id="add_book_name" />
        </div>
        <div>
            <label>Book Author : </label>
            <input type="text" name="book_author" id="add_book_author" />
        </div>
        <div>
            <label>Book Price : </label>
            <input type="number" name="book_price" id="add_book_price" />
        </div>
        <div>
            <label>Book Description: </label>
            <textarea name="book_desc" id="add_book_desc" required></textarea>
        </div>
        <div>
            <label>Genre</label>
            <select name="book_genre" id="add_book_genre">
                <option value="Self-help">Self-help</option>
                <option value="Personal-finance">Personal-finance</option>
                <option value="Business">Business</option>
            </select>
        </div>
        <div>
            <label></label>
            <button>ADD Book</button>
        </div>  
    </form>`;
    interface.innerHTML = form;

    // adding event listner on adding new book
    document.getElementById("addBookForm").addEventListener("submit", function(event){
        event.preventDefault();
        addBook(event.target[1].value,event.target[2].value,event.target[3].value,event.target[0].value,event.target[4].value,event.target[5].value)
        interface.innerHTML = '<h4>Book Added Successfully</h4>';
        setTimeout(()=>{
            interface.innerHTML = '';
        },1500)
    });
}
//End --> function to handle with opening adding booklist
 

// Start --> function to handle Showing Booklist in UI
function handleShowBookList(){
    sortName(books);
    hanleShowList(books);   
}
// End --> function to handle Showing Booklist in UI



// Start --> function to handle Showing Deleted Booklist in UI
function handleShowBookList(){
    sortName(deleted_books);
    hanleShowList(deleted_books);   
}
// End --> function to handle Showing Deleted Booklist in UI








// function to handle show data
function hanleShowList(data){
    interface.innerHTML= `<table>
                            <thead>
                                <tr>
                                    <th>Book_ID</th>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Genre</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                            
                            </tbody>
                        </table>`
    let tbody = document.getElementById('tbody');
    if(data.length !== 0){
        data.map((val,key)=>{
            let tr = ` <tr>
                            <td>${val.book_id}</td>
                            <td>${val.book_name}</td>
                            <td>${val.book_author}</td>
                            <td>${val.price}</td>
                            <td>${val.desc}</td>
                            <td>${val.genre}</td>
                        </tr>`;
        tbody.innerHTML += tr;
        })
    }else{
        let tr = ` <tr>
                        <td colspan="6">No Data</td>
                    </tr>`
        tbody.innerHTML = tr;
    }
}



