var navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage');

beforeAll(function () {
    // Ignores synchronization with angular for non-angular page,
    isAngularSite(false);
    this.HomePage = new homePage();
    browser.get(this.HomePage.getUrl());
});

describe('Feature: I want to check the Login page in case of unexpected user behavior', function () {


    beforeEach(function () {
        this.NavigationHelper = new navigationHelper();
        this.CommonHeaderElements = new commheadel();
        this.LoginPage = new loginPage();
    });

    describe('Scenario: Login with incorrect username and password', function () {

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

        it("And I set wrong username", function () {
            this.LoginPage.setUsername('notavaliduser');
        });

        it("And I set wrong password", function () {
            this.LoginPage.setPassword('thisisnotavalidpassword');
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

});