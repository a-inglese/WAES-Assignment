var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage');

    describe('Feature: As a user I want to check that all input fields are correctly defined', function() {
        
        describe("Scenario: Check Login page features", function() {
            
            beforeAll(function () {   
                // Ignores synchronization with angular for non-angular page,
                isAngularSite(false);
                this.HomePage = new homePage();
                this.NavigationHelper = new navigationHelper();
                this.PageObjectHelper = new pageObjectHelper();
                this.CommonHeaderElements = new commheadel();
                this.LoginPage = new loginPage();
                this.ProfilePage = new profilePage();
                this.DetailsPage = new detailsPage();
                this.NavigationHelper.logoutIfLoggedIn(); 
            });

            it("Given I am on the WAES Home page", function() {
                browser.get(this.HomePage.getUrl());     
            });

            it("When I click on Login Button on the Header", function() {
                this.NavigationHelper.goToLoginPage();
            });

            it("Then I should navigate to Log in Page", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
                
            });

            it("And I should have header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
                
            });

            it("And I should have link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            });

            it("And I should have link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true); 
            });

            it("And I should have link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            });

            it("And I should have Status Message", function () {
                expect(this.CommonHeaderElements.getStatusMessage().isDisplayed()).toBe(true);
            });

            it("And status Message should be correct", function () {
                let statusText = this.PageObjectHelper.getElementText(this.CommonHeaderElements.getStatusMessage());
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());  
            });

            it("And it should have Title", function () {
                expect(this.LoginPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("And title should be \"Log in\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.LoginPage.getTitleElement());
                expect(titleDisplayed).toEqual(this.LoginPage.getTitle());
            });

            it("And it should have description", function () {
                expect(this.LoginPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("And it should have username input", function () {
                expect(this.LoginPage.getUsernameInput().isDisplayed()).toBe(true);
            });

            it("And username input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.LoginPage.getUsernameInput());
            });        

            it("And it should have password input", function () {
                expect(this.LoginPage.getPasswordInput().isDisplayed()).toBe(true);
                
            });

            it("And password input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.LoginPage.getPasswordInput());            
            });
        
        });

    });