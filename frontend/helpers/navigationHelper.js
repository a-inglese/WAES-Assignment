var commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    signUpPage = require('../page_object/signUpPage'),
    newUserPage = require('../page_object/newUserPage'),
    pageObjectHelper = require('../helpers/pageObjectHelper')

function NavigationHelper () {
  this.CommonHeaderElements = new commheadel();
  this.HomePage = new homePage();
  this.LoginPage = new loginPage();
  this.SignupPage = new signUpPage();
  this.NewUserPage = new newUserPage();  
  this.PageObjectHelper = new pageObjectHelper();
}
  
  NavigationHelper.prototype.waitForElement = function(element,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element), 30000, errorMessage);
  };

  NavigationHelper.prototype.waitForTextInElement = function(element,textToCheck,errorMessage) {
    let until = protractor.ExpectedConditions;
    browser.wait(until.textToBePresentInElement(element, textToCheck), 80000, errorMessage);
  }

  NavigationHelper.prototype.goToHomePage = function(){
    var self = this;
    browser.get(this.HomePage.getUrl()).then(function(){
      var EC = protractor.ExpectedConditions;
      // Waits for the element with id 'myInput' to contain the input 'foo'.
      browser.wait(EC.textToBePresentInElement(self.HomePage.getTitleElement(), self.HomePage.getTitle()), 5000);
    });
  }
  
  NavigationHelper.prototype.goToLoginPage = function(){
    var self = this;
    this.CommonHeaderElements.goToLoginPage().then(function(){
      var EC = protractor.ExpectedConditions;
      // Waits for the element with id 'myInput' to contain the input 'foo'.
      browser.wait(EC.textToBePresentInElement(self.LoginPage.getTitleElement(), self.LoginPage.getTitle()));
    });
  };

  NavigationHelper.prototype.goToSignupPage = function(){
    var self = this;
    this.CommonHeaderElements.goToSignupPage().then(function(){
      var EC = protractor.ExpectedConditions;
      // Waits for the element with id 'myInput' to contain the input 'foo'.
      browser.wait(EC.textToBePresentInElement(self.SignupPage.getTitleElement(), self.SignupPage.getTitle()));
    });
  };

  NavigationHelper.prototype.logoutIfLoggedIn = function(){
    var self = this;
    this.CommonHeaderElements.getStatusMessage().isPresent().then(function(present){
      if (present) {
        self.CommonHeaderElements.getStatusMessage().getText().then(function(text){
          if (text != "To get the full hero experience, you’ll need to log in."){
            self.CommonHeaderElements.logOut();
          }
        });
      }
    });
  };

module.exports = NavigationHelper;