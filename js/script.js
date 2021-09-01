const errorDiv = document.getElementById('error');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;

}


const toggleSearchResult = displayStyle => {
    document.getElementById('books').style.display = displayStyle;

}


const searchBook = () => {

    errorDiv.innerText = '';
    document.getElementById('books').textContent = '';
    const searchText = document.getElementById('search-field').value;
    if (searchText === '') {
        errorDiv.innerText = 'Search field cannot be empty,Try Again!';
        return;

    }

    // display spinner 

    toggleSpinner('block');
    toggleSearchResult('none');

    loadBooks(searchText);
    document.getElementById('search-field').value = '';


}



const loadBooks = (searchText) => {


    const url = ` https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));

}


const displayBooks = (books) => {
    console.log(books);
    console.log(books.length);
    const booksFound = books.length;

    if (books.length === 0) {
        errorDiv.innerText = 'No result found';

    }

    else {
        errorDiv.innerText = booksFound + ' books are found';
    }
    const container = document.getElementById('books');
    container.textContent = '';



    books?.forEach(book => {
        // console.log(book);
        const imageUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
        const div = document.createElement('div');
        div.innerHTML = `
            <h1>Title: ${book.title}</h1>
            <h1>Author: ${book.author_name}</h1>
            <h1>Publisher: ${book.publisher}</h1>
          
            <h1>First Publish Year: ${book.first_publish_year ? book.first_publish_year : ''}</h1>
            <img class="img-fluid" src="${imageUrl}">

          
        
        `;

        container.appendChild(div);


    });

    toggleSpinner('none');
    toggleSearchResult('block');

}


