const ADMIN = "admin",
    DEV = "dev",
    TEST = 'test';

var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    pageDownloadHelper = require('../helpers/fileDownloaderHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    detailsPage = require('../page_object/detailsPage'),
    users = require('../config/test_data/userData.json', 'utf8');

describe("Feature: As a User, I want to check the correct functionality of the Details Page", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
        this.FileDownloadHelper = new pageDownloadHelper();
        this.LoginPage = new loginPage();
        this.DetailsPage = new detailsPage();
        browser.get(this.HomePage.getUrl());
    });

        describe('Scenario: Navigation to Details Page with user Admin', function() {


            it("Given I Log In with Admin user", function () {
                this.NavigationHelper.goToLoginPage();
                this.LoginPage.setUsername(users[ADMIN].username);
                this.LoginPage.setPassword(users[ADMIN].password);
                this.LoginPage.login();
            });

            it("When I navigate to Details page for " + users[ADMIN].username, function () {
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

            it("Then I should see correct Title displayed", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toBe(this.DetailsPage.getTitle(), "ERROR => TITLE SHOWN IS WRONG");
            });
    
            it("Then I should see that name text section reads \"Name: " + users[ADMIN].name + "\"", function () {
                let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toBe("Name: " + users[ADMIN].name, "ERROR => NAME SHOWN IS WRONG");
            });
    
            it("And email text section should read \"Email address: " + users[ADMIN].email + "\"", function () {
                let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toBe("Email address: " + users[ADMIN].email, "ERROR => EMAIL SHOWN IS WRONG");
                this.NavigationHelper.logoutIfLoggedIn();
            });
                        
        });

        describe('Scenario: Navigation to Details Page with user Dev', function() {


            it("Given I Log In with Dev user", function () {
                this.NavigationHelper.goToLoginPage();
                this.LoginPage.setUsername(users[DEV].username);
                this.LoginPage.setPassword(users[DEV].password);
                this.LoginPage.login();
            });

            it("When I navigate to Details page for " + users[DEV].username, function () {
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

            it("Then I should see correct Title displayed", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toBe(this.DetailsPage.getTitle(), "ERROR => TITLE SHOWN IS WRONG");
            });
    
            it("Then I should see that name text section reads \"Name: " + users[DEV].name + "\"", function () {
                let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toBe("Name: " + users[DEV].name, "ERROR => NAME SHOWN IS WRONG");
            });
    
            it("And email text section should read \"Email address: " + users[DEV].email + "\"", function () {
                let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toBe("Email address: " + users[DEV].email, "ERROR => EMAIL SHOWN IS WRONG");
                this.NavigationHelper.logoutIfLoggedIn();
            });
                        
        });

        describe('Scenario: Navigation to Details Page with user Test', function() {


            it("Given I Log In with Test user", function () {
                this.NavigationHelper.goToLoginPage();
                this.LoginPage.setUsername(users[TEST].username);
                this.LoginPage.setPassword(users[TEST].password);
                this.LoginPage.login();
            });

            it("When I navigate to Details page for " + users[TEST].username, function () {
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

            it("Then I should see correct Title displayed", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.DetailsPage.getTitleContainer());
                expect(titleDisplayed).toBe(this.DetailsPage.getTitle(), "ERROR => TITLE SHOWN IS WRONG");
            });
    
            it("Then I should see that name text section reads \"Name: " + users[TEST].name + "\"", function () {
                let nameSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getNameContainer());
                expect(nameSectionText).toBe("Name: " + users[TEST].name, "ERROR => NAME SHOWN IS WRONG");
            });
    
            it("And email text section should read \"Email address: " + users[TEST].email + "\"", function () {
                let mailSectionText = this.PageObjectHelper.getElementText(this.DetailsPage.getMailContainer());
                expect(mailSectionText).toBe("Email address: " + users[TEST].email, "ERROR => EMAIL SHOWN IS WRONG");
            });
                        
        });

        afterAll(function () {
            this.NavigationHelper.logoutIfLoggedIn();
            this.NavigationHelper.goToHomePage();
        });

});
