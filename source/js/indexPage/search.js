const searchInput = document.getElementById("searchInput");
const searchOptionInput = document.getElementById("searchOptionInput");
const noSearchFoundHTML = '<div class="welcome-message"><h3>No Search Found!</h3></div>';

if (searchInput !== null) {
  searchInput.addEventListener('input', function () {
    var searchOptionValue = searchOptionInput.value;
    searchOption(searchOptionValue);
  });
  
  searchOptionInput.addEventListener('change', function () {
    searchInput.focus();  
  })
}

function searchOption(option) {
  switch (option) {
    case "id":
      idSearch();
      break;
    case "assignedTo":
    default:
      assignedToSearch();
      break;
  }
}

function doesInclude(option, issue) {
  if (option === 'id') {
    return issue.id.toUpperCase().includes(searchInput.value.toUpperCase());
  } else {
    return issue.assignedTo.toUpperCase().includes(searchInput.value.toUpperCase());
  }
}

function idSearch() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  if (issues === null || issues === undefined || issues.length === 0) {
    modal();
    searchInput.blur();
    searchInput.value = '';
  } else {
    issueOutputElement.innerHTML = '';
    issues.reverse().forEach(function(issue) {
      if (doesInclude('id', issue)) {
        issueOutputElement.innerHTML += createIssueCard(issue);
        return;
      }
    });
    if(issueOutputElement.innerHTML == '') {
      issueOutputElement.innerHTML = noSearchFoundHTML;
    }
  }
}

function assignedToSearch() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  if (issues === null || issues === undefined || issues.length === 0) {
    modal();
    searchInput.blur();
    searchInput.value = '';
  } else {
    issueOutputElement.innerHTML = '';
    issues.reverse().forEach(function(issue) {
      if (doesInclude('assignedTo', issue)) {
        issueOutputElement.innerHTML += createIssueCard(issue);
        return;
      }
    });
    if(issueOutputElement.innerHTML == '') {
      issueOutputElement.innerHTML = noSearchFoundHTML;
    }
  }
}

