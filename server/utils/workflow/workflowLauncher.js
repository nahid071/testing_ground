const SendMail = require("./steps/SendMail");

async function StartWorkflow(systemData, workflowData) {
  workflowData?.nodes?.slice(1).forEach((step) => {
    setTimeout(() => {
      switch (step.stepFor) {
        case "SendMail":
          SendMail(systemData.user.name, step.data.subject, step.data.message);
          break;
        // Handle other steps...
      }
    }, step.delay);
  });
}

module.exports = StartWorkflow;
