const ADMIN = "admin",
    DEV = "dev",
    TEST = 'test';

var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    loginPage = require('../page_object/loginPage'),
    profilePage = require('../page_object/profilePage'),
    homePage = require('../page_object/homePage'),
    users = require('../config/test_data/userData.json', 'utf8');

describe("Feature: As a User, I want to check that only privileged users have access to the list of managed users in Profile Page", function () {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
        this.LoginPage = new loginPage();
        this.ProfilePage = new profilePage();
        this.NavigationHelper.goToHomePage();
        browser.get(this.HomePage.getUrl());
    });

    describe('Scenario: Navigation to Profile Page with user Admin', function () {

        it("Given I Log In with Admin user", function () {
            this.NavigationHelper.goToLoginPage();
            this.LoginPage.setUsername(users[ADMIN].username);
            this.LoginPage.setPassword(users[ADMIN].password);
            this.LoginPage.login();
        });

        it("When I navigate to Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());
        });

        it("Then I should see a list of managed users", function () {
            expect(this.ProfilePage.getUserListTable().isPresent()).toBe(true, "ERROR => LIST OF MANAGED USERS SHOULD BE PRESENT");
            expect(this.ProfilePage.getUserListTable().isDisplayed()).toBe(true, "ERROR => LIST OF MANAGED USERS SHOULD BE VISIBLE");
            this.NavigationHelper.logoutIfLoggedIn();
        });

    });

    describe('Scenario: Navigation to Profile Page with user Dev', function () {

        it("Given I Log In with Dev user", function () {
            this.NavigationHelper.goToLoginPage();
            this.LoginPage.setUsername(users[DEV].username);
            this.LoginPage.setPassword(users[DEV].password);
            this.LoginPage.login();
        });

        it("When I navigate to Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());
        });

        it("Then I should NOT see a list of users", function () {
            expect(browser.isElementPresent(this.ProfilePage.getUserListTable())).toBe(false, "ERROR => I SHOULDN'T BE ABLE SEE A LIST OF MANAGED USERS");
            this.NavigationHelper.logoutIfLoggedIn();
        });

    });

    describe('Scenario: Navigation to Profile Page with user Test', function () {

        it("Given I Log In with Test user", function () {
            this.NavigationHelper.goToLoginPage();
            this.LoginPage.setUsername(users[TEST].username);
            this.LoginPage.setPassword(users[TEST].password);
            this.LoginPage.login();
        });

        it("When I navigate to Profile page", function () {
            var statusMessage = this.CommonHeaderElements.getStatusMessage();

            this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.ProfilePage.getUrl());
        });

        it("Then I should NOT see a list of users", function () {
            expect(browser.isElementPresent(this.ProfilePage.getUserListTable())).toBe(false, "ERROR => I SHOULDN'T BE ABLE SEE A LIST OF MANAGED USERS");
            this.NavigationHelper.logoutIfLoggedIn();
        });

    });

    afterAll(function () {
        this.NavigationHelper.logoutIfLoggedIn();
        this.NavigationHelper.goToHomePage();
    });

});
