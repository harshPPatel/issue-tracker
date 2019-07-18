/**
 * @typedef {Object} Issue
 * @property {string} id - Unique ID of the issue.
 * @property {string} description - The description of the issue.
 * @property {string} severity - The severity level of the issue.
 * @property {string} assignedTo - The name of the employee to whom teh issue is assigned to.
 * @property {string} status - The status of the issue.
 */

/**
 * @function issueCard
 * @description It gets issue as parameter and creates string value of isseCard and adds
 * issue's value to the card's html elements
 * @param {Issue} issue Issue to create its issue Card
 * @returns {String} issueCard in string format with issue object's properties' values
 */
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
      <a class="card-btn card-btn-${
        issue.status === 'open' ? 'primary' : 'success'
      } --js-issue-status" data-id="${issue.id}" href="#" >
        ${issue.status === 'open' ? 'Close' : 'Open'}</a>
      <a class="card-btn card-btn-secondary --js-issue-delete" href="#" data-id="${
        issue.id
      }">Delete</a>
    </div>
  </div>`;
};

/**
 * @function issueTableHeadingRow
 * @description Returns heading row for print page's issue table in string format.
 * @returns {String} issueTableHeadingRow in string format
 */
export const issueTableHeadingRow = () => {
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

/**
 * @function issueTableRow
 * @description It gets issue as parameter and creates string value of issueTableRow
 * and adds issue's value to the row's html elements
 * @param {Issue} issue Issue to create its issue row
 * @returns {String} issueTableRow in string format with issue object's properties' values
 */
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

/**
 * @function noIssueMessage
 * @description Returns message of 'No Issues Found' in string format
 * @returns {String} 'No Issue Found' message wrapped in div as a string format
 */
export const noIssueMessage = () => {
  return `
    <div class="welcome-message">
      <h3>Yeah! No Issues Found!</h3>
    </div>
  `;
};
