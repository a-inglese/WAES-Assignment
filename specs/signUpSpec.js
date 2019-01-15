var commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage'),
    signupData = require('../config/test_data/signupData.module.js'),
    using = require('jasmine-data-provider');

describe("As a User, I want to sign up to WAES website", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        this.HomePage = new homePage();
        browser.get(this.HomePage.getUrl());  
    });
   

    describe('Signup with correct username and password', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.SignupPage = new signUpPage();
        });

        // Jasmine Data Provider for multiple test data
        using(signupData.userData, function(data, description) {

            it("Given I navigate to Signup page", function() {
                var self = this,
                signupLink = this.CommonHeaderElements.getSignupLink(),
                until = protractor.ExpectedConditions;

                browser.wait(until.presenceOf(signupLink), 80000, 'Signup Link not present. Are you on the correct page?');

                this.CommonHeaderElements.goToSignupPage().then(function(){
                    var userInput = self.SignupPage.getUsernameInput();
                    var until = protractor.ExpectedConditions;
                    // Check for presence of Username Input. In which case we are in Login page
                    browser.wait(until.presenceOf(userInput), 80000, 'User Input not present. Are you on the correct page?');
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

            it("When I click Submit button", function() {
                this.SignupPage.submit();
            });

        });

    });

});
