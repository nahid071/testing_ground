// Checker Imports
const hasVisitedPage = require('../conditions/hasVisitedPage');


// Checking Function
function checkValidity(activityType, data){
    switch(activityType){
        case "hasvisitedpage": 
            if(hasVisitedPage(data?.user, data?.pageName)){
                return true;
            }
            return false
        // add other cases
        default:
            return false;
    }
}



module.exports = {
    checkValidity
}