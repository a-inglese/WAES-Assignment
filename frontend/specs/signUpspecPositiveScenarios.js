const fs = require('fs');
var commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage'),
    newUserPage = require('../page_object/newUserPage'),
    signupData = JSON.parse(fs.readFileSync('frontend/config/test_data/signupData.json', 'utf8')),
    pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper');
    

describe("Feature: As a User, I want to sign up to WAES website", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular pages,
        isAngularSite(false);
        this.HomePage = new homePage();
        this.CommonHeaderElements = new commheadel();
        this.SignupPage = new signUpPage();
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.NewUserPage = new newUserPage();
        this.NavigationHelper.goToHomePage();
    });
    
    describe('Scenario: Signup with correct information', function() {

        beforeAll(function () {
            this.NavigationHelper.logoutIfLoggedIn();
            this.NavigationHelper.goToHomePage();
        });


            it("Given I navigate to Signup page with " + signupData["correct_fields"].username + " user", function() {
                this.NavigationHelper.goToSignupPage();
            });

            it("And I enter username " + signupData["correct_fields"].username, function() {
                this.SignupPage.setUsername(signupData["correct_fields"].username);
            });

            it("And I enter password " + signupData["correct_fields"].password, function() {
                this.SignupPage.setPassword(signupData["correct_fields"].password);
            });

            it("And I enter name " + signupData["correct_fields"].name, function() {
                this.SignupPage.setName(signupData["correct_fields"].name);
            });

            it("And I enter email " + signupData["correct_fields"].email, function() {
                this.SignupPage.setEmail(signupData["correct_fields"].email);
            });

            it("And I enter day of birth " + signupData["correct_fields"].dayOfBirth, function() {
                this.SignupPage.setDate(signupData["correct_fields"].dayOfBirth);
            });

            it("And I enter month " + signupData["correct_fields"].monthOfBirth, function() {
                this.SignupPage.setDate(signupData["correct_fields"].monthOfBirth);
            });

            it("And I enter year " + signupData["correct_fields"].yearOfBirth, function() {
                this.SignupPage.setDate(signupData["correct_fields"].yearOfBirth);
            });

            it("When I click Submit button", function() {
                this.SignupPage.submit();
            });

            it("Then I should get redirected to new user page", function (){
                // Wait for element text and check for correct redirection in URL
                browser.sleep(500)
                let welcomeMessage = this.NewUserPage.getWelcomeMessageElement();
                this.NavigationHelper.waitForElement(welcomeMessage, 'Welcome Message not present. Are you on the correct page?');
                expect(browser.getCurrentUrl()).toContain(this.NewUserPage.getUrl());
            });

            it("And I should see the correct page title", function (){
                var titleDisplayed = this.PageObjectHelper.getElementText(this.NewUserPage.getTitleElement());
                expect(titleDisplayed).toBe(this.NewUserPage.getTitle());
            });

            it("And I should see the welcome message - Welcome to your new profile page, " + signupData["correct_fields"].name + "!", function (){
                var welcomeMessageText = this.PageObjectHelper.getElementText(this.NewUserPage.getWelcomeMessageElement());
                expect(welcomeMessageText).toBe('Welcome to your new profile page, ' + signupData["correct_fields"].name + "!");
                this.CommonHeaderElements.logOut() 
            });

    });
    
});