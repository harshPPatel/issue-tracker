export const issueCard = issue => {
  return `
  <div class="row">
    <div class="issue">
      <p class="issue_id"><span>Issue Id :</span> ${issue.id}</p>
      <p class="issue_status">${issue.status}</p>
      <h3 class="issue_heading">${issue.description}</h3>
      <p class="issue_severity">
        <span>Severity :</span> ${issue.severity}
      </p>
      <p class="issue_assigned">
        <span>Assigned To :</span> ${issue.assignedTo}
      </p>
      <a class="card-btn card-btn-primary" href="#" onclick="setStatusClosed('${
        issue.id
      }')">Close</a>
      <a class="card-btn card-btn-secondary" href="#" onclick="deleteIssue('${
        issue.id
      }')">Delete</a>
    </div>
  </div>`;
};

export const issueTableRow = issue => {
  return 'Hello Row';
};
