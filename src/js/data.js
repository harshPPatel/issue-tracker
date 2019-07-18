// Identifier for localStorage values
const IDENTIFIER = 'issues';

/**
 * @function getJSONIssues
 * @description Returns the array from localStorage containing all issues in JSON Format.
 * @returns {Array} Array of all issues in JSON format
 */
module.exports.getJSONIssues = () => {
  return JSON.parse(localStorage.getItem(IDENTIFIER));
};

/**
 * @function getIssues
 * @description Returns the array from localStorage containing all issues.
 * @returns {Array} Array of all issues
 */
module.exports.getIssues = () => {
  return localStorage.getItem(IDENTIFIER);
};

/**
 * @function setIssues
 * @description Sets the localStorage's issues with given issues array
 * @param {Array} data Array of new issues
 */
module.exports.setIssues = data => {
  // Setting issues to localStorage
  localStorage.setItem('issues', JSON.stringify(data));
};

/**
 * @function fetchQuotes
 * @description Fetches quotes from 'quote.json' file and returns promise to
 * JSON formatted response.
 * @returns {Promise} A Promise to JSON data from 'quote.json' file.
 */
module.exports.fetchQuotes = () => {
  // File URL
  const URL = './json/quote.json';

  // Returning the promise
  return new Promise((resolve, reject) => {
    // Fetching the data
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(json => {
        // Resolving the promise
        resolve(json);
      })
      .catch(err => {
        // Rejecting the promise
        reject(err);
      });
  });
};
