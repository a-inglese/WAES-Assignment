var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage'),
    users = require('../config/test_data/userData.module.js'),
    using = require('jasmine-data-provider');

describe("As a User, I want log in to WAES website", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        this.HomePage = new homePage();
        browser.get(this.HomePage.getUrl());
    });


    describe('Positive Case - Login with correct credentials', function() {

        beforeEach(function() {
            this.PageObjectHelper = new pageObjectHelper();
            this.NavigationHelper = new navigationHelper();
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });

        // Jasmine Data Provider for multiple test data
        using(users.userData, function(data, description) {

            it("Given I navigate to Login page", function() {
                var self = this,
                loginLink = this.CommonHeaderElements.getLoginLink();

                this.NavigationHelper.waitForElement(loginLink, 'Login Link input not present. Are you on the correct page?');

                this.CommonHeaderElements.goToLoginPage().then(function(){
                    var userInput = self.LoginPage.getUsernameInput();
                    // Check for presence of Username Input. In which case we are in Login page
                    self.NavigationHelper.waitForElement(userInput, 'User input not present. Are you on the correct page?');
                });
        
            });

            it("When I enter correct credentials for " + description + " and click on login button", function() {
                this.LoginPage.setUsername(data.username);
                this.LoginPage.setPassword(data.password);
                this.LoginPage.login();
            });

            it("Then I should be correctly redirected to " + description + " Profile page", function() {
                var statusMessage = this.CommonHeaderElements.getStatusMessage();
                
                this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');
                // Check that status message contains username and email for current user
                this.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                    expect(text).toContain(data.username);
                    expect(text).toContain(data.email);
                });
                
                // Check for correct redirection in URL
                expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());                
            });

            it("And I should be able to navigate to Details page for " + description, function() {
                var self = this;
                var detailsLink = this.CommonHeaderElements.getDetailsLink();

                this.NavigationHelper.waitForElement(detailsLink, 'Details Link not present. Are you on the correct page?');
                
                this.CommonHeaderElements.goToDetailsPage().then(function(){
                    let titleContainer = self.DetailsPage.getTitleContainer();
                    // Check for presence of Title container. In wich case we are in Details page
                    self.NavigationHelper.waitForElement(titleContainer, 'Title container not present. Are you on the correct page?');
                });

                // Check for correct redirection in URL
                expect(browser.getCurrentUrl()).toBe(this.DetailsPage.getUrl());

            });

            it("And Details page should have correct Title displayed", function() {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toEqual(this.DetailsPage.getTitle());
            });

            it("And name text section should read \"Name: " + data.name + "\"",  function() {
                let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toEqual("Name: " + data.name);
            });

            it("And email text section should read \"Email address: " + data.email + "\"", function() {
                let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toEqual("Email address: " + data.email);            
            });

            it("And I should be able to log out with " + description, function() {
                self = this;
                this.CommonHeaderElements.logOut().then(function(){
                    let usernameInput = self.LoginPage.getUsernameInput();
                    self.NavigationHelper.waitForElement(usernameInput, 'Username Input not present. Are you on the correct page?');
                });

                let statusText = this.CommonHeaderElements.getStatusMessage().getText();
                expect(statusText).toBe(this.CommonHeaderElements.getNotLoggedInUserMessage());
            });

        });
                    
    });

    describe('Negative Case - Login with incorrect username and password', function() {

        beforeAll(function () {
            // Ignores synchronization with angular for non-angular page,
            isAngularSite(false);
            this.HomePage = new homePage();
            browser.get(this.HomePage.getUrl());            
        });

        beforeEach(function() {
            this.NavigationHelper = new navigationHelper();
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });
        
        it("Given I navigate to login page", function() {
            let self = this,
            loginLink = this.CommonHeaderElements.getLoginLink();

            // Waits for Login link to be present before clicking
            this.NavigationHelper.waitForElement(loginLink, 'Login Link not present. Are you on the correct page?');

            // Clicks login page link
            this.CommonHeaderElements.goToLoginPage().then(function(){
                let userInput = self.LoginPage.getUsernameInput();
                // Check for presence of Username Input. In which case we are in Login page
                self.NavigationHelper.waitForElement(userInput, 'Username Input not present. Are you on the correct page?');
            });
        });

        it("When I set wrong username and password", function() {
            this.LoginPage.setUsername('notavaliduser');
            this.LoginPage.setPassword('thisisnotavalidpassword');
            // Clicks login button
            this.LoginPage.login();            
        });

        it("Then I should see an error message", function() {
            let statusMessage = this.CommonHeaderElements.getStatusMessage();
            this.NavigationHelper.waitForElement(statusMessage, 'Status Message not present. Are you on the correct page?');

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getIncorrectCredentialsMessage());
        })

        it("And I should stay in login page", function() {
            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.LoginPage.getUrl());
        });

    });

});
