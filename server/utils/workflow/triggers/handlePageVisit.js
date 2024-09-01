const hasVisitedPage = require("../conditions/hasVisitedPage");
const StartWorkflow = require("../workflowLauncher");
const getWorkflow = require("../api/workflowData");
const {checkValidity} = require('../conditions/index');

// "page_visited" is the trigger name. this name is unique for each trigger function.
// in this case trigger name for handlePageVisit function is "page_visited"
// pass the trigger name to getWorkflow function inside every trigger function

// Use the checkValidity() function to check, if the condition is fulfilled or not

function handlePageVisit(user, pageName) {
  if (checkValidity("hasvisitedpage", {user, pageName})) {
    getWorkflow("page_visited").then((result) => {
      if (result.exists) StartWorkflow(user, pageName, result.workflow);
    });
  }
}

module.exports = handlePageVisit;
