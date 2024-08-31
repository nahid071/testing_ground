function SendMail(user, subject, message) {
  console.log(
    `hello ${user}, you have a new mail about ${subject}. Message: ${message}`
  );
}

module.exports = SendMail;
