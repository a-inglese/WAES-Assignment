var commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage'),
    newUserPage = require('../page_object/newUserPage'),
    signupData = require('../config/test_data/signupData.module.js'),
    pageObjectHelper = require('../helpers/pageObjectHelper'),
    using = require('jasmine-data-provider');

describe("As a User, I want to sign up to WAES website", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular pages,
        isAngularSite(false);
        this.HomePage = new homePage();
        browser.get(this.HomePage.getUrl());
    });
   

    describe('Signup with correct information', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.SignupPage = new signUpPage();
            this.NewUserPage = new newUserPage();
            this.PageObjectHelper = new pageObjectHelper();
        });

        // Jasmine Data Provider for multiple test data
        using(signupData.correctUserData, function(data, description) {

            it("Given I navigate to Signup page with user with " + description, function() {
                var self = this,
                signupLink = this.CommonHeaderElements.getSignupLink(),
                until = protractor.ExpectedConditions;

                browser.wait(until.presenceOf(signupLink), 30000, 'Signup Link not present. Are you on the correct page?');

                this.CommonHeaderElements.goToSignupPage().then(function(){
                    var userInput = self.SignupPage.getUsernameInput();
                    var until = protractor.ExpectedConditions;
                    // Check for presence of Username Input. In which case we are in Login page
                    browser.wait(until.presenceOf(userInput), 30000, 'User Input not present. Are you on the correct page?');
                });
            });

            it("And I enter username " + data.username, function() {
                this.SignupPage.setUsername(data.username);
            });

            it("And I enter password " + data.password, function() {
                this.SignupPage.setPassword(data.password);
            });

            it("And I enter name " + data.name, function() {
                this.SignupPage.setName(data.name);
            });

            it("And I enter email " + data.email, function() {
                this.SignupPage.setEmail(data.email);
            });

            it("And I enter day of birth " + data.dayOfBirth, function() {
                this.SignupPage.setDate(data.dayOfBirth);
            });

            it("And I enter month " + data.monthOfBirth, function() {
                this.SignupPage.setDate(data.monthOfBirth);
            });

            it("And I enter year " + data.yearOfBirth, function() {
                this.SignupPage.setDate(data.yearOfBirth);
            });

            it("When I click Submit button", function() {
                this.SignupPage.submit();
            });

            it("Then I should get redirected to new user page", function (){
                // Check for correct redirection in URL
                expect(browser.getCurrentUrl()).toContain(this.NewUserPage.getUrl());
            });

            it("And I should see the correct page title", function (){
                var titleDisplayed = this.PageObjectHelper.getContainerText(this.NewUserPage.getTitleContainer());
                expect(titleDisplayed).toBe(this.NewUserPage.getTitle());
            });

            it("And I should see the welcome message - Welcome to your new profile page,  " + data.name + "!", function (){
                var welcomeMessageText = this.PageObjectHelper.getContainerText(this.NewUserPage.getWelcomeMessageContainer());
                expect(welcomeMessageText).toBe('Welcome to your new profile page, ' + data.name + "!");
                this.CommonHeaderElements.logOut() 
            });

        });

    });

    describe('Signup with incorrect information', function() {

        beforeAll(function () {
            // Ignores synchronization with angular for non-angular pages,
            isAngularSite(false);
            this.HomePage = new homePage();
            browser.get(this.HomePage.getUrl());
        });

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.SignupPage = new signUpPage();
            this.NewUserPage = new newUserPage();
            this.PageObjectHelper = new pageObjectHelper();
        });

        // Jasmine Data Provider for multiple test data
        using(signupData.incorrectUserData, function(data, description) {

            it("Given I navigate to Signup page with user with " + description, function() {
                var self = this,
                signupLink = this.CommonHeaderElements.getSignupLink(),
                until = protractor.ExpectedConditions;

                browser.wait(until.presenceOf(signupLink), 30000, 'Signup Link not present. Are you on the correct page?');

                this.CommonHeaderElements.goToSignupPage().then(function(){
                    var userInput = self.SignupPage.getUsernameInput();
                    var until = protractor.ExpectedConditions;
                    // Check for presence of Username Input. In which case we are in Login page
                    browser.wait(until.presenceOf(userInput), 30000, 'User Input not present. Are you on the correct page?');
                });
            });

            it("And I enter all signup information", function() {
                this.SignupPage.setUsername(data.username);
                this.SignupPage.setPassword(data.password);
                this.SignupPage.setName(data.name);
                this.SignupPage.setEmail(data.email);
                this.SignupPage.setDate(data.dayOfBirth);
                this.SignupPage.setDate(data.monthOfBirth);
                this.SignupPage.setDate(data.yearOfBirth);
            });

            it("When I click Submit button", function() {
                this.SignupPage.submit();
            });

            it("Then I should stay on the SignUp page", function (){
                // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
                // Check that current URL is NOT 'https://waesworks.bitbucket.io/app/newUser'
                expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl());
                expect(browser.getCurrentUrl()).not.toBe(this.NewUserPage.getUrl());
                
                // Return to homepage
                browser.get(this.HomePage.getUrl())
            });

        });
    });

});
