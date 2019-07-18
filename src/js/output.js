import { getJSONIssues, setIssues } from './data';
import {
  issueCard,
  issueTableRow,
  issueTableHeadingRow,
  noIssueMessage,
} from './template';
import SortedArray from './sort';
import { ISSUE_STATUS } from './constants';

// Variables
const issueOutputElement = document.getElementById('issueListOutput');
const issueSortInput = document.getElementById('sortIssueList');
const issueStatusButtons = document.getElementsByClassName('--js-issue-status');
const issueDeleteButtons = document.getElementsByClassName('--js-issue-delete');
const sortByIdInput = document.getElementById('sortIssueListById');
const sortBySeverityInput = document.getElementById('sortIssueListBySeverity');
const sortByAssignedToInput = document.getElementById(
  'sortIssueListByAssigned',
);

/**
 * @function sortedOutput
 * @description it gets the inputElement and passes to SortedArray function to
 * sort the issues according to element's data-by attribute. After sorting issues
 * array, it outputs the issues to the page. If the page's id is 'index' it outputs
 * sorted issues in card format and if the page's id is 'print' it outputs sorted
 * issues in table row format.
 * @param {HTMLElement} input Input HTML Element
 */
const sortedOutput = input => {
  const issues = SortedArray(input);
  issueOutputElement.innerHTML =
    document.body.id === 'print' ? issueTableHeadingRow() : '';
  issues.forEach(issue => {
    issueOutputElement.innerHTML +=
      document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
  });
};

/**
 * @function sortedOutput
 * @description it gets the inputElement and shows the issues to the screen according
 * to the page and sort input values. If there is no issues, then it shows 'No Issue
 * Message' to the screen.
 * @param {HTMLElement} input Input HTML Element
 */
const showIssues = input => {
  // Clearing html element
  issueOutputElement.innerHTML = '';
  // Fetching issues
  const issues = getJSONIssues();
  // Checking if there is no issues
  if (!issues || issues.length === 0) {
    // Showing no Issue Message
    issueOutputElement.innerHTML = noIssueMessage();
  } else if (issueSortInput && issueSortInput.value !== 'hide') {
    // Showing sorted output if issueSortInput exists
    sortedOutput(input);
  } else if (
    sortByIdInput &&
    (sortByIdInput.value !== 'hide' ||
      sortByAssignedToInput.value !== 'hide' ||
      sortBySeverityInput.value !== 'hide')
  ) {
    // Showing sorted output if sortedByInput exists
    sortedOutput(input);
  } else {
    // Adding table head row if the page is 'print'
    issueOutputElement.innerHTML =
      document.body.id === 'print' ? issueTableHeadingRow() : '';
    // If no sort option is given, reversing issues array and showing them to the screen
    issues.reverse().forEach(issue => {
      issueOutputElement.innerHTML +=
        document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
    });
  }

  // Adding Event Listeners to the card links
  addEventListeners();
};

/**
 * @function changeStatus
 * @description It gets id of the issue and changes issue's status. If the status is
 * close, it changes to open and if it is open then changes to close. Then it sets
 * the issues to the locaStorage and refreshes the target element and shows updated
 * issues.
 * @param {String} id Id of the issue
 */
const changeStatus = id => {
  // Getting Issues from localStorage
  const issues = getJSONIssues();
  // Going through all issues
  issues.forEach(issue => {
    // Checking fi the issue's id is the same as parameter's id
    if (issue.id === id) {
      // Changing status property
      issue.status =
        issue.status === ISSUE_STATUS.OPEN
          ? ISSUE_STATUS.CLOSE
          : ISSUE_STATUS.OPEN;
    }
  });
  // Setting issues to the localStorage
  setIssues(issues);
  // Showwing issues to the screen
  showIssues(issueSortInput);
};

/**
 * @function removeIssue
 * @description It gets id of the issue and removes the issue from issues. After
 * removing the issue from the issues, it sets the issues to the localStorage and
 * refreshes the issues to the screen. And if all issues are deleted, changes
 * issueSortInput's value to 'hide'.
 * @param {String} id Id of the issue
 */
const removeIssue = id => {
  // getting issues from localStorage
  const issues = getJSONIssues();
  // Looping through all issues
  issues.forEach((issue, index) => {
    // Checking if the issue's id amtches with parameter id
    if (issue.id === id) {
      // splicing the array by 1 starting by current index of the loop
      issues.splice(index, 1);
    }
  });
  // Setting default sort option when there is no issues
  if (issues.length === 0) {
    issueSortInput.value = 'hide';
  }
  // Setting issues to the localStorage
  setIssues(issues);
  // Showing issues
  showIssues(issueSortInput);
};

/**
 * @function addEventListeners
 * @description Loop through all card status and delete card links and adds click
 * event listeners to them. It prevents default behaviour of the link and adds
 * changeStatus method to the --js-issue-status links and removeIssue method to
 * --js-issue-delete links.
 */
export const addEventListeners = () => {
  // Looping through all --js-issue-status links
  for (let i = 0; i < issueStatusButtons.length; i++) {
    const button = issueStatusButtons[i];
    // Adding event listeners
    button.addEventListener('click', e => {
      // Preventing the default behaviour
      e.preventDefault();
      // Adding changeStauts method and passing link's data-id property
      changeStatus(button.dataset.id);
    });
  }

  // Looping through all --js-issue-delete links
  for (let i = 0; i < issueDeleteButtons.length; i++) {
    const button = issueDeleteButtons[i];
    // Adding event listeners
    button.addEventListener('click', e => {
      // Preventing the default behaviour
      e.preventDefault();
      // Adding removeIssue method and passing link's data-id property
      removeIssue(button.dataset.id);
    });
  }
};

// Checking if issueSortInput exists and then adds 'change' event listener to it
if (issueSortInput) {
  // Adding event listener
  issueSortInput.addEventListener('change', () => {
    // adding showIssues method
    showIssues(issueSortInput);
  });
}

/*
 * Checking if the sortByInput exists and then adds 'change' event listeners to the
 * sortByInput, sortByAssignedToInput and sortBySeverityInput.
 */
if (sortByIdInput) {
  // Adding event listener to sortByIdInput
  sortByIdInput.addEventListener('change', () => {
    // Showing issues
    showIssues(sortByIdInput);
  });
  // Adding event listener to sortByAssignedToInput
  sortByAssignedToInput.addEventListener('change', () => {
    // Showing issues
    showIssues(sortByAssignedToInput);
  });
  // Adding event listener to sortBySeverityInput
  sortBySeverityInput.addEventListener('change', () => {
    // Showing issues
    showIssues(sortBySeverityInput);
  });
}

// Exporting showIssue by default
export default showIssues;
