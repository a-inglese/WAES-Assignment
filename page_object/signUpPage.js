function SignUpPage () {
  this.url = 'https://waesworks.bitbucket.io/app/signUp';
  this.usernameInput = element(by.id('username_input'))
  this.passwordInput = element(by.id('password_input'));
  this.nameInput = element(by.id('name_input'));
  this.emailInput = element(by.id('email_input'));
  this.dayInput = element(by.id('day_select'));
  this.monthInput = element(by.id('month_select'));
  this.yearInput = element(by.id('year_select'));
  this.submitButton = element(by.id('submit_button'));


  // GETTERS //

  SignUpPage.prototype.getUsernameInput = function(){
      return this.usernameInput;
  };

  SignUpPage.prototype.getPasswordInput = function(){
      return this.passwordInput;
  };

  SignUpPage.prototype.getNameInput = function(){
      return this.nameInput;
  };

  SignUpPage.prototype.getEmailInput = function(){
      return this.emailInput;
  };

  SignUpPage.prototype.getDayInput = function(){
      return this.dayInput;
  };

  SignUpPage.prototype.getMonthInput = function(){
      return this.monthInput;
  };

  SignUpPage.prototype.getYearInput = function(){
      return this.yearInput;
  };

  SignUpPage.prototype.getSubmitButton = function(){
    return this.submitButton;
  };

  // SETTERS //

  SignUpPage.prototype.setUsername = function(username) {
    this.getUsernameInput().click();
    this.getUsernameInput().sendKeys(username);
  };

  SignUpPage.prototype.setPassword = function(password) {
    this.getPasswordInput().click();
    this.getPasswordInput().sendKeys(password);
  };

  SignUpPage.prototype.setName = function(name) {
    this.getNameInput().click();
    this.getNameInput().sendKeys(name);
  };

  SignUpPage.prototype.setEmail = function(email) {
    this.getEmailInput().click();
    this.getEmailInput().sendKeys(email);
  };

  SignUpPage.prototype.submit = function(email) {
    this.getSubmitButton().click();
  };


}

module.exports = SignUpPage;