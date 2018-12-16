const JSON_SOURCE   =   'assets/json/quote.json';
const quoteElement  =   document.getElementById('--js-random-quote');
const authorElement =   document.getElementById('--js-random-quote-author');
var randomQuoteData;

// fetching Quote JSOn Data from the server
function fetchJSONData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      randomQuoteData = JSON.parse(xhttp.response);
    }
  };
  xhttp.open("GET", JSON_SOURCE, true);
  xhttp.send();
}

// getting random quote
function getRandomQuote() {
  var randomNumber = Math.floor( Math.random() * randomQuoteData[0].quotes.length );
  var quote = randomQuoteData[0].quotes[randomNumber].quote;
  var author = randomQuoteData[0].quotes[randomNumber].author;
  quoteElement.innerHTML = quote;
  authorElement.innerHTML = '- ' + author;
}

// running functions onload
window.onload = function() {
  fetchJSONData();
  setTimeout(getRandomQuote, 10);
}