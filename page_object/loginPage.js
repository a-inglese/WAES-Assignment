function LoginPage () {
  this.usernameInput = element(by.id('username_input'));
  this.passwordInput = element(by.id('password_input'));
  this.loginButton = element(by.id('login_button'));


  // GETTERS //

  LoginPage.prototype.getUsernameInput = function(){
      return this.usernameInput;
  };

  LoginPage.prototype.getPasswordInput = function(){
      return this.passwordInput;
  };

  LoginPage.prototype.getLoginButton = function(){
    return this.loginButton;
};

  LoginPage.prototype.setUsername = function(username) {
    this.getUsernameInput().click();
    this.getUsernameInput().sendKeys(username);
  };

  LoginPage.prototype.setPassword = function(password) {
    this.getPasswordInput().click();
    this.getPasswordInput().sendKeys(password);
  };

  LoginPage.prototype.login = function() {
    return this.getLoginButton().click();
  };


}

module.exports = LoginPage;