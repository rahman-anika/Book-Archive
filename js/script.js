const errorDiv = document.getElementById('error');


// spinner 

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;

}


const toggleSearchResult = displayStyle => {
    document.getElementById('books-search-result').style.display = displayStyle;

}


// searchBook

const searchBook = () => {

    // handle error text and search result 

    errorDiv.innerText = '';
    document.getElementById('books-search-result').textContent = '';
    const searchText = document.getElementById('search-field').value;

    // handle empty search field 

    if (searchText === '') {
        errorDiv.innerText = 'Search field cannot be empty,Try Again!';
        return;

    }

    else {
        loadBooks(searchText);
    }

    // display spinner 

    toggleSpinner('block');
    toggleSearchResult('none');

    // loading books 

    //blank the search field

    document.getElementById('search-field').value = '';


}



// loading books according to search 

const loadBooks = (searchText) => {


    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));

}


// displaying the search result 

const displayBooks = (books) => {
    console.log(books);


    const booksContainer = document.getElementById('books-search-result');
    booksContainer.textContent = '';


    // console.log(books.length);

    // how many books are found as per search 

    const booksFound = books.length;

    // handle error message 

    if (books.length === 0) {
        errorDiv.innerText = 'No result found';

    }

    else {
        errorDiv.innerText = booksFound + ' books are found';
    }






    // displaying book properties 

    books?.forEach(book => {
        // console.log(book);
        const imageUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
        const div = document.createElement('div');
        div.classList.add('col');




        div.innerHTML = `

        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
           
            <div class="card-body">

                <h3 class="card-title">Title: ${book.title}</h3>
                <h5 class="card-text">Author: ${book.author_name ? book.author_name : 'unknown'}</h5>
                <h5 class="card-text">Publisher: ${book.publisher ? book.publisher : 'unknown'}</h5>
                <h5 class="card-text">First Publish Year: ${book.first_publish_year ? book.first_publish_year : ''}</h5>
           
            </div>
        </div>


        `;

        booksContainer.appendChild(div);


    });


    // handle spinner 

    toggleSpinner('none');
    toggleSearchResult('block');

}


