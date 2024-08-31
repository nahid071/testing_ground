const workflowData = {
  workflowName: "PageVisitWorkflow",
  triggers: ["contact_created", "notes_added", "page_visited"],
  steps: [
    {
      delay: 5000,
      step: "SendMail",
      data: {
        subject: "1. Thanks for Visiting {pageName}",
        message: "We appreciate your interest!",
      },
    },
    {
      delay: 10000,
      step: "SendMail",
      data: {
        subject: "2. Thanks for Visiting {pageName}",
        message: "We appreciate your interest!",
      },
    },
  ],
};

async function getWorkflow(triggers) {
  try {
    const hasWorkflow = workflowData.triggers.includes(triggers); // perform mongodb operation here

    const workflow = hasWorkflow ? workflowData : null;

    return {
      exists: hasWorkflow,
      workflow: workflow ? workflow : {},
    };
  } catch (err) {
    console.error("Error fetching workflow steps:", err);
    return {
      exists: false,
      workflow: {},
    };
  }
}

module.exports = getWorkflow;
