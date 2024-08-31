const SendMail = require("./steps/SendMail");

function StartWorkflow(user, pageName) {
  // Step 1: Send email after 5 seconds
  setTimeout(() => {
    SendMail(
      user.name,
      `1. Thanks for Visiting ${pageName}`,
      "We appreciate your interest!"
    );
  }, 5000);

  // Step 2: Send email after 10 seconds
  setTimeout(() => {
    SendMail(
      user.name,
      `2. Thanks for Visiting ${pageName}`,
      "We appreciate your interest!"
    );
  }, 10000);

  // Step 3: Send email after 15 seconds
  setTimeout(() => {
    SendMail(
      user.name,
      `3. Thanks for Visiting ${pageName}`,
      "We appreciate your interest!"
    );
  }, 15000);

  // Step 4: Send email after 20 seconds
  setTimeout(() => {
    SendMail(
      user.name,
      `4. Thanks for Visiting ${pageName}`,
      "We appreciate your interest!"
    );
  }, 20000);
}

module.exports = StartWorkflow;
