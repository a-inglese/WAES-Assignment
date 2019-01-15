function CommonHeaderElements () {
    this.header = $('.header-module--header--1NBeb');
    this.statusMessage = element(by.id('status'));
    this.homeLink = element(by.id('home_link'));
    this.loginLink = element(by.id('login_link'));
    this.logoutLink = element(by.linkText('log out'));
    this.signupLink = element(by.id('signup_link'));
    this.detailsLink = element(by.id('details_link'));
    this.profileLink = element(by.id('profile_link'));

    this.notLoggedInUser = 'To get the full hero experience, you’ll need to log in.';
    this.incorrectCredentials = 'Wrong credentials. You can do it, try again!';


    // GETTERS //

    CommonHeaderElements.prototype.getHeader = function(){
        return this.header;
    };

    CommonHeaderElements.prototype.getHomeLink = function(){
        return this.homeLink;
    };

    CommonHeaderElements.prototype.getLoginLink = function(){
        return this.loginLink;
    };

    CommonHeaderElements.prototype.getLogoutLink = function(){
        return this.logoutLink;
    };

    CommonHeaderElements.prototype.getSignupLink = function(){
        return this.signupLink;
    };

    CommonHeaderElements.prototype.getDetailsLink = function(){
        return this.detailsLink;
    };

    CommonHeaderElements.prototype.getProfileLink = function(){
        return this.profileLink;
    };

    CommonHeaderElements.prototype.getStatusMessage = function(){
        return this.statusMessage;
    };

    CommonHeaderElements.prototype.getNotLoggedInUserMessage = function(){
        return this.notLoggedInUser;
    };

    CommonHeaderElements.prototype.getIncorrectCredentialsMessage = function(){
        return this.incorrectCredentials;
    };


    // ACTIONS //

    CommonHeaderElements.prototype.goToHomePage = function(){
        return this.getHomeLink().click();
    };

    CommonHeaderElements.prototype.goToLoginPage = function(){
        return this.getLoginLink().click();
    };

    CommonHeaderElements.prototype.goToSignupPage = function(){
        return this.getSignupLink().click();
    };

    CommonHeaderElements.prototype.goToDetailsPage = function(){
        return this.getDetailsLink().click();
    };

    CommonHeaderElements.prototype.goToProfilePage = function(){
        return this.getProfileLink().click();
    };

    CommonHeaderElements.prototype.logOut = function(){
        return this.getLogoutLink().click();
    };

}

module.exports = CommonHeaderElements;