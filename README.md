# Libray Management System using JavaScripts Console

## Hosted UrL
Open [https://gauravdiscoverdollar.github.io/LMS](https://gauravdiscoverdollar.github.io/LMS) to view it in your browser.


### Task Performed

<b>`1. Add a new book to existing list of books.`</b>
```
addBook("Managing Oneself","Peter Drucker",250,112,"Originally published: 7 January 2008","Self-help")
addBook("The Miracle Morning","Hal Elrod",175,102,"Originally published: 7 December 2012","Self-help")
addBook("Rich Dad Poor Dad","Robert Kiyosaki",195,119,"Originally published: 1997","Personal-finance")
addBook("The Power of Habit","Charles Duhigg",359,116,"Originally published: 28 February 2012","Self-help")
addBook("Start with Why","Simon Sinek",290,105,"Originally published: 2009","Business")
addBook("The Psychology of Money","Morgan Housel",172,117,"Originally published: 8 September 2020","Personal-finance")
addBook("How to Stop Worrying and Start Living","Dale Carnegie",149,107,"Originally published: 1948","Self-help")
```

<b>`2. Edit the details of a particular book.`</b>
``` 
editBook(107,{"book_name": "How To Stop Worrying","genre":"Buisness"})
```
``` 
editBook(119,{"price":500,"book_author":"Robert"})
```
``` 
editBook(112,{"genre": "Personal-finance"})
```

<b>`3. List all the books that are available in the system`</b>
```
listBooks()
```
<b>`4. Search for a book`</b>
```
searchBook(book_id)
```
<b>`5. Delete a Particular book`</b>
```
deleteBook(book_id)
```
<b>`6. List all the books that are deleted. `</b>
```
deletedListBook()
```
<b>`7. Query the books.`</b>
```
query() 
```
`It will provide two predetermined queries`
