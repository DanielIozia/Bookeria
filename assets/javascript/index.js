function searchBooks(event) {
    event.preventDefault();
    const genere = document.getElementById('genere').value;
    fetch(`https://openlibrary.org/subjects/${genere}.json`)
        .then(response => response.json())
        .then(data => {
            const books = data.works;
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = ''; // pulisco sempre
            books.forEach(book => {
                const title = book.title;
                const authors = book.authors.map(author => author.name).join(', ');
                const bookElement = document.createElement('div');
                bookElement.classList.add('col');
                bookElement.innerHTML = `
                <div class="card shadow-lg mt-2 mb-2" data-book-key="${book.key}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Authors: ${authors}</p>
                        <button class="btn btn-primary" onclick="showDescription('${book.key}')">Show Description</button>
                    </div>
                </div>
            `;
                booksList.appendChild(bookElement);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

function showDescription(bookKey) {
    fetch(`https://openlibrary.org${bookKey}.json`)
        .then(response => response.json())
        .then(data => {
            const title = data.title || 'Title not available';
            const description = data.description || 'Description not available';
            const cardBody = document.querySelector(`[data-book-key="${bookKey}"] .card-body`);

            cardBody.innerHTML = `
                <h5 class="card-title text-center">${title}</h5>
                <p class="card-text">${description}</p>
                <button type="button" class="btn-close" aria-label="Close" onclick="closeDescription('${bookKey}','${title}')"></button>

                

            `;
        })
        .catch(error => console.error('Error fetching book description:', error));
}


function closeDescription(bookKey, title, authors) {
    const cardBody = document.querySelector(`[data-book-key="${bookKey}"].card-body`);
    cardBody.innerHTML = `
        <h5 class="card-title">${title}</h5>
        <p class="card-text">Authors: ${authors}</p>
        <button class="btn btn-primary" onclick="showDescription('${bookKey}')">Show Description</button>
    `;
}
