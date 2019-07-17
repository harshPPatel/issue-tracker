import { ISSUE_FIELDS } from './constants';
import { getJSONIssues } from './data';
import modal from './modal';
import { issueCard } from './template';

const searchInput = document.getElementById('searchInput');
const searchOptionInput = document.getElementById('searchOptionInput');
const issueOutputElement = document.getElementById('issueListOutput');

const isIssueExists = (option, issue) => {
  if (option === ISSUE_FIELDS.ID) {
    return issue.id.toUpperCase().includes(searchInput.value.toUpperCase());
  } else if (option === ISSUE_FIELDS.ASSIGNED_TO) {
    return issue.assignedTo
      .toUpperCase()
      .includes(searchInput.value.toUpperCase());
  }
};

const searchWithOption = option => {
  const issues = getJSONIssues();

  if (!issues) {
    modal();
    searchInput.blur();
    searchInput.value = '';
  } else {
    issueOutputElement.innerHTML = '';
    let result = 0;
    issues.reverse().forEach(issue => {
      if (isIssueExists(option, issue)) {
        issueOutputElement.innerHTML += issueCard(issue);
        result++;
      }
    });
    if (result === 0) {
      issueOutputElement.innerHTML =
        '<div class="welcome-message"><h3>No Search Found!</h3></div>';
    }
  }
};

const search = () => {
  switch (searchOptionInput.value) {
    case ISSUE_FIELDS.ID:
      searchWithOption(ISSUE_FIELDS.ID);
      break;

    case ISSUE_FIELDS.ASSIGNED_TO:
    default:
      searchWithOption(ISSUE_FIELDS.ASSIGNED_TO);
      break;
  }
};

if (searchInput) {
  searchInput.addEventListener('input', () => {
    search(searchOptionInput.value);
  });

  searchOptionInput.addEventListener('change', () => {
    searchInput.value = '';
    searchInput.focus();
  });
}
