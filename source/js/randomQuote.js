var randomQuoteData;
var quoteElement = document.getElementById('--js-random-quote');
var authorElement = document.getElementById('--js-random-quote-author');

function getJSONData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     randomQuoteData = JSON.parse(xhttp.response);
    }
  };
  xhttp.open("GET", 'assets/json/quote.json', true);
  xhttp.send();
}

function getRandomQuote() {
  var randomNumber = Math.floor(Math.random() * randomQuoteData[0].quotes.length);
  var quote = randomQuoteData[0].quotes[randomNumber].quote;
  var author = randomQuoteData[0].quotes[randomNumber].author;

  quoteElement.innerHTML = quote;
  authorElement.innerHTML = '- ' + author;
}

window.onload = function() {
  getJSONData();
  setTimeout(getRandomQuote, 50);
}