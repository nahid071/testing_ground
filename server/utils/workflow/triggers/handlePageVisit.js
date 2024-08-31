const hasVisitedPage = require("../conditions/hasVisitedPage");
const StartWorkflow = require("../workflowLauncher");
const getWorkflow = require("../api/workflowData");

// "page_visited" is the trigger name. this name is unique for each trigger function.
// in this case trigger name for handlePageVisit function is "page_visited"
// pass the trigger name to getWorkflow function inside every trigger function

function handlePageVisit(user, pageName) {
  if (hasVisitedPage(user, pageName)) {
    getWorkflow("page_visited").then((result) => {
      if (result.exists) StartWorkflow(user, pageName, result.workflow);
    });
  }
}

module.exports = handlePageVisit;
