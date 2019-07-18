import { getJSONIssues } from './data';
import { ISSUE_FIELDS, SORT_OPTIONS } from './constants';

/**
 * @function sortAscending
 * @description It gets input element as input and checks it data-by attribute's value
 * and sort the issue array from the localStorage and returns new sorted Array in
 * ascending order.
 * @param {HTMLElement} input Sort Option input
 * @returns {Array} sorted array in ascending order
 */
const sortAscending = input => {
  // Initializing the sortedArray
  let sortedArray = [];
  // Getting issues from localStorage
  const issues = getJSONIssues();

  // Swithving through input's data-by attribute
  switch (input.dataset.by) {
    // if the attribute's value is 'id'
    case ISSUE_FIELDS.ID:
      // Sorting array ascending by issue's id
      sortedArray = issues.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
      break;

    // if the attribute's value is 'severity'
    case ISSUE_FIELDS.SEVERITY:
      // Filtering all low severity issues
      const lowIssues = issues.filter(issue => issue.severity === 'low');
      // Filtering all medium severity issues
      const mediumIssues = issues.filter(issue => issue.severity === 'medium');
      // Filtering all high severity issues
      const highIssues = issues.filter(issue => issue.severity === 'high');
      // Adding all arrays to sortedArray in ascending order
      sortedArray = [...lowIssues, ...mediumIssues, ...highIssues];
      break;

    // if the attribute's value is 'assignedTo'
    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      // Sorting array ascending by issue's id
      sortedArray = issues.sort((a, b) => {
        return a.assignedTo > b.assignedTo ? 1 : -1;
      });
      break;
  }

  // Returnign the sortedArray
  return sortedArray;
};

/**
 * @function sortDescending
 * @description It gets input element as input and checks it data-by attribute's value
 * and sort the issue array from the localStorage and returns new sorted Array in
 * descending order.
 * @param {HTMLElement} input Sort Option input
 * @returns {Array} sorted array in descending order
 */
const sortDescending = input => {
  // Initializing the sortedArray
  let sortedArray = [];
  // Getting issues from localStorage
  const issues = getJSONIssues();

  // Swithving through input's data-by attribute
  switch (input.dataset.by) {
    // if the attribute's value is 'id'
    case ISSUE_FIELDS.ID:
      // Sorting array ascending by issue's id
      sortedArray = issues.sort((a, b) => {
        return a.id < b.id ? 1 : -1;
      });
      break;

    // if the attribute's value is 'severity'
    case ISSUE_FIELDS.SEVERITY:
      // Filtering all low severity issues
      const lowIssues = issues.filter(issue => issue.severity === 'low');
      // Filtering all medium severity issues
      const mediumIssues = issues.filter(issue => issue.severity === 'medium');
      // Filtering all high severity issues
      const highIssues = issues.filter(issue => issue.severity === 'high');
      // Adding all arrays to sortedArray in descending order
      sortedArray = [...highIssues, ...mediumIssues, ...lowIssues];
      break;

    // if the attribute's value is 'assignedTo'
    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      // Sorting array descending by issue's id
      sortedArray = issues.sort((a, b) => {
        return a.assignedTo < b.assignedTo ? 1 : -1;
      });
      break;
  }

  // Returnign the sortedArray
  return sortedArray;
};

/**
 * @function sort
 * @description It gets sortOption input and checks it value. If the value is ascedning,
 * it calls sortAscending and if it is descending, it calls sortDescending. And it
 * returns the sorted array
 * @param {String} id Id of the issue
 * @returns {Array} sorted issues array
 */
const sort = input => {
  // Checks if the input's value is ascending
  if (input.value === SORT_OPTIONS.ASCENDING) {
    // calls sortAscending and returns the sorted array
    return sortAscending(input);
  } else {
    // calls sortdescending and returns the sorted array
    return sortDescending(input);
  }
};

// Exporting sort as default
export default sort;
