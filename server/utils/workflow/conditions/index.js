// Checker Imports
const hasVisitedPage = require("../conditions/hasVisitedPage");
// const hasSignedUp = require('../conditions/hasSignedUp');
// const hasPurchasedCourse = require('../conditions/hasPurchasedCourse');

// Condition Map
const conditionFunctions = {
  hasVisitedPage,
  // hasSignedUp,
  // hasPurchasedCourse,
};

function conditionValidator(data) {
  const { conditions, logic, checkerInfo } = data;

  const conditionResults = conditions.map((condition) => {
    const checkFunction = conditionFunctions[condition];
    if (checkFunction) {
      return checkFunction(checkerInfo);
    }

    return false;
  });

  // Combine results based on the logic (AND/OR)
  if (logic === "AND") {
    return conditionResults.every((result) => result === true);
  } else if (logic === "OR") {
    return conditionResults.some((result) => result === true);
  }

  return false;
}

module.exports = conditionValidator;
