# Bookeria
Questo documento fornisce una panoramica del sito web **Bookeria** che utilizza le API di OpenLibrary per recuperare informazioni sui libri e farle visualizzare agli utenti. Il sito consente agli utenti di cercare libri indicando il genere e di visualizzare il titolo, l'autore e la descrizione.

## Funzionalità Principali

- **Ricerca Libri per Genere**: Gli utenti possono scrivere un genere nella textbox e visualizzare i libri corrispondenti.
- **Visualizzazione Titolo e Autori**: Ogni libro mostra il suo titolo e gli autori associati.
- **Visualizzazione Descrizione**: È disponibile un pulsante "Show Description" per ogni libro che permette agli utenti di visualizzare una descrizione del libro selezionato.
- **Gestione degli Apostrofi**: Il sito gestisce correttamente gli apostrofi nei titoli dei libri per evitare errori di formattazione.
- **Indicatore di Caricamento**: È stato aggiunto un indicatore visivo per mostrare quando la ricerca dei libri è in corso.


## Utilizzo delle Funzioni

- `searchBooks(event)`: Questa funzione viene attivata quando un utente seleziona un genere dalla lista. Utilizza l'API di OpenLibrary per recuperare i libri corrispondenti al genere scelto e li visualizza.
- `addBackslashBeforeApostrophe(array)` e `there_is_apostrophe(array)`: Queste funzioni gestiscono gli apostrofi nei titoli dei libri per evitare errori di formattazione.
- `showDescription(bookKey, authorName)`: Viene chiamata quando un utente clicca sul pulsante "Show Description". Utilizza l'API di OpenLibrary per ottenere e visualizzare la descrizione del libro selezionato.
- `closeDescription(bookKey, title, author)`: Viene chiamata quando un utente chiude la descrizione di un libro. Pulisce il contenuto precedente e ripristina il titolo e il pulsante "Show Description".

# 🚀 Come eseguirlo

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