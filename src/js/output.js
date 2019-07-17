import { getJSONIssues } from './data';
import {
  issueCard,
  issueTableRow,
  issueTableHeadingRow,
  noIssueMessage,
} from './template';
import SortedArray from './sort';

const issueOutputElement = document.getElementById('issueListOutput');
const issueSortInput = document.getElementById('sortIssueList');

const sortedOutput = () => {
  const issues = SortedArray(issueSortInput.value);
  issueOutputElement.innerHTML =
    document.body.id === 'print' ? issueTableHeadingRow() : '';
  issues.forEach(issue => {
    issueOutputElement.innerHTML +=
      document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
  });
};

const showIssues = () => {
  issueOutputElement.innerHTML = '';
  const issues = getJSONIssues();
  if (!issues || issues.length === 0) {
    issueOutputElement.innerHTML = noIssueMessage();
  } else if (issueSortInput && issueSortInput.value !== 'hide') {
    sortedOutput();
  } else {
    issueOutputElement.innerHTML =
      document.body.id === 'print' ? issueTableHeadingRow() : '';
    issues.reverse().forEach(issue => {
      issueOutputElement.innerHTML +=
        document.body.id === 'index' ? issueCard(issue) : issueTableRow(issue);
    });
  }
};

if (issueSortInput) issueSortInput.addEventListener('input', showIssues);

export default showIssues;
