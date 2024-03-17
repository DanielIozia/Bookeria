class NoBooksFound extends Error{
    constructor(message) {
        super(message);
        this.name = 'NoBooksFound';
    }
}


document.getElementById('loadingSpinner').style.display = 'none';

//controllo se il titolo ha apostrofi
function there_is_apostrophe(array){

    for(let k of array){
        if(k == "'"){
            return true;
        }
    }
    return false;
}

function searchBooks(event) {
    event.preventDefault();
    
    // Rimuovi il messaggio di errore precedente
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = '';

    // Nascondi lo spinner di caricamento
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    const genere = document.getElementById('genere').value.toLowerCase(); 
    fetch(`https://openlibrary.org/subjects/${genere}.json`)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            const book = data.works;
            if (book.length === 0) {
                throw new NoBooksFound('No books found');
            }
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = ''; // Pulizia del contenuto precedente
            book.forEach(book => {
                const title = book.title ? book.title : 'Title not available';
                const authors = book.authors ? book.authors.map(author => author.name).join(', ') : 'Author not available';
                const bookElement = document.createElement('div');
                bookElement.classList.add('col');
                bookElement.innerHTML = `
                <div class="card shadow-sm mt-2 mb-2" data-book-key="${book.key}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Authors: ${authors}</p>
                        <button class="btn btn-primary" onclick="showDescription('${book.key}', '${authors}')">Show Description</button>
                    </div>
                </div>
            `;
            booksList.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            loadingSpinner.style.display = 'none';
            booksList.innerHTML = '';
            errorMessage.textContent = "No books found. Please try a different search term.";
        });
}


function showDescription(bookKey, authorName) {
    fetch(`https://openlibrary.org${bookKey}.json`)
        .then(response => response.json())
        .then(data => {
            let title = data.title ? data.title : 'Title not available';

            //alcuni sono oggetti, mentre altri no
            let description = (data?.description) ?  data.description : "Description not available";
            if(description != "Description not available" && description?.value){
                description = description.value
            }

            const cardBody = document.querySelector(`[data-book-key="${bookKey}"] .card-body`);
            
            //metto il "\" per evitare che ci siano errori (si chiudono le virgolette)
            if (there_is_apostrophe(title)) {
                title = title.replace(/'/g, "\\'"); // Sostituisco gli apostrofi con il backslash
            }

            cardBody.innerHTML = `
                <h5 class="card-title text-center">${title.replace("\\'", "'")}</h5>
                <p class="card-text">${description}</p>
                <button type="button" class="btn-close" aria-label="Close" onclick="closeDescription('${bookKey}','${title}','${authorName}')"></button>
            `;
        })
        .catch(error => console.error('Error fetching book description:', error));
}

function closeDescription(bookKey, title, author) {
    const cardBody = document.querySelector(`[data-book-key="${bookKey}"] .card-body`);
    cardBody.innerHTML = ''; // Puliamo il contenuto precedente
    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;
    const authorsElement = document.createElement('p');
    authorsElement.classList.add('card-text');
    authorsElement.textContent = 'Author: ' + author;
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-primary');
    buttonElement.textContent = 'Show Description';
    buttonElement.addEventListener('click', function() {
        showDescription(bookKey,author);
    });
    cardBody.appendChild(titleElement);
    cardBody.appendChild(authorsElement);
    cardBody.appendChild(buttonElement);
}

