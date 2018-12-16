const issueDescriptionInput =   document.getElementById("issueDescriptionInput"); 
const issueSeverityInput    =   document.getElementById("issueSeverityInput"); 
const issueAssignedToInput  =   document.getElementById("issueAssignedToInput");
const issueSubmitButton     =   document.getElementById("issueSubmit");
const issueOutputElement    =   document.getElementById("issueListOutput");
const issueSortInput        =   document.getElementById('sortIssueList');
const defaultEmployees      =   [ 'Bruce',
                                  'Snyder',
                                  'Taylor',
                                  'Mark',
                                  'Monica',
                                  'Sachin',
                                  'Richard',
                                  'Parker',
                                  'Zach',
                                  'Mike'
                                ];

issueDescriptionInput
  .addEventListener('click', 
    function() {
      issueDescriptionInput.classList.remove('invalid');
  });

function createIssueCard(issue) {
  var rawTemplate       =   document.getElementById("issueCardTemplate").innerHTML;
  var compiledTemplate  =   Handlebars.compile(rawTemplate);
  return compiledTemplate(issue);
}

function autoAssign() {
  var randomNumber = Math.floor(Math.random() * defaultEmployees.length);
  return defaultEmployees[randomNumber];
}

function addIssue(event) {
  event.preventDefault();
  if (issueDescriptionInput.value == '') {
    issueDescriptionInput.classList.add('invalid');
    return;
  }

  var issueDescription = issueDescriptionInput.value;
  var issueAssignedTo = issueAssignedToInput.value;
  var issueSeverity = issueSeverityInput.value;
  var id = chance.guid();
  var issueStatus = ISSUE_OPEN;

  issueAssignedTo = issueAssignedTo == '' ? autoAssign() : issueAssignedTo;
  issueSeverity = issueSeverity == '' ? 'low' : issueSeverity;

  var issue = {
    id: id,
    description: issueDescription,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  };

  if (getData() === null) {
    var issues = new Array();
    issues.push(issue);
    setJSONData(issues);
  } else {
    var issues = getJSONData();
    issues.push(issue);
    setJSONData(issues);
  }

  issueDescriptionInput.value   = '';
    issueAssignedToInput.value  = '';
      issueSeverityInput.value  = 'low';

  fetchIssuesCard();
}

function setStatusClosed(id) {
  var issues = getJSONData();
  issues.forEach(function(issue) {
    if (issue.id == id) {
      issue.status = ISSUE_CLOSED;
    }
  });
  setJSONData(issues);
  fetchIssuesCard();
}

function deleteIssue(id) {
  var issues = getJSONData();
  issues.forEach(function(issue, index) {
    if(issue.id == id) {
      issues.splice(index, 1);
    }
  });
  setJSONData(issues);
  fetchIssuesCard();
  // setting default value in sort options
  if(getJSONData().length == 0) {
    issueSortInput.value = 'hide';
  }
}

issueSubmitButton.addEventListener('click', addIssue);

// check in both pages
// Chnage the function in to individual function and then call it according to page
// severity sort function will be same , add argument in function which will take options for id assignedTo aand severity
issueSortInput.addEventListener('input', function() {  
  if (issueSortInput.value == ASCENDING) {
    sortAscending(SEVERITY, INDEX_PAGE);
  }
  if (issueSortInput.value == DESCENDING) {
    sortDescending(SEVERITY, INDEX_PAGE);
  }
});

function fetchIssuesCard() {
  var issues = getJSONData();
  if(issues === null || issues.length == 0) {
    issueOutputElement.innerHTML =  "<div class=\"welcome-message\">" + 
                                      "<h3>Yeah! No Issues Found!</h3>" +
                                    "</div>";
  } else if (issueSortInput.value == ASCENDING) {
    sortAscending(SEVERITY, INDEX_PAGE);
    
  } else if (issueSortInput.value == DESCENDING) {
    sortDescending(SEVERITY, INDEX_PAGE);
  } else {
    issueOutputElement.innerHTML = "";
    issues
      .reverse()
      .forEach(function(issue) {
        issueOutputElement.innerHTML += createIssueCard(issue);
      });
  }
}