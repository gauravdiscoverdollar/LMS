
let books = [];                         //books array 
let deleted_books = [];                 //deleted books array
let form ;

// Start --> function for adding new book
function addBook(bookName,bookAuthor,price,bookId,desc,genre){

    // checking all the book data is filled or not
    if(bookName && bookAuthor && price && bookId && desc && genre){

        // creating book data as object
        let book = {
            bookName,bookAuthor,price,bookId,desc,genre
        }

        // finding if book is already in current list
        let check = books.filter((val,id)=>{
            return val.bookId === bookId;
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
        console.log("Please Enter Data in Manner with Data- \n 'this.addBook(bookName,bookAuthor,price,bookId,desc,genre)' ")
    }
}
// End --> function for adding new book



// add books
function addBooksHandleError (book){
    try {
        let keys = {"bookName":false,"bookAuthor":false,"price":false,"bookId":false,"desc":false,"genre":false};
        let missedKeys = [];
        for(let key in book){
            keys[key] = true;
        }
        for(let key in keys){
            if(keys[key]==false){
                missedKeys.push(key);
            }
        }
        if(missedKeys.length !==0 ){
            console.log("You did not add following data in book. Please Add",missedKeys);
        }else{
            books.push(book);
            console.log("Books Added Successfully");
        }
    } catch (error) {
        console.log(error)
    }
}



//Start --> function to edit existing books with new data
function editBook(bookId,newData){
    
    // getting index of bookId if available
    let index;
    books.map((val,id)=>{
        if(val.bookId === bookId){
            index = id;
        }
    })

    // checking if bookId is available in current booklist
    if(index !== undefined){
        
        if(Object.keys(newData).length=== 0){
            console.error("Warning! You Have Passed Empty Data");
            return;
        }

        // checking if new bookname is passed or not
        for(key in newData){
            console.log("Key",key);
            if(books[index][key]){
                books[index][key] = newData[key];
            }else{
                console.error(`Your Key: ${key} for Book is Inappropriate`);
                console.log(`Please Edit Again ${key} With Proper Key Value`);
            }
        }
        console.log("Book is Successfully Edited");
        
        
    }else{                                  //sending warning if bookId is not found in current book list
        console.error(`Sorry! Book with bookId: ${bookId} is not Present in Book List`);
        console.log('Please do listBooks() to Get Booklist IDs')
    }
}
//End --> function to edit existing books with new data



//Start --> function to display current booklist
function listBooks(){
    if(books.length !== 0){
        // sortName(books);
        let sortNameBooks = books.map((val)=>{
            return val;
        });
        sortName(sortNameBooks)
        // console.log("Book ID        Book Name                           Author          Price           Description         Genre");
        // books.map((val,id)=>{
        //     console.log(`${val.bookId}         ${val.bookName}                    ${val.bookAuthor}  ${val.price}    ${val.desc}     ${val.genre}`)
        // })
        console.log("BookList",sortNameBooks);
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




//Start --> function to search book with the bookId
function searchBook(bookId){
    // finding book
    let book = books.filter((val,id)=>{
        if(val.bookId === bookId){
            return val;
        }
    })

    // checking if book found or not
    if(book[0]===undefined){                        //if not found
        console.warn(`Book with bookId: ${bookId} not found`);
    }else{                                          //if found
        console.log(`Book Found --> see Details\n `,book[0])
    }
}
//End --> function to search book with the bookId


//Start --> function to delete a particular book
function deleteBook(bookId){
    // getting index of bookId if available
    let index;
    books.map((val,id)=>{
        if(val.bookId === bookId){
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
        console.warn(`Book with bookId: ${bookId} for deleting not found in Library`);
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
        // let top5 = [];
        // let i = 0;
        // books.map((val,id)=>{
        //     if(i<5){
        //         top5.push(val);
        //         i++;   
        //     }else{
        //         sortPrice(top5);
        //         if(val.price > top5[0].price){
        //             top5[0] = val;
        //         }
        //     }
        // })
        // suggested code
        let copyOfBooks = books.map((val)=>{
            return val;
        });
        let top5 =  top5MostExpensive(copyOfBooks);
        console.log('List of Top 5 Most Expensive Books',top5);
    
    }else if(q==2){  
        const genreCount = handleGenreCount();
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
    return arr.sort((a, b) => a.bookName.localeCompare(b.bookName))
}
//End --> function to sort array according to name in ascending order


//Start --> function to sort array according to price in ascending order
function sortPrice(arr){
    return arr.sort((a, b) => a.price - b.price)
}
//End --> function to sort array according to price in ascending order



// function to handle top5
function top5MostExpensive(arr){
    return arr.sort((a,b) => b.price-a.price).slice(0,5);
}


// function to handle genreCount
function handleGenreCount(){
    return books.reduce((acc,curr)=>{
        if(acc[curr.genre] !== undefined){
         acc[curr.genre] = ++acc[curr.genre]
        }else{
         acc[curr.genre] = 1;
        }
        return acc;
     },{});
}


//Start --> Working With HTML UI

//Start --> function to handle with opening adding booklist
async function openAddBook(){
    const interface = document.getElementById("interface");
    const book_id = 10101 + books.length + deleted_books.length;
    let form = ` <h2>Add New Book</h2>
    <form id="addBookForm">
        <div>
            <label>Book ID : </label>
            <input type="number" name="bookId" id="add_bookId" value="${book_id}" readonly required/>
        </div>
        <div>
            <label>Book Name : </label>
            <input type="text" name="bookName" id="add_bookName" required/>
        </div>
        <div>
            <label>Book Author : </label>
            <input type="text" name="bookAuthor" id="add_bookAuthor" required/>
        </div>
        <div>
            <label>Book Price : </label>
            <input type="number" name="book_price" id="add_book_price" required/>
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

    // adding event listener on adding new book
    document.getElementById("addBookForm").addEventListener("submit", function(event){
        event.preventDefault();
        const index = getIdOfBookID(parseInt(event.target[0].value));
        if(index===undefined){
            addBook(event.target[1].value,event.target[2].value,event.target[3].value,parseInt(event.target[0].value),event.target[4].value,event.target[5].value)
            interface.innerHTML = '<h4>Book Added Successfully</h4>';
            setTimeout(()=>{
                interface.innerHTML = '';
            },1500)
        }else{
            let showMessage = `<h3 style="color:red;">Book With ${parseInt(event.target[0].value)} already stored in Library.<br>Please Add New</h3>`;
            interface.innerHTML = showMessage;
            setTimeout(()=>{
                interface.innerHTML = '';
                openAddBook();
            },1500)
        }
        
    });
}
//End --> function to handle with opening adding booklist
 


// Start --> function to handle Showing Booklists in UI
function handleShowBookList(){
    let sortNameBooks = books.map((val)=>{
        return val;
    });
    sortName(sortNameBooks)
    handleShowList(sortNameBooks,"BookList");   
    // console.log("Book")
}
// End --> function to handle Showing Booklists in UI



// Start --> function to handle Showing Deleted Booklists in UI
function handleShowDeletedBookList(){
    handleShowList(deleted_books,"Deleted BookList");   
}
// End --> function to handle Showing Deleted Booklists in UI










//Start --> function to handle show data
function handleShowList(data,heading){
    const interface = document.getElementById("interface");
    // changing ui interface to table
    interface.innerHTML= `<h3 style="text-align:center;">${heading}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>BookID</th>
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
        // looping over booklist
        data.map((val,key)=>{
            let tr = ` <tr>
                            <td>${val.bookId}</td>
                            <td>${val.bookName}</td>
                            <td>${val.bookAuthor}</td>
                            <td>${val.price}</td>
                            <td>${val.desc}</td>
                            <td>${val.genre}</td>
                        </tr>`;
        // adding all book in ui
        tbody.innerHTML += tr;
        })
    }else{
        // in case no book in list
        let tr = ` <tr>
                        <td colspan="6">No Data</td>
                    </tr>`
        tbody.innerHTML = tr;
    }
}
//End --> function to handle show data





// Start --> function to open Edit Option In UI
function openEditOption(){
    const interface = document.getElementById("interface");
    interface.innerHTML = `<h3>Edit a Book</h3>
    <form id="getEditBookIdForm">
        <label>Enter the ID of Book You Want to Edit</label>
        <input type="text" name="edit_bookId" id="edit_bookId" required style="margin-left: 50px;">
        <button type="submit">Edit</button>
    </form>
    <table>
        <thead>
            <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Edit</th>
            </tr>
        </thead>
        <tbody id="e-tbody">
        </tbody>
    </table>`;
    let tbody = document.getElementById('e-tbody');
    if(books.length !== 0){
        // looping over booklist
        books.map((val,key)=>{
            let tr = ` <tr>
                            <td>${val.bookId}</td>
                            <td>${val.bookName}</td>
                            <td><button onclick="handleEditButton(${val.bookId})">Edit</button></td>
                        </tr>`;
        // adding all book in ui
        tbody.innerHTML += tr;
        })
    }else{
        // in case no book in list
        let tr = ` <tr>
                        <td colspan="3">No Data</td>
                    </tr>`
        tbody.innerHTML = tr;
    }


     // adding event listener getting edit a bookid
     document.getElementById("getEditBookIdForm").addEventListener("submit", function(event){
        event.preventDefault();
        handleEditButton(event.target[0].value)
    });

}
// End --> function to open Edit Option In UI


// Start --> function to Handle Search
function openSearchOption(){
    const interface = document.getElementById("interface");
    interface.innerHTML = `<h3>Edit a Book</h3>
    <form id="getSearchBookIdForm">
        <label>Enter the ID of Book You Want to Search</label>
        <input type="text" name="search_bookId" id="search_bookId" required style="margin-left: 50px;">
        <button type="submit">Search</button>
    </form>`

     // adding event listener getting edit a bookid
     document.getElementById("getSearchBookIdForm").addEventListener("submit", function(event){
        event.preventDefault();
        let index = getIdOfBookID(parseInt(event.target[0].value));
        if(index!==undefined){
            let search = [];
            search.push(books[index]);
            handleShowList(search,"Searched Book");   

        }else{
            interface.innerHTML = `<h3 style="color:red;">Book With ${parseInt(event.target[0].value)} not Found in Library</h3>`;
            setTimeout(()=>{
                interface.innerHTML = '';
                openSearchOption();
            },1000)
        }
    });
}
// End --> function to Handle Search



// Start --> function to show Edit Form and Handle It
function handleEditButton(bookId){
    const interface = document.getElementById("interface");
    bookId = parseInt(bookId)         //parsing bookId to int
    
    let index;
    books.map((val,id)=>{               //getting index of bookid
        if(val.bookId === bookId){
            index = id;
        }
    })

    if(index !== undefined){                //if index found
        let book = books[index];
        let editForm = ` <h2>Edit Book</h2>
                            <form id="editFormSubmit">
                                <div>
                                    <label>Book ID : </label>
                                    <input type="number" name="bookId" id="add_bookId" value="${book.bookId}" readonly required/>
                                </div>
                                <div>
                                    <label>Book Name : </label>
                                    <input type="text" name="bookName" id="add_bookName" value="${book.bookName}" required/>
                                </div>
                                <div>
                                    <label>Book Author : </label>
                                    <input type="text" name="bookAuthor" id="add_bookAuthor" value="${book.bookAuthor}" required/>
                                </div>
                                <div>
                                    <label>Book Price : </label>
                                    <input type="number" name="book_price" id="add_book_price" value="${book.price}" required/>
                                </div>
                                <div>
                                    <label>Book Description: </label>
                                    <textarea name="book_desc" id="add_book_desc" required>${book.desc}</textarea>
                                </div>
                                <div>
                                    <label>Genre</label>
                                    <select name="book_genre" id="add_book_genre">
                                        <option value="${book.genre}" selected disabled hidden>${book.genre}</option>
                                        <option value="Self-help">Self-help</option>
                                        <option value="Personal-finance">Personal-finance</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label></label>
                                    <button>Edit Book</button>
                                </div>  
                            </form>`
        interface.innerHTML = editForm;             //add dynamic form to UI


        // handling edit form on submit
        document.getElementById("editFormSubmit").addEventListener("submit", function(event){
            event.preventDefault();
            let editObj = {
                bookId : parseInt(event.target[0].value),
                bookName : event.target[1].value,
                bookAuthor : event.target[2].value,
                price : event.target[3].value,
                desc : event.target[4].value,
                genre : event.target[5].value
            }
            editBook(bookId,editObj);
            interface.innerHTML = "<h3>Book Edit Successfully</h3>";
            setTimeout(()=>{
                interface.innerHTML = '';
                openEditOption();
            },1000)
        });

    }else{                      //if index not found of bookId
        let showMessage = `<h3 style="color:red;">Book With ${bookId} not Found in Library</h3>`;
        interface.innerHTML = showMessage;
        setTimeout(()=>{
            interface.innerHTML = '';
            openEditOption();
        },1000)
    }
}
// End --> function to show Edit Form and Handle It





// Start --> function to Show Deleting Option
function showDeleteOpts(){
    const interface = document.getElementById("interface");
    interface.innerHTML = `<h3>Delete a Book</h3>
    <form id="getDeleteBookIdForm">
        <label>Enter the ID of Book You Want to Delete</label>
        <input type="text" name="edit_bookId" id="edit_bookId" required style="margin-left: 50px;">
        <button type="submit">Delete</button>
    </form>
    <table>
        <thead>
            <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="d-tbody">
        </tbody>
    </table>`
    let tbody = document.getElementById('d-tbody');
    if(books.length !== 0){
        // looping over booklist
        books.map((val,key)=>{
            let tr = ` <tr>
                            <td>${val.bookId}</td>
                            <td>${val.bookName}</td>
                            <td><button onclick="handleDeleteButton(${val.bookId})">Delete</button></td>
                        </tr>`;
        // adding all book in ui
        tbody.innerHTML += tr;
        })
    }else{
        // in case no book in list
        let tr = ` <tr>
                        <td colspan="3">No Data</td>
                    </tr>`
        tbody.innerHTML = tr;
    }


     // adding event listener getting delete a bookid
     document.getElementById("getDeleteBookIdForm").addEventListener("submit", function(event){
        event.preventDefault();
        handleDeleteButton(event.target[0].value)
    });
}
// End --> function to Show Deleting Option



// Start --> Function to handle Delete Functionality from UI
function handleDeleteButton(bookId){
    const interface = document.getElementById("interface");
    bookId = parseInt(bookId);
    let index;
    books.map((val,id)=>{
        if(val.bookId === bookId){
            index = id;
        }
    });
    if(index!==undefined){
        deleteBook(bookId);
        let showMessage = `<h3 style="color:blue;">Book With ${bookId} Successfully Deleted</h3>`;
        interface.innerHTML = showMessage;
        setTimeout(()=>{
            interface.innerHTML = '';
            showDeleteOpts()
        },1500) 
    }else{
        let showMessage = `<h3 style="color:red;">Book With ${bookId} not Found in Library</h3>`;
        interface.innerHTML = showMessage;
        setTimeout(()=>{
            interface.innerHTML = '';
            showDeleteOpts()
        },1000) 
    }
}
// End --> Function to handle Delete Functionality from UI



// Start --> Function to Show Query In UI
function showQuery(){
    const interface = document.getElementById("interface");
    let html = ` <div style="text-align:center;">
                    <button onclick="handleTop5Book()">Top 5 Most Expensive Books</button>
                    <button onclick="handleNumberOfBookInEachGenre()">Number of books in each Genre</button>
                </div>`
    interface.innerHTML = html;

}

// function to handel top5 price books in library
function handleTop5Book(){
    const interface = document.getElementById("interface");
    let copyOfBooks = books.map((val)=>{
        return val;
    });
    let top5 =  top5MostExpensive(copyOfBooks);
    handleShowList(top5,`Top 5 Most Expensive Books <button style="float:right;" onclick="handleNumberOfBookInEachGenre()">Number of books in each Genre</button>`);      
}

// function to handle genre in each 
function handleNumberOfBookInEachGenre(){
    const interface = document.getElementById("interface");
    const genreCount = handleGenreCount();
     let genreHtml = `<div>
                        <h3>Number of Book in Each Genre <button style="float:right;" onclick="handleTop5Book()">Top 5 Most Expensive Books</button> </h3>
                        <div id="genreShow">
                            
                        </div>    
                      </div>`
    interface.innerHTML = genreHtml;
    let genreShow = document.getElementById("genreShow");
    let size = Object.keys(genreCount).length;
    if(size !== 0){
        for(key in genreCount){
            let genreHTMLdata = `<p><b>${key}:</b> ${genreCount[key]}</p>`;
            genreShow.innerHTML += genreHTMLdata;
        }
    }else{
        let genreHTMLdata = `<p><b>Self-help:</b> 0</p>
        <p><b>Personal-finance:</b> 0</p>
        <p><b>Business:</b> 0</p>`
        genreShow.innerHTML = genreHTMLdata;
    }
}
// End --> Function to Show Query In UI
 
// function to get index of bookid
function getIdOfBookID(bookId){
     // getting index of bookId if available
     let index;
     books.map((val,id)=>{
         if(val.bookId === bookId){
             index = id;
         }
     })
     return index;
}



// For running on terminal
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

//usage inside async function
(async () => {
  try{
   
    let run;
    do{
      if(run==1){       //adding new book
        let bookName = await prompt("Enter Book Name :   ");
        let bookAuthor = await prompt("Enter Book Author :   ");
        let bookId = await prompt("Enter Book ID :   ");
        let price = await prompt("Enter Book Price :   ");
        let desc = await prompt("Enter Book Description :   ");
        let genre = await prompt("Enter Book Genre :   ");
        addBook(bookName,bookAuthor,price,bookId,desc,genre);
      }
      if(run==2){       //editing book according to id
        let bookId = await prompt("Enter Book ID :   ");
         // getting index of bookId if available
        let index = getIdOfBookID(bookId);
        if(index !== undefined){
            let book = books[index];


            let bookName = await prompt(`Your Book Name ${book.bookName} New Book Name: `);
            let bookAuthor = await prompt(`You Book Author ${book.bookAuthor} New Book Author:`);
            let price = await prompt(`You Book Price ${book.price}  New Book Price: `);
            let desc = await prompt(`You Book Description ${book.desc} New Book Description: `);
            let genre = await prompt(`You Book Genre ${book.genre} New Book Genre: `);
            
            let editObj = {
                bookName,bookAuthor,price,desc,genre
            }
            editBook(bookId,editObj);
        }else{
            console.log(`Book with Book Id ${bookId} is not is Library`);
        }
      }
      if(run==3){       //list book
        listBooks();
      }
      if(run==4){           //search book
        let bookId = await prompt("Enter Book ID to Search:   ");
        let index = getIdOfBookID(bookId);
        if(index !== undefined){
            console.log("Searched Book",books[index]);
        }else{
            console.warn(`Book with Book Id ${bookId} is not is Library`);
        }
      }             
      if(run==5){                   //delete book according to id
        let bookId = await prompt("Enter Book ID to Delete:   ");
        deleteBook(bookId);
      }
      if(run==6){                   //deleted booklist
        deletedListBook()
      }
      if(run==7){                   //for query
        if(books.length === 0){
            console.warn("There is no book in Library. Please add few books to perform Query!")
        }else{
            let q = await prompt("Predetermined Queries:\n1. Get the top 5 most expensive books that are present in the library.\n2. Number of books in each Genre.\nEnter Option 1 or 2 or 0 for Exit");
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
      }
      console.log("Perform Operation")
      console.log("1. Add a new book.");
      console.log("2. Edit the details of a particular book.")
      console.log("3. List all the books that are available in the system.")
      console.log("4. Search for a book.")
      console.log("5. Delete a Particular book.")
      console.log("6. List all the books that are deleted.")
      console.log("7. Query the books.")
      console.log("Press 0 to Exit ")
      run = await prompt("Select Option in 0,1,2...,7 = ")
    }while(run!='0')
    rl.close()
  }catch(e){
    console.error("unable to prompt",e)
}
})()
   
//when done reading prompt exit program 
rl.on('close', () => process.exit(0))
