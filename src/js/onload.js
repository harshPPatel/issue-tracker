import { fetchQuotes } from './data';
import { getRandomQuote, showQuote } from './quote';
import addIssue from './issue';
import showIssues from './output';

const issueSubmitButton = document.getElementById('issueSubmit');

window.onload = async () => {
  if (document.body.id === 'index') {
    const randomQuote = await fetchQuotes()
      .then(quotes => getRandomQuote(quotes))
      .catch(err => console.log(err));
    showQuote(randomQuote);

    issueSubmitButton.addEventListener('click', e => {
      e.preventDefault();
      addIssue();
    });
  } else {
    showIssues();
  }
};
