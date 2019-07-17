export const getRandomQuote = data => {
  const randomNumber = Math.floor(Math.random() * data[0].quotes.length);
  const quote = data[0].quotes[randomNumber].quote;
  const author = data[0].quotes[randomNumber].author;
  // console.log(quote);
  // console.log(author);
  const randomQuote = {
    quote,
    author,
  };
  // console.log('quote', randomQuote);

  return randomQuote;
};

export const showQuote = ({ quote, author }) => {
  document.getElementById('--js-random-quote').innerHTML = quote;
  document.getElementById('--js-random-quote-author').innerHTML = `- ${author}`;
};
