// Constant Variables
const SEVERITY      =   'severity';
const ID            =   'id';
const ASSIGNED_TO   =   'assignedTo';
const INDEX_PAGE    =   'index';
const PRINT_PAGE    =   'print';
const ASCENDING     =   'ascending';
const DESCENDING    =   'descending';
const ISSUE_OPEN    =   'Open';
const ISSUE_CLOSED  =   'Closed';

function getJSONData() {
  var data = JSON.parse(localStorage.getItem('issues'));
  return data;
}

function getData() {
  return localStorage.getItem('issues');
}

function setJSONData(data) {
  return localStorage.setItem('issues', JSON.stringify(data));
}