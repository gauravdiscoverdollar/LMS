
let books = [];
let deleted_books = [];

function addBook(book_name,book_author,price,book_id,desc,genre){
    if(book_name && book_author && price && book_id && desc && genre){
        let book = {
            book_name,book_author,price,book_id,desc,genre
        }

        let check = books.filter((val,id)=>{
            return val.book_id === book_id;
        })

        if(check.length === 0){
            books.push(book);
            console.log("Book is Added Successfully")
        }else{
            console.error("Warning!! --> Book is Already Added")
        }
    }else{
        console.error("Inappropriate Data");
        console.log("Please Enter Data in Manner with Data- \n 'this.addBook(book_name,book_author,price,book_id,desc,genre)' ")
    }

}


