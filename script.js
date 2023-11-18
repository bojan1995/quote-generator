const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// showing loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unkkown
    if(!quote.author){
        authorText.textContent = 'Unknown';

    } else 
    {
        authorText.textContent = quote.author;
    }
    //check the quote lenghe to determinate styleing
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');

    } else {
        quoteText.classList.remove('long-quote');

    }
   // set quote , hide loader


   quoteText.textContent = quote.text;
   
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Tweet quote function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();
