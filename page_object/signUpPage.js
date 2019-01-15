function SignupPage (params) {
  this.usernameInput = element(by.id('username_input'))
  this.passwordInput = element(by.id('password_input'));
  this.nameInput = element(by.id('name_input'));
  this.emailInput = element(by.id('email_input'));
  this.dayInput = element(by.id('day_select'));
  this.monthInput = element(by.id('month_select'));
  this.yearInput = element(by.id('year_select'));


  // GETTERS //

  SignupPage.prototype.getHeader = function(){
      return this.header;
  };

  SignupPage.prototype.getHomeLink = function(){
      return this.homeLink;
  };

  SignupPage.prototype.getLoginLink = function(){
      return this.loginLink;
  };

  SignupPage.prototype.getSignupLink = function(){
      return this.signupLink;
  };

  SignupPage.prototype.getDetailsLink = function(){
      return this.detailsLink;
  };

  SignupPage.prototype.getProfileLink = function(){
      return this.profileLink;
  };

  SignupPage.prototype.getStatusMessage = function(){
      return this.statusMessage;
  };

  SignupPage.prototype.goToHomePage = function(){
      return this.getHomeLink().click();
  };

  SignupPage.prototype.goToLoginPage = function(){
      return this.getLoginLink().click();
  };

  SignupPage.prototype.goToSignupPage = function(){
      return this.getSignupLink().click();
  };

  SignupPage.prototype.goToDetailsPage = function(){
      return this.getDetailsLink().click();
  };

  SignupPage.prototype.goToProfilePage = function(){
      return this.getProfileLink().click();
  };

  SignupPage.prototype.signOut = function(){
      return this.getSignupLink().click();
  };

  SignupPage.prototype.closeMapModal = function(){
      return this.getMapModalCloseButton().click();
  };


}

module.exports = SignupPage;