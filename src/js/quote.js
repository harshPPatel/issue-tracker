/**
 * @typedef {Object} Quote
 * @property {String} quote - The quote
 * @property {String} author - The author of the quote
 */

/**
 * @function getRandomQuote
 * @description It gets data (all quotes fetched from quotes.json) and chooses the
 * random quote and create randomQuote Object and returns it.
 * @param {Array} data Array of issues fetched from quote.json
 * @returns {Quote} The random quote
 */
export const getRandomQuote = data => {
  // Generating random number
  const randomNumber = Math.floor(Math.random() * data[0].quotes.length);
  // Fetching quote's data
  const quote = data[0].quotes[randomNumber].quote;
  const author = data[0].quotes[randomNumber].author;
  // Creating randomQuote object
  const randomQuote = {
    quote,
    author,
  };
  // Returning the randomQuote
  return randomQuote;
};

/**
 * @function showQuote
 * @description It gets quote object and sets properties' values to the quote elements.
 * @param {HTMLElement} input Input HTML Element
 */
export const showQuote = ({ quote, author }) => {
  // Showing quote
  document.getElementById('--js-random-quote').innerHTML = quote;
  // Showing quote author
  document.getElementById('--js-random-quote-author').innerHTML = `- ${author}`;
};
