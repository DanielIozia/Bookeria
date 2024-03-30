import "../../assets/scss/main.css"
import _ from 'lodash';

class NoBooksFound extends Error{
    constructor(message) {
        super(message);
        this.name = 'NoBooksFound';
    }
}


const apiSearch = process.env.SEARCH
const apiDescpription = process.env.DESCRIPTION

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
    console.log()
    event.preventDefault();

    // Rimuovi il messaggio di errore precedente
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = '';

    //Mostra lo spinner di caricamento
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    //Tutto piccolo per non creare ambiguità nella ricerca
    const genere = document.getElementById('genere').value.toLowerCase(); 

    fetch(apiSearch+`${genere}.json`)
        .then(response => response.json())
        .then(data => {
            //Nascondo lo spinner di caricamento  
            loadingSpinner.style.display = 'none';
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = ''; // Pulizia del contenuto precedente
            data.works.forEach(book => {
                const title = _.get(book, 'title', 'Title not available');
                const authors = _.get(book, 'authors', []).map(author => _.get(author, 'name')).join(', ') || 'Author not available';
                const bookElement = document.createElement('div');
                bookElement.classList.add('col');
                bookElement.innerHTML = `
                    <div class="card shadow-sm mt-2 mb-2" data-book-key="${_.get(book, 'key', '')}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">Authors: ${authors}</p>
                            <button class="btn btn-primary" onclick="showDescription('${_.get(book, 'key', '')}', '${authors}')">Show Description</button>
                        </div>
                    </div>
                `;
                booksList.appendChild(bookElement);
            });
            if (data.works.length === 0) {
                throw new NoBooksFound('No books found');
            }
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            loadingSpinner.style.display = 'none';
            booksList.innerHTML = '';
            errorMessage.innerHTML = "No books found.<br>Please try a different search term.";
        });
}


function showDescription(bookKey, authorName) {
    fetch(apiDescpription+`${bookKey}.json`)
        .then(response => response.json())
        .then(data => {
            let title = data.title ? data.title : 'Title not available';

            let description = _.get(data, 'description', 'Description not available');

            // Verifica se la descrizione non è disponibile o se ha un campo 'value'
            if (description !== 'Description not available' && _.get(description, 'value')) {
                description = _.get(description, 'value');
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


window.searchBooks = searchBooks
window.NoBooksFound = NoBooksFound
window.showDescription = showDescription
window.closeDescription = closeDescription