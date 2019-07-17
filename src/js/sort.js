import { getJSONIssues } from './data';
import { ISSUE_FIELDS, SORT_OPTIONS } from './constants';

const sortAscending = input => {
  let sortedArray = [];
  const issues = getJSONIssues();

  switch (input.dataset.by) {
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

const sortDescending = input => {
  let sortedArray = [];
  const issues = getJSONIssues();

  switch (input.dataset.by) {
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

const sort = input => {
  if (input.value === SORT_OPTIONS.ASCENDING) {
    return sortAscending(input);
  } else {
    return sortDescending(input);
  }
};

export default sort;
