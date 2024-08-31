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
    const workflow = await workflowData.triggers.includes(triggers); // perform mongodb operation here
    return workflow ? workflow.steps : [];
  } catch (err) {
    console.error("Error fetching workflow steps:", err);
    return [];
  }
}

module.exports = getWorkflow;
