const fs = require('fs');
var commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage'),
    newUserPage = require('../page_object/newUserPage'),
    signupData = JSON.parse(fs.readFileSync('frontend/config/test_data/signupData.json', 'utf8')),
    pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    using = require('jasmine-data-provider');


describe("Feature: As a User, I want the WAES site not to let me signup if data is invalid", function () {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular pages,
        isAngularSite(false);
        this.HomePage = new homePage();
        this.CommonHeaderElements = new commheadel();
        this.SignupPage = new signUpPage();
        this.PageObjectHelper = new pageObjectHelper();
        this.NavigationHelper = new navigationHelper();
        this.NavigationHelper.goToHomePage();
        this.NavigationHelper.logoutIfLoggedIn();
    });

    describe('Scenario: Signup without completing any fields', function () {

        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I do not enter any username", function () {});

        it("And I do not enter any name", function () {});

        it("And I do not enter any email", function () {});

        it("And I do not enter any day of birth", function () {});

        it("And I do not enter any month of birth", function () {});

        it("And I do not enter any year of birth", function () {});

        it("And I do not enter any name", function () {});

        it("When I click Submit button", function () {
            this.SignupPage.submit();
        });

        it("Then I should stay on the SignUp page and should not be registered", function () {
            // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
            expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl(), "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH BLANK PASSWORD");

            // Return to homepage
            this.NavigationHelper.goToHomePage();
        });

    });
    

    describe('Scenario: Signup with incorrect password', function () {

        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I enter all correct signup information", function () {
            this.SignupPage.setUsername(signupData['correct_fields'].username);
            this.SignupPage.setName(signupData['correct_fields'].name);
            this.SignupPage.setEmail(signupData['correct_fields'].email);
            this.SignupPage.setDate(signupData['correct_fields'].dayOfBirth);
            this.SignupPage.setDate(signupData['correct_fields'].monthOfBirth);
            this.SignupPage.setDate(signupData['correct_fields'].yearOfBirth);
        });

        it("And I do not enter password", function () {});

        it("When I click Submit button", function () {
            this.SignupPage.submit();
        });

        it("Then I should stay on the SignUp page and should not be registered", function () {
            // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
            expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl(), "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH BLANK PASSWORD");

            // Return to homepage
            this.NavigationHelper.goToHomePage();
        });

    });

    describe('Scenario: Signup with invalid email', function () {

        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I enter all correct signup information", function () {
            this.SignupPage.setUsername(signupData['correct_fields'].username);
            this.SignupPage.setPassword(signupData['correct_fields'].password);
            this.SignupPage.setName(signupData['correct_fields'].name);
            this.SignupPage.setDate(signupData['correct_fields'].dayOfBirth);
            this.SignupPage.setDate(signupData['correct_fields'].monthOfBirth);
            this.SignupPage.setDate(signupData['correct_fields'].yearOfBirth);
        });

        it("And I enter invalid email", function () {
            this.SignupPage.setEmail(signupData['invalid_email'].email);
        });

        it("When I click Submit button", function () {
            this.SignupPage.submit();
        });

        it("Then I should stay on the SignUp page and should not be registered", function () {
            // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
            expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl(), "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH INVALID EMAIL");

            // Return to homepage
            this.NavigationHelper.goToHomePage();
        });

    });

    describe('Scenario: Signup with invalid birth date', function () {

        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I enter all correct signup information", function () {
            this.SignupPage.setUsername(signupData['correct_fields'].username);
            this.SignupPage.setPassword(signupData['correct_fields'].password);
            this.SignupPage.setName(signupData['correct_fields'].name);
            this.SignupPage.setEmail(signupData['correct_fields'].email);
        });

        it("And I enter invalid birth date", function () {
            this.SignupPage.setDate(signupData['invalid_birth_date'].dayOfBirth);
            this.SignupPage.setDate(signupData['invalid_birth_date'].monthOfBirth);
            this.SignupPage.setDate(signupData['invalid_birth_date'].yearOfBirth);
        });

        it("When I click Submit button", function () {
            this.SignupPage.submit();
        });

        it("Then I should stay on the SignUp page and should not be registered", function () {
            // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
            var EC = protractor.ExpectedConditions;
            // Waits for the element with id 'myInput' to contain the input 'foo'.
            browser.wait(EC.textToBePresentInElement(this.SignupPage.getTitleElement(), this.SignupPage.getTitle()), 1000, "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH INVALID BIRTH DATE");
            expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl(), "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH INVALID BIRTH DATE");

            // Return to homepage
            this.NavigationHelper.goToHomePage();
        });

    });

    describe('Scenario: Signup with user already registered', function () {
        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I enter all signup information for an already registered user", function () {
            this.SignupPage.setUsername(signupData['admin'].username);
            this.SignupPage.setPassword(signupData['admin'].password);
            this.SignupPage.setName(signupData['admin'].name);
            this.SignupPage.setEmail(signupData['admin'].email);
            this.SignupPage.setDate(signupData['admin'].dayOfBirth);
            this.SignupPage.setDate(signupData['admin'].monthOfBirth);
            this.SignupPage.setDate(signupData['admin'].yearOfBirth);
        });

        it("When I click Submit button", function () {
            this.SignupPage.submit();
        });

        it("Then I should stay on the SignUp page and should not be registered", function () {
            // Check that current URL is 'https://waesworks.bitbucket.io/app/signUp'
            var EC = protractor.ExpectedConditions;
            // Waits for the element with id 'myInput' to contain the input 'foo'.
            browser.wait(EC.textToBePresentInElement(this.SignupPage.getTitleElement(), this.SignupPage.getTitle()), 1000, "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH AN EXISTING USER");
            expect(browser.getCurrentUrl()).toBe(this.SignupPage.getUrl(), "ERROR => I SHOULDN'T BE ABLE TO SIGNUP WITH AN EXISTING USER");

            // Return to homepage
            this.NavigationHelper.goToHomePage();
        });
    });

    afterEach(function () {
        this.NavigationHelper.logoutIfLoggedIn();
    });

    afterAll(function () {
        this.NavigationHelper.logoutIfLoggedIn();
    });

});
