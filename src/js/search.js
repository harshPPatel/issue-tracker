import { ISSUE_FIELDS } from './constants';
import { getJSONIssues } from './data';
import modal from './modal';
import { issueCard } from './template';

// Variables
const searchInput = document.getElementById('searchInput');
const searchOptionInput = document.getElementById('searchOptionInput');
const issueOutputElement = document.getElementById('issueListOutput');

/**
 * @typedef {Object} Issue
 * @property {string} id - Unique ID of the issue.
 * @property {string} description - The description of the issue.
 * @property {string} severity - The severity level of the issue.
 * @property {string} assignedTo - The name of the employee to whom teh issue is assigned to.
 * @property {string} status - The status of the issue.
 */

/**
 * @function isIssueExists
 * @description It gets search by option and issue and checks that is issue exists
 * in localStorage.
 * @param {String} option Search Option
 * @param {Issue} issue Issue to with the value will be compared.
 * @returns {Boolean} true if issue's option value and serach value is same; false otherwise
 */
const isIssueExists = (option, issue) => {
  // Checking if option is id
  if (option === ISSUE_FIELDS.ID) {
    // Checking issue's id and search id is same or not
    return issue.id.toUpperCase().includes(searchInput.value.toUpperCase());
  } else {
    // Checking issue's assignedTo and search assignedTo is same or not
    return issue.assignedTo
      .toUpperCase()
      .includes(searchInput.value.toUpperCase());
  }
};

/**
 * @function searchWithOption
 * @description It takes option as parameter. First it checks if issues exists in the
 * localStorage or not. If does not, it opens the modal otherwise shows search result.
 * If no serach result found, it shows 'No Issues Found' message to the screen.
 * @param {String} option opiton
 */
const searchWithOption = option => {
  // Getting all issues from localStorage
  const issues = getJSONIssues();

  // Checking if the issues exists or not
  if (!issues) {
    // Showing modal
    modal();
    // Bluring the searchInput
    searchInput.blur();
    // Clearing the searchInput's value
    searchInput.value = '';
  } else {
    // Clearing issueOutputElement
    issueOutputElement.innerHTML = '';
    // Keeping track if the any issues found or not
    let result = false;
    // Showing searched issues to the screen
    issues.reverse().forEach(issue => {
      if (isIssueExists(option, issue)) {
        issueOutputElement.innerHTML += issueCard(issue);
        result = true;
      }
    });
    // If no issues found, it shows the Message saying 'No Issues Found!'
    if (!result) {
      // Showing the message
      issueOutputElement.innerHTML =
        '<div class="welcome-message"><h3>No Issues Found!</h3></div>';
    }
  }
};

/**
 * @function search
 * @description Chekcing the searchOptionInput's value and shows add this value as
 * parameter to searchWithOption.
 * @param {String} id Id of the issue
 */
const search = () => {
  switch (searchOptionInput.value) {
    // If the serachOptionInput value is 'id'
    case ISSUE_FIELDS.ID:
      // calling searchWithOption and passing 'id' to it
      searchWithOption(ISSUE_FIELDS.ID);
      break;

    // If the serachOptionInput value is 'assignedTo'
    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      // calling searchWithOption and passing 'assignedTo' to it
      searchWithOption(ISSUE_FIELDS.ASSIGNED_TO);
      break;
  }
};

/*
 * Checks if searchInput is exists or not. If it does then adds event lsiteners to
 * searchInput and searchOptionInput.
 */
if (searchInput) {
  // Adding 'input' event listener to the searchInput
  searchInput.addEventListener('input', () => {
    // Adding search method
    search();
  });

  // Adding 'change' event listener to the searchOptionInput
  searchOptionInput.addEventListener('change', () => {
    // Clearing searchInput's value
    searchInput.value = '';
    // Gettinf searchInput in focus
    searchInput.focus();
  });
}
