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
var modalOverlay =   document.querySelector('#modalContainer .overlay');
var modalContainer = document.querySelector('#modalContainer');
var modalCloseElement = document.querySelectorAll('.--js-modal-close');
var modalBody = document.querySelector('#modalContainer .modal');
var body = document.body;


function isContainerOpen(){
  if (modalContainer.style.display == 'flex') {
    return true;
  } else {
    return false;
  }
}

function setBodyOverflow() {
  if (isContainerOpen()) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
  }
}

function containerFunction() {
  if (isContainerOpen()) {
    modalContainer.style.display = "none";
  } else {
    modalContainer.style.display = "flex";
  }
}

function modalOverlayStyle() {
  if (isContainerOpen()) {
    modalOverlay.animate([
      {
        opacity: '1'
      },
      {
        opacity: '0'
      }
    ], 500);
    modalOverlay.style.opacity = '0';
  } else {
    modalOverlay.animate([
      {
        opacity: '0'
      },
      {
        opacity: '1'
      }
    ], 500);
    modalOverlay.style.opacity = '1';
  }
}

function modalBodyStyle() {
  if (isContainerOpen()) {
    modalBody.animate([
      {
        opacity: '1',
        transform: 'scale(1)'
      },
      {
        opacity: '0',
        transform: 'scale(0.9)'
      }
    ], 200);
    modalBody.style.opacity = '0';
    modalBody.style.transform = 'scale(0.9)';
  } else {
    modalBody.animate([
      {
        opacity: '0',
        transform: 'scale(0.9)'
      },
      {
        opacity: '1',
        transform: 'scale(1)'
      }
    ], {
      delay: 100,
      duration: 200
    });
    modalBody.style.opacity = '1';
    modalBody.style.transform = 'scale(1)';
  }
}

function modal() {
  modalBodyStyle();
  modalOverlayStyle();
  setTimeout(function() {
    containerFunction();
  }, 150);
  setTimeout(function() {
    setBodyOverflow();
  }, 160);
}

modalCloseElement.forEach(function(){
  this.addEventListener('click', function(event) {
    event.preventDefault();
    modal();
  });  
});
  

// Use  : modal()

var randomQuoteData;
var quoteElement = document.getElementById('--js-random-quote');
var authorElement = document.getElementById('--js-random-quote-author');

function getJSONData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     randomQuoteData = JSON.parse(xhttp.response);
    }
  };
  xhttp.open("GET", 'assets/json/quote.json', true);
  xhttp.send();
}

function getRandomQuote() {
  var randomNumber = Math.floor(Math.random() * randomQuoteData[0].quotes.length);
  var quote = randomQuoteData[0].quotes[randomNumber].quote;
  var author = randomQuoteData[0].quotes[randomNumber].author;

  quoteElement.innerHTML = quote;
  authorElement.innerHTML = '- ' + author;
}

window.onload = function() {
  getJSONData();
  setTimeout(getRandomQuote, 50);
}
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