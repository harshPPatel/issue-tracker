import { EMPLOYEES, ISSUE_STATUS } from './constants';
import { getIssues, getJSONIssues, setIssues } from './data';
import showOutput from './output';

const Chance = require('chance').Chance();

const issueDescriptionInput = document.getElementById('issueDescriptionInput');
const issueSeverityInput = document.getElementById('issueSeverityInput');
const issueAssignedToInput = document.getElementById('issueAssignedToInput');
const issueSortInput = document.getElementById('sortIssueList');
const issueStatusButtons = document.getElementsByClassName('--js-issue-status');
const issueDeleteButtons = document.getElementsByClassName('--js-issue-delete');

if (issueDescriptionInput) {
  issueDescriptionInput.addEventListener('click', () => {
    issueDescriptionInput.classList.remove('invalid');
  });
}

const autoAssign = () => {
  const randomNumber = Math.floor(Math.random() * EMPLOYEES.length);
  return EMPLOYEES[randomNumber];
};

const createIssue = () => {
  const issueAssigned =
    issueAssignedToInput.value === ''
      ? autoAssign()
      : issueAssignedToInput.value;

  const issue = {
    id: Chance.guid(),
    description: issueDescriptionInput.value,
    severity: issueSeverityInput.value,
    assignedTo: issueAssigned,
    status: ISSUE_STATUS.OPEN,
  };

  return issue;
};

const resetForm = () => {
  issueDescriptionInput.value = '';
  issueAssignedToInput.value = '';
  issueSeverityInput.value = 'low';
};

const changeStatus = (e, id) => {
  const issues = getJSONIssues();
  issues.forEach(issue => {
    if (issue.id === id) {
      issue.status =
        issue.status === ISSUE_STATUS.OPEN
          ? ISSUE_STATUS.CLOSE
          : ISSUE_STATUS.OPEN;
      e.target.innerText = issue.status;
    }
    console.log(issue);
  });
  setIssues(issues);
  showOutput();
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
  showOutput();
};

const addEventListeners = () => {
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

const addIssue = () => {
  if (issueDescriptionInput.value === '') {
    issueDescriptionInput.classList.add('invalid');
    return;
  }

  const issue = createIssue();
  let issues = [];
  if (getIssues()) {
    issues = getJSONIssues();
  }
  issues.push(issue);
  setIssues(issues);
  resetForm();
  showOutput();
  addEventListeners();
  console.log(issueStatusButtons);
};

export default addIssue;
