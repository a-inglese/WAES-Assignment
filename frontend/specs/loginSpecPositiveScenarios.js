const ADMIN = "admin",
    DEV = "dev",
    TEST = 'test';


var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage'),
    users = require('../config/test_data/userData.json', 'utf8');

beforeAll(function () {
    // Ignores synchronization with angular for non-angular page,
    isAngularSite(false);
    this.HomePage = new homePage();
    this.NavigationHelper = new navigationHelper();
    browser.get(this.HomePage.getUrl());
});

describe('Feature: As a registered user I want to login to WAES site', function () {

    beforeEach(function () {
        this.PageObjectHelper = new pageObjectHelper();
        this.CommonHeaderElements = new commheadel();
        this.LoginPage = new loginPage();
        this.ProfilePage = new profilePage();
        this.DetailsPage = new detailsPage();
    });

    describe("Scenario: Login with Admin user", function () {


        it("Given I navigate to Login page", function () {
            this.NavigationHelper.goToLoginPage();
        });

        it("And I enter username " + users[ADMIN].username, function () {
            this.LoginPage.setUsername(users[ADMIN].username);
        });

        it("And I enter password " + users[ADMIN].password, function () {
            this.LoginPage.setPassword(users[ADMIN].password);
        });

        it("And I click on login button", function () {
            this.LoginPage.login();
        });

        it("Then I should be correctly redirected to " + users[ADMIN].username + " Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl(), "ERROR => NOT REDIRECTED TO PROFILE PAGE");
        });

        it("And status message should be correct", function () {
            // Check that status message contains username and email for current user
            this.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                expect(text).toContain(users[ADMIN].username, "ERROR => STATUS MESSAGE SHOULD CONTAIN USERNAME");
                expect(text).toContain(users[ADMIN].email, "ERROR => STATUS MESSAGE SHOULD CONTAIN EMAIL");
            });
        });

        it("And I should be able to log out with " + users[ADMIN].username, function () {
            self = this;
            this.CommonHeaderElements.logOut().then(function () {
                let usernameInput = self.LoginPage.getUsernameInput();
                self.NavigationHelper.waitForElement(usernameInput, 'Username Input not present. Are you on the correct page?');
            });

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getNotLoggedInUserMessage());
        });
    });

    describe("Scenario: Login with Dev user", function () {


        it("Given I navigate to Login page", function () {
            this.NavigationHelper.goToLoginPage();
        });

        it("And I enter username " + users[DEV].username, function () {
            this.LoginPage.setUsername(users[DEV].username);
        });

        it("And I enter password " + users[DEV].password, function () {
            this.LoginPage.setPassword(users[DEV].password);
        });

        it("When I click Log In button", function () {
            this.LoginPage.login();
        });

        it("Then I should be correctly redirected to " + users[DEV].username + " Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());
        });

        it("And status message should be correct", function () {
            // Check that status message contains username and email for current user
            this.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                expect(text).toContain(users[DEV].username, "ERROR => STATUS MESSAGE SHOULD CONTAIN USERNAME");
                expect(text).toContain(users[DEV].email, "ERROR => STATUS MESSAGE SHOULD CONTAIN EMAIL");
            });
        });

        it("And I should be able to log out with " + users[DEV].username, function () {
            self = this;
            this.CommonHeaderElements.logOut().then(function () {
                let usernameInput = self.LoginPage.getUsernameInput();
                self.NavigationHelper.waitForElement(usernameInput, 'Username Input not present. Are you on the correct page?');
            });

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getNotLoggedInUserMessage(), "ERROR => DETAILS TITLE SHOULD BE DISPLAYED IN DETAILS PAGE");
        });
    });

    describe("Scenario: Login with Tester user", function () {


        it("Given I navigate to Login page", function () {
            this.NavigationHelper.goToLoginPage();
        });

        it("And I enter username" + users[TEST].username, function () {
            this.LoginPage.setUsername(users[TEST].username);
        });

        it("And I enter password" + users[TEST].username, function () {
            this.LoginPage.setPassword(users[TEST].password);
        });

        it("When I click Log In button" + users[TEST].username, function () {
            this.LoginPage.login();
        });

        it("Then I should be correctly redirected to " + users[TEST].username + " Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());
        });

        it("And status message should be correct", function () {
            // Check that status message contains username and email for current user
            this.CommonHeaderElements.getStatusMessage().getText().then(function (text) {
                expect(text).toContain(users[TEST].username, "ERROR => STATUS MESSAGE SHOULD CONTAIN USERNAME");
                expect(text).toContain(users[TEST].email, "ERROR => STATUS MESSAGE SHOULD CONTAIN EMAIL");
            });
        });

        it("And I should be able to log out with " + users[TEST].username, function () {
            self = this;
            this.CommonHeaderElements.logOut().then(function () {
                let usernameInput = self.LoginPage.getUsernameInput();
                self.NavigationHelper.waitForElement(usernameInput, 'Username Input not present. Are you on the correct page?');
            });

            let statusText = this.CommonHeaderElements.getStatusMessage().getText();
            expect(statusText).toBe(this.CommonHeaderElements.getNotLoggedInUserMessage(), "ERROR => USER NOT LOGGED OUT CORRECTLY");
        });

    });
});