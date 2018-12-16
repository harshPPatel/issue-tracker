function sortAscending(option, page) {
  var sortedArray = new Array();
  var issues = JSON.parse(localStorage.getItem('issues'));
  if (page === INDEX_PAGE) {
    issueOutputElement.innerHTML = '';
  } else {
    issueTable.innerHTML = getHeadingRow();
  }

  switch (option) {
    case ID:
      issues.forEach(function(issue) {
        sortedArray.push(issue.id);
      });
      sortedArray = sortedArray.sort();
      sortedArray.forEach(function(sortedId) {
        issues.forEach(function(issue) {
          if (sortedId === issue.id) {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        });
      });
      break;

    case ASSIGNED_TO:
      issues.forEach(function(issue) {
        sortedArray.push(issue.assignedTo.toUpperCase());
      });
      var issuesUnique = sortedArray.filter(function(item, index){
        return sortedArray.indexOf(item) >= index;
      });
      sortedArray = issuesUnique.sort();
      sortedArray.forEach(function(sortedAssignedTo) {
        issues.forEach(function(issue) {
          if (sortedAssignedTo == issue.assignedTo.toUpperCase()) {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        });
      });
      break;

    case SEVERITY:
      issues.forEach(function(issue) {
        if (issue.severity == 'high') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'medium') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'low') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      break;
  }
}

function sortDescending(option, page) {
  var sortedArray = [];
  var issues = JSON.parse(localStorage.getItem('issues'));
  if(page === INDEX_PAGE) {
    issueOutputElement.innerHTML = '';
  } else {
    issueTable.innerHTML = getHeadingRow();
  }
  var sortedArray = new Array();

  switch (option) {
    case ID:
      issues.forEach(function(issue) {
        sortedArray.push(issue.id);
      });
      sortedArray = sortedArray.sort().reverse();
      sortedArray.forEach(function(sortedId) {
        issues.forEach(function(issue) {
          if (sortedId == issue.id) {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        });
      });
      break;
    
    case ASSIGNED_TO:
      issues.forEach(function(issue) {
        sortedArray.push(issue.assignedTo.toUpperCase());
      });
      var issuesUnique = sortedArray.filter(function(item, index){
        return sortedArray.indexOf(item) >= index;
      });
      sortedArray = issuesUnique.sort().reverse();
      sortedArray.forEach(function(sortedAssignedTo) {
        issues.forEach(function(issue) {
          if (sortedAssignedTo == issue.assignedTo.toUpperCase()) {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        });
      });
      break;

    case SEVERITY:
      issues.forEach(function(issue) {
        if (issue.severity == 'low') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'medium') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      issues.forEach(function(issue) {
        if (issue.severity == 'high') {
          if (page === INDEX_PAGE) {
            issueOutputElement.innerHTML += createIssueCard(issue);
          } else {
            issueTable.innerHTML += createIssuesRow(issue);
          }
        }
      });
      break;
  }
}