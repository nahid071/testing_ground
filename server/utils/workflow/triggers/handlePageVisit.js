const StartWorkflow = require("../workflowLauncher");
const getWorkflow = require("../api/workflowData");
const conditionValidator = require("../conditions/index");

// "page_visited" is the trigger name. this name is unique for each trigger function.
// in this case trigger name for handlePageVisit function is "page_visited"
// pass the trigger name to getWorkflow function inside every trigger function
// Use the conditionValidator() function to check, if the conditions are fulfilled or not

const validationData = {
  conditions: ["hasVisitedPage", "hasSignedUp", "hasPurchasedCourse"],
  logic: "AND",
  checkerInfo: { userId: "123", pageName: "calendar" },
};

function handlePageVisit(systemData) {
  getWorkflow("page_visited").then((result) => {
    if (result.exists) {
      if (conditionValidator(validationData)) {
        StartWorkflow(systemData, result.workflow);
      }
    }
  });
}

module.exports = handlePageVisit;
