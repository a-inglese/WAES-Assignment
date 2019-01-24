var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    users = require('../config/test_data/userData.json', 'utf8');


describe("Feature: As a User, I want to check that all pages are correctly secure", function () {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.LoginPage = new loginPage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
    });

    describe('Scenario: SQL Injection - Log In Page', function () {

        it("Given I navigate to login page", function () {
            let self = this,
                loginLink = this.CommonHeaderElements.getLoginLink();

            // Waits for Login link to be present before clicking
            this.NavigationHelper.waitForElement(loginLink, 'Login Link not present. Are you on the correct page?');

            // Clicks login page link
            this.CommonHeaderElements.goToLoginPage().then(function () {
                let userInput = self.LoginPage.getUsernameInput();
                // Check for presence of Username Input. In which case we are in Login page
                self.NavigationHelper.waitForElement(userInput, 'Username Input not present. Are you on the correct page?');
            });
        });

        it("And I set malicious code as the username", function () {
            this.LoginPage.setUsername('" or ""="');
        });

        it("And I set malicious code as the password", function () {
            this.LoginPage.setPassword('" or ""="');
        });

        it("When I click the Login button", function () {
            // Clicks login button
            this.LoginPage.login();
        });

        it("Then I should see an error message", function () {
            let statusMessage = this.CommonHeaderElements.getStatusMessage();
            this.NavigationHelper.waitForElement(statusMessage, 'Status Message not present. Are you on the correct page?');

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getIncorrectCredentialsMessage());
        })

        it("And I should stay in login page", function () {
            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.LoginPage.getUrl());
        });

    });

    describe('Scenario: SQL Injection - Sign Up Page', function () {

        it("Given I navigate to Signup page", function () {
            this.NavigationHelper.goToSignupPage();
        });

        it("And I set malicious code as the username", function () {
            this.SignupPage.setUsername('" or ""="');
        });

        it("And I set malicious code as the password", function () {
            this.SignupPage.setPassword('" or ""="');
        });

        it("When I click the Submit button", function () {
            // Clicks login button
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

    describe('Scenario: Check for HTTPS in Home Page', function () {


        it("Given I open a web browser", function () {});

        it("When I navigate to WAES Assignment homepage", function () {
            this.NavigationHelper.goToHomePage();
        });

        it("Then I should see that is an HTTPS page", function () {
            expect(browser.getCurrentUrl()).toContain("https://")
        });

    });

    describe('Scenario: Check for HTTPS in Login Page', function () {


        it("Given I am on the WAES Assignment homepage", function () {
            this.NavigationHelper.goToHomePage();
        });

        it("When I navigate to WAES Assignment homepage", function () {
            this.NavigationHelper.goToLoginPage()
        });

        it("Then I should see that it is an HTTPS page", function () {
            expect(browser.getCurrentUrl()).toContain("https://");

        });

    });

    describe('Scenario: Check for HTTPS in Signup Page', function () {


        it("Given I am on the WAES Assignment homepage", function () {
            this.NavigationHelper.goToHomePage();
        });

        it("When I navigate to Sign Up Page", function () {
            this.NavigationHelper.goToSignupPage()
        });

        it("Then I should see that it is an HTTPS page", function () {
            expect(browser.getCurrentUrl()).toContain("https://");
        });

    });

    describe('Scenario: Check for HTTPS in Profile Page', function () {

        it("Given I Log In with a valid user", function () {
            this.NavigationHelper.goToLoginPage();
            this.LoginPage.setUsername(users["admin"].username);
            this.LoginPage.setPassword(users["admin"].password);
            this.LoginPage.login();
        });

        it("When I navigate to Profile Page", function () {});

        it("Then I should see that it is an HTTPS page", function () {
            expect(browser.getCurrentUrl()).toContain("https://");
            this.NavigationHelper.logoutIfLoggedIn();
        });

    })

    describe('Scenario: Check for HTTPS in Details Page', function () {

        it("Given I Log In with a valid user", function () {
            this.NavigationHelper.goToLoginPage();
            this.LoginPage.setUsername(users["admin"].username);
            this.LoginPage.setPassword(users["admin"].password);
            this.LoginPage.login();
        });

        it("When I navigate to Details Page", function () {
            this.NavigationHelper.goToDetailsPage();
        });

        it("Then I should see that it is an HTTPS page", function () {
            expect(browser.getCurrentUrl()).toContain("https://");
        });

    })


});
