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
      <a class="card-btn card-btn-primary --js-issue-status" data-id="${
        issue.id
      }" href="#" >Close</a>
      <a class="card-btn card-btn-secondary --js-issue-delete" href="#" data-id="${
        issue.id
      }">Delete</a>
    </div>
  </div>`;
};

export const issueTableHeadingRow = issue => {
  return `
    <tr>
      <td> ID </td>
      <td> Status </td>
      <td> Description </td>
      <td> Severity </td>
      <td> Assigned To </td>
    </tr>
  `;
};

export const issueTableRow = issue => {
  return `
    <tr>
      <td>${issue.id}</td>
      <td>${issue.status}</td>
      <td>${issue.description}</td>
      <td>${issue.severity}</td>
      <td>${issue.assignedTo}</td>
    </tr>
  `;
};

export const noIssueMessage = () => {
  return `
    <div class="welcome-message">
      <h3>Yeah! No Issues Found!</h3>
    </div>
  `;
};
