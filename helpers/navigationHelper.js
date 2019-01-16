function NavigationHelper () {
}
  
  NavigationHelper.prototype.waitForElement = function(element,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element), 30000, errorMessage);
  };

  NavigationHelper.prototype.waitForTextInElement = function(element,textToCheck,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.textToBePresentInElement(element, textToCheck), 80000, errorMessage);
  }

module.exports = NavigationHelper;