function sortAscending(option) {
  var sortedArray = [];
  var sortedIssues = new Array();
  var issues = JSON.parse(localStorage.getItem('issues'));
  issueOutputElement.innerHTML = '';

  switch (option) {
    case 'severity':
      issues.forEach(function(issue) {
        if (issue.severity == 'low') {
          issueOutputElement.innerHTML += createIssueCard(issue);
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'medium') {
          issueOutputElement.innerHTML += createIssueCard(issue);
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'high') {
          issueOutputElement.innerHTML += createIssueCard(issue);
        }
      });
      break;
  }
}

function sortDescending(option) {
  var sortedArray = [];
  var sortedIssues = new Array();
  var issues = JSON.parse(localStorage.getItem('issues'));
  issueOutputElement.innerHTML = '';

  switch (option) {
    case 'severity':
    issues.forEach(function(issue) {
      if (issue.severity == 'high') {
        issueOutputElement.innerHTML += createIssueCard(issue);
      }
    });
    issues.forEach(function(issue) {
      if (issue.severity == 'medium') {
        issueOutputElement.innerHTML += createIssueCard(issue);
      }
    });
    issues.forEach(function(issue) {
      if (issue.severity == 'low') {
        issueOutputElement.innerHTML += createIssueCard(issue);
      }
    });
      break;
  }
}