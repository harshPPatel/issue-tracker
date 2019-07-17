import { getJSONIssues } from './data';
import { ISSUE_FIELDS, SORT_OPTIONS } from './constants';

const issueSortInput = document.getElementById('sortIssueList');

const sortAscending = option => {
  let sortedArray = [];
  const issues = getJSONIssues();

  switch (option) {
    case ISSUE_FIELDS.ID:
      sortedArray = issues.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
      break;
    case ISSUE_FIELDS.SEVERITY:
      const lowIssues = issues.filter(issue => issue.severity === 'low');
      const mediumIssues = issues.filter(issue => issue.severity === 'medium');
      const highIssues = issues.filter(issue => issue.severity === 'high');
      sortedArray = [...lowIssues, ...mediumIssues, ...highIssues];
      break;
    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      sortedArray = issues.sort((a, b) => {
        return a.assignedTo > b.assignedTo ? 1 : -1;
      });
      break;
  }

  return sortedArray;
};

const sortDescending = option => {
  let sortedArray = [];
  const issues = getJSONIssues();

  switch (option) {
    case ISSUE_FIELDS.ID:
      sortedArray = issues.sort((a, b) => {
        return a.id < b.id ? 1 : -1;
      });
      break;
    case ISSUE_FIELDS.SEVERITY:
      const lowIssues = issues.filter(issue => issue.severity === 'low');
      const mediumIssues = issues.filter(issue => issue.severity === 'medium');
      const highIssues = issues.filter(issue => issue.severity === 'high');
      sortedArray = [...highIssues, ...mediumIssues, ...lowIssues];
      break;
    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      sortedArray = issues.sort((a, b) => {
        return a.assignedTo < b.assignedTo ? 1 : -1;
      });
      break;
  }

  return sortedArray;
};

const sort = option => {
  if (issueSortInput.value === SORT_OPTIONS.ASCENDING) {
    return sortAscending(option);
  } else {
    return sortDescending(option);
  }
};

export default sort;
