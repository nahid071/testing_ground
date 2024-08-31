function hasVisitedPage(user, pageName) {
  return user.visitedPages.includes(pageName);
}

module.exports = hasVisitedPage;
