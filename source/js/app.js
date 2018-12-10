// setStatusClosed()
var issueForm = document.getElementById('addIssueForm');
var issueDescriptionInput = document.getElementById('issueDescriptionInput');
var issueSeverityInput = document.getElementById('issueSeverityInput');
var issueAssignedToInput = document.getElementById('issueAssignedToInput');
var issueSubmitButton = document.getElementById('issueSubmit');

issueDescriptionInput.addEventListener('click', function() {
  issueDescriptionInput.classList.remove('invalid');
});

// form validating function
function isIssueFormValid() {
  if (issueDescriptionInput.value == '' || issueSeverityInput.value == 'hide') {
    return false;
  } else {
    return true;
  }
}

// styling adding function
function addVaildStyling() {
  if (isIssueFormValid()) {
    issueDescriptionInput.classList.remove('invalid');
  } else {
    issueDescriptionInput.classList.add('invalid');
  }
}

// Add issue function

function addIssue(event){
  event.preventDefault();
  // styling fields
  addVaildStyling();

}

issueSubmitButton.addEventListener('click', addIssue);

// TODO: invalidation styling select .select to apply styling to the element

console.log(isIssueFormValid());

