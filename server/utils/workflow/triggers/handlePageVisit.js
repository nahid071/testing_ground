const hasVisitedPage = require("../conditions/hasVisitedPage");
const StartWorkflow = require("../workflowLauncher");

function handlePageVisit(user, pageName) {
  if (hasVisitedPage(user, pageName)) {
    // logPageVisit(user._id, pageName);

    StartWorkflow(user, pageName);
  }
}

module.exports = handlePageVisit;
