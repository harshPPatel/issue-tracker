import { fetchQuotes } from './data';
import { getRandomQuote, showQuote } from './quote';
import addIssue from './issue';
import showIssues from './output';

// Issue Submit Button
const issueSubmitButton = document.getElementById('issueSubmit');

// Setting window's onload function
window.onload = async () => {
  if (document.body.id === 'index') {
    // Getting random quote
    const randomQuote = await fetchQuotes()
      .then(quotes => getRandomQuote(quotes))
      .catch(err => console.log(err));
    // Showing the quote
    showQuote(randomQuote);

    // Adding onclick event listener to issueSubmitButton
    issueSubmitButton.addEventListener('click', e => {
      // Preventing default behaviour
      e.preventDefault();
      addIssue();
    });
  } else {
    // Showing the issues on print page
    showIssues();
  }
};
