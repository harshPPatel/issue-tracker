import { getJSONIssues, setIssues } from './data';
import {
  issueCard,
  issueTableRow,
  issueTableHeadingRow,
  noIssueMessage,
} from './template';
import SortedArray from './sort';
import { ISSUE_STATUS } from './constants';

const issueOutputElement = document.getElementById('issueListOutput');
const issueSortInput = document.getElementById('sortIssueList');
const issueStatusButtons = document.getElementsByClassName('--js-issue-status');
const issueDeleteButtons = document.getElementsByClassName('--js-issue-delete');
const sortByIdInput = document.getElementById('sortIssueListById');
const sortBySeverityInput = document.getElementById('sortIssueListBySeverity');
const sortByAssignedToInput = document.getElementById(
  'sortIssueListByAssigned',
);

const sortedOutput = input => {
  const issues = SortedArray(input);
  issueOutputElement.innerHTML =
    document.body.id === 'print' ? issueTableHeadingRow() : '';
  issues.forEach(issue => {
    issueOutputElement.innerHTML +=
      document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
  });
};

const showIssues = input => {
  issueOutputElement.innerHTML = '';
  const issues = getJSONIssues();
  if (!issues || issues.length === 0) {
    issueOutputElement.innerHTML = noIssueMessage();
  } else if (issueSortInput && issueSortInput.value !== 'hide') {
    sortedOutput(input);
  } else if (
    sortByIdInput &&
    (sortByIdInput.value !== 'hide' ||
      sortByAssignedToInput.value !== 'hide' ||
      sortBySeverityInput.value !== 'hide')
  ) {
    sortedOutput(input);
  } else {
    issueOutputElement.innerHTML =
      document.body.id === 'print' ? issueTableHeadingRow() : '';
    issues.reverse().forEach(issue => {
      issueOutputElement.innerHTML +=
        document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
    });
  }

  addEventListeners();
};

const changeStatus = (e, id) => {
  const issues = getJSONIssues();
  issues.forEach(issue => {
    if (issue.id === id) {
      issue.status =
        issue.status === ISSUE_STATUS.OPEN
          ? ISSUE_STATUS.CLOSE
          : ISSUE_STATUS.OPEN;
    }
  });
  setIssues(issues);
  showIssues(issueSortInput);
};

const removeIssue = id => {
  const issues = getJSONIssues();
  issues.forEach((issue, index) => {
    if (issue.id === id) {
      issues.splice(index, 1);
    }
  });
  // Setting default sort option when there is no issues
  if (issues.length === 0) {
    issueSortInput.value = 'hide';
  }
  setIssues(issues);
  showIssues(issueSortInput);
};

export const addEventListeners = () => {
  for (let i = 0; i < issueStatusButtons.length; i++) {
    const button = issueStatusButtons[i];
    button.addEventListener('click', e => {
      e.preventDefault();
      changeStatus(e, button.dataset.id);
    });
  }

  for (let i = 0; i < issueDeleteButtons.length; i++) {
    const button = issueDeleteButtons[i];
    button.addEventListener('click', e => {
      e.preventDefault();
      removeIssue(button.dataset.id);
    });
  }
};
if (issueSortInput) {
  issueSortInput.addEventListener('input', () => {
    showIssues(issueSortInput);
  });
}

if (sortByIdInput) {
  sortByIdInput.addEventListener('change', () => {
    showIssues(sortByIdInput);
  });
  sortByAssignedToInput.addEventListener('change', () => {
    showIssues(sortByAssignedToInput);
  });
  sortBySeverityInput.addEventListener('change', () => {
    showIssues(sortBySeverityInput);
  });
}

export default showIssues;
