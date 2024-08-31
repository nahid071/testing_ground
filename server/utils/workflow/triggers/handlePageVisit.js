const hasVisitedPage = require("../conditions/hasVisitedPage");
const StartWorkflow = require("../workflowLauncher");
const getWorkflow = require("../api/workflowData");

function handlePageVisit(user, pageName) {
  if (hasVisitedPage(user, pageName)) {
    let workflowData = getWorkflow("page_visit");

    if (workflowData.length !== 0) StartWorkflow(user, pageName);
  }
}

module.exports = handlePageVisit;
