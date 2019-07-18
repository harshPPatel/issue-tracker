import { EMPLOYEES, ISSUE_STATUS } from './constants';
import { getIssues, getJSONIssues, setIssues } from './data';
import showOutput from './output';

// Chance JS
const Chance = require('chance').Chance();

// Variables
const issueDescriptionInput = document.getElementById('issueDescriptionInput');
const issueSeverityInput = document.getElementById('issueSeverityInput');
const issueAssignedToInput = document.getElementById('issueAssignedToInput');
const issueSortInput = document.getElementById('sortIssueList');

// Removing invalid class from issueDescriptionInput
if (issueDescriptionInput) {
  issueDescriptionInput.addEventListener('click', () => {
    issueDescriptionInput.classList.remove('invalid');
  });
}

/**
 * @function autoAssign
 * @description autoAssign function is called to assign any issue with
 * pre-defined employees. If user does not provide assignedTo property,
 * call this function to get employee name automatically.
 * @returns {string} employee name
 */
const autoAssign = () => {
  // generating random number
  const randomNumber = Math.floor(Math.random() * EMPLOYEES.length);
  // Returning random employee name
  return EMPLOYEES[randomNumber];
};

/**
 * @typedef {Object} Issue
 * @property {string} id - Unique ID of the issue.
 * @property {string} description - The description of the issue.
 * @property {string} severity - The severity level of the issue.
 * @property {string} assignedTo - The name of the employee to whom teh issue is assigned to.
 * @property {string} status - The status of the issue.
 */

/**
 * @function createIssue
 * @description Creates and returns and issue object with all properties set.
 * It created unique id using Chance.js and values from user inputs. If
 * user does not provide any assignedTo field, it calls autoAssign method
 * to get employee name.
 * @returns {Issue} New created issue object.
 */
const createIssue = () => {
  // getting issueAssigned value
  const issueAssigned =
    issueAssignedToInput.value === ''
      ? autoAssign()
      : issueAssignedToInput.value;

  // Creating issue object
  const issue = {
    id: Chance.guid(),
    description: issueDescriptionInput.value,
    severity: issueSeverityInput.value,
    assignedTo: issueAssigned,
    status: ISSUE_STATUS.OPEN,
  };

  // Returning issue
  return issue;
};

/**
 * @function resetForm
 * @description Checks if the container is open and changes container style.
 * If the container is open, it change its display style to none, and
 * if the container is closed, then changes display style to flex.
 */
const resetForm = () => {
  issueDescriptionInput.value = '';
  issueAssignedToInput.value = '';
  issueSeverityInput.value = 'low';
};

/**
 * @function addIssue
 * @description Checks if the user has provided the issue description or not.
 * If user did not, then it adds 'invalid' class to the issueDescriptionInput.
 * If user did provided the information, it created new issue object. It
 * checks if any issues does exists on localStorage or not. If they do exists,
 * it adds new issue to it; otherwise it creates new issues array and set it
 * to the localstorage.
 */
const addIssue = () => {
  // Validating User input
  if (issueDescriptionInput.value === '') {
    // Adding 'invalid' class
    issueDescriptionInput.classList.add('invalid');
    return;
  }

  // Creating issue
  const issue = createIssue();

  // Issues array
  let issues = [];

  // Checking if issues exists on localStorage or not
  if (getIssues()) {
    // Getting issues from localStorage
    issues = getJSONIssues();
  }

  // pushing new issue to the issues array
  issues.push(issue);
  // Setting issues to the localStorage
  setIssues(issues);
  // Resetting the form
  resetForm();
  // Showing the output
  showOutput(issueSortInput);
};

// Exporting addIssue as default
export default addIssue;
