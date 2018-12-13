var issueDescriptionInput = document.getElementById("issueDescriptionInput"); 
var issueSeverityInput    = document.getElementById("issueSeverityInput"); 
var issueAssignedToInput  = document.getElementById("issueAssignedToInput");
var issueSubmitButton     = document.getElementById("issueSubmit");
var issueOutputElement    = document.getElementById("issueListOutput");
var issueSortInput = document.getElementById('sortIssueList');

var defaultEmployees =  [ 'Bruce',
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

// Basic Functions
issueDescriptionInput.addEventListener('click', function() {
  issueDescriptionInput.classList.remove('invalid');
})

// Handler Bar Function
function createIssueCard(issue) {
  var rawTemplate = document.getElementById("issueCardTemplate").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  return compiledTemplate(issue);
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));

  if(issues === null || issues.length == 0) {
    issueOutputElement.innerHTML =  "<div class=\"welcome-message\">" + 
                                      "<h3>Yeah! No Issues Found!</h3>" +
                                    "</div>";
  } else if (issueSortInput.value == 'ascending') {
    sortAscending('severity');
    
  } else {
    issueOutputElement.innerHTML = "";
    issues
      .reverse()
      .forEach(function(issue) {
        issueOutputElement.innerHTML += createIssueCard(issue);
      });
  }
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
  var issueStatus = "Open";

  issueAssignedTo = issueAssignedTo == '' ? autoAssign() : issueAssignedTo;

  var issue = {
    id: id,
    description: issueDescription,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  };

  if (localStorage.getItem('issues') === null) {
    var issues = new Array();
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  issueDescriptionInput.value = '';
  issueAssignedToInput.value = '';
  issueSeverityInput.value = 'low';

  fetchIssues();
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  issues.forEach(function(issue) {
    if (issue.id == id) {
      issue.status = 'Closed';
    }
  });
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  issues.forEach(function(issue, index) {
    if(issue.id == id) {
      issues.splice(index, 1);
    }
  });
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  // setting default value in sort options
  if(JSON.parse(localStorage.getItem('issues')).length == 0) {
    issueSortInput.value = 'hide';
  }
}

issueSubmitButton.addEventListener('click', addIssue);

issueSortInput.addEventListener('input', function() {  
  if (this.value == 'ascending') {
    sortAscending('severity');
  }
  if (this.value == 'descending') {
    sortDescending('severity');
  }
});