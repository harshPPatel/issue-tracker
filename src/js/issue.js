import { issueCard } from './template';
import { EMPLOYEES } from './constants';

const issueDescriptionInput = document.getElementById('issueDescriptionInput');
// const issueSeverityInput = document.getElementById('issueSeverityInput');
// const issueAssignedToInput = document.getElementById('issueAssignedToInput');
// const issueSubmitButton = document.getElementById('issueSubmit');
// const issueOutputElement = document.getElementById('issueListOutput');
// const issueSortInput = document.getElementById('sortIssueList');

issueDescriptionInput.addEventListener('click', () => {
  issueDescriptionInput.classList.remove('invalid');
});

const autoAssign = () => {
  const randomNumber = Math.floor(Math.random() * EMPLOYEES.length);
  return EMPLOYEES[randomNumber];
};

const addIssue = e => {};
