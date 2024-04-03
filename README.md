# Bookeria
Questo documento fornisce una panoramica del sito web **Bookeria** che utilizza le API di OpenLibrary per recuperare informazioni sui libri e farle visualizzare agli utenti. Il sito consente agli utenti di cercare libri indicando il genere e di visualizzare il titolo, l'autore e la descrizione.

##  Funzionalità

- **Ricerca Libri**: Gli utenti possono cercare libri inserendo una categoria nella casella di testo.
- **Visualizzazione Elenco Libri**: Il sito web mostra un elenco di libri nella categoria specificata, inclusi gli autori e i titoli dei libri.
- **Visualizzazione Descrizione Libro**: Gli utenti possono fare clic su un pulsante per visualizzare la descrizione di un libro.
- **Chiusura Descrizione**: Gli utenti possono chiudere la descrizione del libro facendo clic su un pulsante.
- **Indicatore di Caricamento**: È stato aggiunto un indicatore visivo per mostrare quando la ricerca dei libri è in corso.

## Tecnologie Utilizzate

- HTML, CSS e Bootstrap per il layout e lo stile del sito web.
- JavaScript per la funzionalità del sito web.
- Webpack per il bundling dei moduli JavaScript.
- Libreria Lodash per le funzioni di utilità.
- API OpenLibrary per accedere ai dati dei libri.

## ⚠️ Gestione degli Errori

- **Errore NoBooksFound**: Se non vengono trovati libri per la categoria specificata, viene visualizzato un messaggio di errore.
- **Errori Fetch**: Vengono visualizzati messaggi di errore se ci sono problemi nel recupero dei dati dei libri o delle descrizioni.

## 🗒️ Note

- Il sito web utilizza Webpack per il bundling dei moduli per gestire le dipendenze e migliorare le prestazioni.
- La gestione degli errori è implementata per fornire feedback agli utenti in caso di problemi.
- Il layout del sito web è stato progettato per essere user-friendly e responsive.

## 🚀 Come eseguirlo

Per buildare il progetto

```
npm run build:prod

```

Per avviarlo

```
npm run serve

```
## Link online
https://main--book-eria.netlify.app/

## Contatti

Per domande, suggerimenti o segnalazioni di bug, non esitare a contattarmi all'indirizzo email [danieliozia.di@gmail.com](mailto:danieliozia.di@gmail.com).