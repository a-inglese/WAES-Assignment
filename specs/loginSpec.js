var commheadel = require('../page_object/commonHeaderElements'),
    loginPage = require('../page_object/loginPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage'),
    users = require('../config/test_data/userData.module.js'),
    using = require('jasmine-data-provider');

describe("Check WAES Log In Process", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        browser.get("https://waesworks.bitbucket.io/");
    });


    describe('Login with correct username and password', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });

        // Jasmine Data Provider for multiple 
        using(users.userData, function(data, description) {

            it("Should be able to login with " + description, function() {
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

                this.LoginPage.setUsername(data.username);
                this.LoginPage.setPassword(data.password);
                this.LoginPage.login();
        
            });

            it("Should correctly redirect " + description + " to Profile page", function() {
                var statusMessage = this.CommonHeaderElements.getStatusMessage(),
                until = protractor.ExpectedConditions;
                browser.wait(until.presenceOf(statusMessage), 80000, 'Status Message not present. Are you on the correct page?');
                // Check that status message contains username and email for current user
                this.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                    expect(text).toContain(data.username);
                    expect(text).toContain(data.mail);
                });
                
                // Check for correct redirection in URL
                expect(browser.getCurrentUrl()).toContain(this.ProfilePage.getUrl());                
            });

            it("Should be able to navigate to Details page for " + description, function() {
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

            it("Details page should have correct Title displayed", function() {
                var titleDisplayed = this.DetailsPage.getContainerText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toEqual(this.DetailsPage.getTitle());
            });

            it("Name text section should read \"Name: " + data.name, + "\"", function() {
                var nameSectionText = this.DetailsPage.getContainerText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toEqual("Name: " + data.name);
            });

            it("Email text section should read \"Email address: " + data.mail + "\"", function() {
                var mailSectionText = this.DetailsPage.getContainerText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toEqual("Email address: " + data.mail);            
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

                var EC = protractor.ExpectedConditions;
                var condition = EC.textToBePresentInElement(this.CommonHeaderElements.getStatusMessage().getText(), this.CommonHeaderElements.getNotLoggedInUserMessage());

                browser.wait(condition, 3000, 'text is still not present').
                    then(function() {
                        self.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                        expect(text).toEqual(self.CommonHeaderElements.getNotLoggedInUserMessage());
                        });
                    });
            });

        });
                    
    });

    describe('Login with incorrect username and password', function() {

        beforeAll(function () {
            // Ignores synchronization with angular for non-angular page,
            isAngularSite(false);
            browser.get("https://waesworks.bitbucket.io/");
        });

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });
        
        it("Should not be able to login with incorrect credentials ", function() {
            var self = this,
            loginLink = this.CommonHeaderElements.getLoginLink(),
            until = protractor.ExpectedConditions;

            browser.wait(until.presenceOf(loginLink), 80000, 'Login Link not present. Are you on the correct page?');

            this.CommonHeaderElements.goToLoginPage().then(function(){
                var userInput = self.LoginPage.getUsernameInput();
                var until = protractor.ExpectedConditions;
                // Check for presence of Username Input. In which case we are in Login page
                browser.wait(until.presenceOf(userInput), 80000, 'Username Input not present. Are you on the correct page?');
            });

            this.LoginPage.setUsername('notavaliduser');
            this.LoginPage.setPassword('thisisnotavalidpassword');
            this.LoginPage.login();

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toEqual(this.CommonHeaderElements.getIncorrectCredentialsMessage());

            var EC = protractor.ExpectedConditions;
            var condition = EC.textToBePresentInElement(this.CommonHeaderElements.getStatusMessage().getText(), this.CommonHeaderElements.getIncorrectCredentialsMessage());

            browser.wait(condition, 3000, 'text is still not present').
                then(function() {
                    self.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                    expect(text).toEqual(self.CommonHeaderElements.getIncorrectCredentialsMessage());
                    });
                });
    
        });

    });

});
