function searchBooks(event) {
    event.preventDefault();
    const genere = document.getElementById('genere').value;
    fetch(`https://openlibrary.org/subjects/${genere}.json`)
        .then(response => response.json())
        .then(data => {
            const book = data.works;
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = ''; // Pulizia della lista dei libri
            book.forEach(book => {
                const title = book.title ? book.title : 'Title not available';
                const authors = book.authors ? book.authors.map(author => author.name).join(', ') : 'Author not available';


                   //IMMAGINE
                let coverId = 'nophoto'; // Impostiamo un valore predefinito per l'ID della copertina
                if (book.cover_id !== undefined) {
                    coverId = book.cover_id; // Se esiste un ID della copertina, lo impostiamo
                }

                const bookElement = document.createElement('div');
                bookElement.classList.add('col');
                bookElement.innerHTML = `
                <div class="card shadow-sm mt-2 mb-2" data-book-key="${book.key}">
                    <!-- Immagine troppo grande, sistemare --> 
                    <!-- <img src="https://covers.openlibrary.org/b/id/${coverId}-S.jpg" width="50" height="500" class="card-img-top grandezza-img" alt="Book cover"> -->
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
        .catch(error => console.error('Error fetching books:', error));
}

function addBackslashBeforeApostrophe(array) {

    let a2 = "";
    for(k of array){
        if(k == "'"){
            console.log("metto il backslash ")
            a2 += "\\'";
        }
        else{
            a2 += k;
        }
    }
    return a2;
}

function there_is_apostrophe(array){

    for(let k of array){
        if(k == "'"){
            return true;
        }
    }
    return false;
}

    
function showDescription(bookKey, authorName) {
    fetch(`https://openlibrary.org${bookKey}.json`)
        .then(response => response.json())
        .then(data => {
            let title = data.title ? data.title : 'Title not available';


            
            //alcuni sono oggetti, mentre altri no (boo)
            //const description = (data.description.value != undefined && data.description.value != null) ? data.description.value : data.description;
            const description = data.description;
            const cardBody = document.querySelector(`[data-book-key="${bookKey}"] .card-body`);

            //metto il "\" per evitare che ci siano errori (si chiudono le virgolette)
            if (there_is_apostrophe(title)) {
                console.log("Titolo prima: ", title);
                title = title.replace(/'/g, "\\'"); // Sostituisce gli apostrofi con il backslash
                console.log("Titolo dopo: ", title);
            }

            cardBody.innerHTML = `
                <h5 class="card-title text-center">${title}</h5>
                <p class="card-text">${description}</p>
                <!-- <p class="card-text">Author: ${authorName}</p> -->
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

