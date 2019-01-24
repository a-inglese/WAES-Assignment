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

        it("And I should see a list of managed users", function () {
            expect(this.ProfilePage.getUserListTable().isPresent()).toBe(true, "ERROR => LIST OF MANAGED USERS SHOULD BE PRESENT");
            expect(this.ProfilePage.getUserListTable().isDisplayed()).toBe(true, "ERROR => LIST OF MANAGED USERS SHOULD BE VISIBLE");
        });

        it("And I should be able to navigate to Details page for " + users[ADMIN].username, function () {
            var self = this;
            var detailsLink = this.CommonHeaderElements.getDetailsLink();

            this.NavigationHelper.waitForElement(detailsLink, 'Details Link not present. Are you on the correct page?');

            this.CommonHeaderElements.goToDetailsPage().then(function () {
                let titleContainer = self.DetailsPage.getTitleContainer();
                // Check for presence of Title container. In wich case we are in Details page
                self.NavigationHelper.waitForElement(titleContainer, 'Title container not present. Are you on the correct page?');
            });

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.DetailsPage.getUrl(), "ERROR => NOT REDIRECTED TO DETAILS PAGE");

        });

        it("And Details page should have correct Title displayed", function () {
            let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
            expect(titleDisplayed).toEqual(this.DetailsPage.getTitle());
        });

        it("And name text section should read \"Name: " + users[ADMIN].name + "\"", function () {
            let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
            expect(nameSectionText).toEqual("Name: " + users[ADMIN].name);
        });

        it("And email text section should read \"Email address: " + users[ADMIN].email + "\"", function () {
            let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
            expect(mailSectionText).toEqual("Email address: " + users[ADMIN].email);
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

        it("When I enter password " + users[DEV].username, function () {
            this.LoginPage.setUsername(users[DEV].username);
            this.LoginPage.setPassword(users[DEV].password);
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

        it("And I should NOT see a list of managed users", function () {
            expect(browser.isElementPresent(this.ProfilePage.getUserListTable())).toBe(false, "ERROR => I SHOULDN'T BE ABLE SEE A LIST OF MANAGED USERS");
        });

        it("And I should be able to navigate to Details page for " + users[DEV].username, function () {
            var self = this;
            var detailsLink = this.CommonHeaderElements.getDetailsLink();

            this.NavigationHelper.waitForElement(detailsLink, 'Details Link not present. Are you on the correct page?');

            this.CommonHeaderElements.goToDetailsPage().then(function () {
                let titleContainer = self.DetailsPage.getTitleContainer();
                // Check for presence of Title container. In wich case we are in Details page
                self.NavigationHelper.waitForElement(titleContainer, 'Title container not present. Are you on the correct page?');
            });

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.DetailsPage.getUrl(), "ERROR => NOT REDIRECTED TO DETAILS PAGE");

        });

        it("And Details page should have correct Title displayed", function () {
            let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
            expect(titleDisplayed).toBe(this.DetailsPage.getTitle(), "ERROR => DETAILS TITLE SHOULD BE DISPLAYED \"YOUR DETAILS\"");
        });

        it("And name text section should read \"Name: " + users[DEV].name + "\"", function () {
            let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
            expect(nameSectionText).toBe("Name: " + users[DEV].name, "ERROR => INCORRECT NAME IN DETAILS PAGE");
        });

        it("And email text section should read \"Email address: " + users[DEV].email + "\"", function () {
            let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
            expect(mailSectionText).toBe("Email address: " + users[DEV].email, "ERROR => INCORRECT EMAIL IN DETAILS PAGE");
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

        it("When I enter password " + users[TEST].username, function () {
            this.LoginPage.setUsername(users[TEST].username);
            this.LoginPage.setPassword(users[TEST].password);
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

        it("And I should NOT see a list of users", function () {
            expect(browser.isElementPresent(this.ProfilePage.getUserListTable())).toBe(false, "ERROR => I SHOULDN'T BE ABLE SEE A LIST OF MANAGED USERS");
        });

        it("And I should be able to navigate to Details page for " + users[TEST].username, function () {
            var self = this;
            var detailsLink = this.CommonHeaderElements.getDetailsLink();

            this.NavigationHelper.waitForElement(detailsLink, 'Details Link not present. Are you on the correct page?');

            this.CommonHeaderElements.goToDetailsPage().then(function () {
                let titleContainer = self.DetailsPage.getTitleContainer();
                // Check for presence of Title container. In wich case we are in Details page
                self.NavigationHelper.waitForElement(titleContainer, 'Title container not present. Are you on the correct page?');
            });

            // Check for correct redirection in URL
            expect(browser.getCurrentUrl()).toBe(this.DetailsPage.getUrl(), "ERROR => USER NOT CORRECTLY REDIRECTED TO DETAILS PAGE");

        });

        it("And Details page should have correct Title displayed", function () {
            let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
            expect(titleDisplayed).toBe(this.DetailsPage.getTitle(), "ERROR => TITLE SHOWN IS WRONG");
        });

        it("And name text section should read \"Name: " + users[DEV].name + "\"", function () {
            let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
            expect(nameSectionText).toBe("Name: " + users[TEST].name, "ERROR => NAME SHOWN IS WRONG");
        });

        it("And email text section should read \"Email address: " + users[TEST].email + "\"", function () {
            let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
            expect(mailSectionText).toBe("Email address: " + users[TEST].email, "ERROR => EMAIL SHOWN IS WRONG");
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