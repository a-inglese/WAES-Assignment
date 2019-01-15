var commheadel = require('../page_object/commonHeaderElements'),
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


    describe('Login with correct credentials', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });

        // Jasmine Data Provider for multiple test data
        using(users.userData, function(data, description) {

            it("Given I navigate to Login page", function() {
                var self = this,
                loginLink = this.CommonHeaderElements.getLoginLink(),
                until = protractor.ExpectedConditions;

                browser.wait(until.presenceOf(loginLink), 80000, 'Login Link not present. Are you on the correct page?');

                this.CommonHeaderElements.goToLoginPage().then(function(){
                    var userInput = self.LoginPage.getUsernameInput();
                    var until = protractor.ExpectedConditions;
                    // Check for presence of Username Input. In which case we are in Login page
                    browser.wait(until.presenceOf(userInput), 80000, 'User Input not present. Are you on the correct page?');
                });
        
            });

            it("When I enter correct credentials for " + description + " and click on login button", function() {
                this.LoginPage.setUsername(data.username);
                this.LoginPage.setPassword(data.password);
                this.LoginPage.login();
            });

            it("Then I should be correctly redirected to " + description + " Profile page", function() {
                var statusMessage = this.CommonHeaderElements.getStatusMessage(),
                until = protractor.ExpectedConditions;
                browser.wait(until.presenceOf(statusMessage), 80000, 'Status Message not present. Are you on the correct page?');
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
                var until = protractor.ExpectedConditions;

                browser.wait(until.presenceOf(detailsLink), 80000, 'Details Link not present. Are you on the correct page?');
                
                this.CommonHeaderElements.goToDetailsPage().then(function(){
                    var titleContainer = self.DetailsPage.getTitleContainer();
                    // Check for presence of Title container. In wich case we are in Details page
                    browser.wait(until.presenceOf(titleContainer), 80000, 'Title container not present. Are you on the correct page?');
                });

                // Check for correct redirection in URL
                expect(browser.getCurrentUrl()).toContain(this.DetailsPage.getUrl());

            });

            it("And Details page should have correct Title displayed", function() {
                var titleDisplayed = this.DetailsPage.getContainerText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toEqual(this.DetailsPage.getTitle());
            });

            it("And name text section should read \"Name: " + data.name + "\"",  function() {
                var nameSectionText = this.DetailsPage.getContainerText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toEqual("Name: " + data.name);
            });

            it("And email text section should read \"Email address: " + data.email + "\"", function() {
                var mailSectionText = this.DetailsPage.getContainerText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toEqual("Email address: " + data.email);            
            });

            it("Should be able to log out with " + description, function() {
                self = this;
                this.CommonHeaderElements.logOut().then(function(){
                    var userInput = self.LoginPage.getUsernameInput();
                    var until = protractor.ExpectedConditions;
                    browser.wait(until.presenceOf(userInput), 80000, 'Username Input not present. Are you on the correct page?');
                });

                let statusText = this.CommonHeaderElements.getStatusMessage().getText();
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());
            });

        });
                    
    });

    describe('Login with incorrect username and password', function() {

        beforeAll(function () {
            // Ignores synchronization with angular for non-angular page,
            isAngularSite(false);
            this.HomePage = new homePage();
            browser.get(this.HomePage.getUrl());            
        });

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });
        
        it("Given I navigate to login page", function() {
            var self = this,
            loginLink = this.CommonHeaderElements.getLoginLink(),
            until = protractor.ExpectedConditions;

            // Waits for Login link to be present before clicking
            browser.wait(until.presenceOf(loginLink), 80000, 'Login Link not present. Are you on the correct page?');

            // Clicks login page link
            this.CommonHeaderElements.goToLoginPage().then(function(){
                var userInput = self.LoginPage.getUsernameInput();
                var until = protractor.ExpectedConditions;
                // Check for presence of Username Input. In which case we are in Login page
                browser.wait(until.presenceOf(userInput), 80000, 'Username Input not present. Are you on the correct page?');
            });
        });

        it("When I set wrong username and password", function() {
            this.LoginPage.setUsername('notavaliduser');
            this.LoginPage.setPassword('thisisnotavalidpassword');
            // Clicks login button
            this.LoginPage.login();            
        });

        it("Then I should see an error message", function() {
            var statusMessage = this.CommonHeaderElements.getStatusMessage(),
            until = protractor.ExpectedConditions;
            browser.wait(until.presenceOf(statusMessage), 80000, 'Status Message not present. Are you on the correct page?');

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getIncorrectCredentialsMessage());
        })

        it("And I should stay in login page", function() {
            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.LoginPage.getUrl());
        });

    });

});
