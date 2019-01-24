var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage'),
    users = require('../config/test_data/userData.json','utf8');

    describe('Feature: As a user I want to access the Log In Page', function() {
        
        describe("Scenario: Check Login page features", function() {
            
            beforeAll(function () {   
                // Ignores synchronization with angular for non-angular page,
                isAngularSite(false);
                this.HomePage = new homePage();
                this.NavigationHelper = new navigationHelper();
                this.PageObjectHelper = new pageObjectHelper();
                this.CommonHeaderElements = new commheadel();
                this.SignupPage = new signUpPage();
                this.ProfilePage = new profilePage();
                this.DetailsPage = new detailsPage();
                this.NavigationHelper.logoutIfLoggedIn(); 
            });

            it("Given I am on the WAES Home page", function() {
                browser.get(this.HomePage.getUrl());     
            });

            it("When I navigate to Signup Page", function() {
                this.NavigationHelper.goToSignupPage();
            });

            it("Then I should see header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);                
            });

            it("Then I should see link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            });

            it("Then I should see link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true); 
            });

            it("Then I should see link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            });

            it("Then I should see Status Message", function () {
                expect(this.CommonHeaderElements.getStatusMessage().isDisplayed()).toBe(true);
            });

            it("Status Message should be correct", function () {
                let statusText = this.PageObjectHelper.getElementText(this.CommonHeaderElements.getStatusMessage());
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());  
            });

            it("Then I should see Title", function () {
                expect(this.SignupPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Title should be \"Sign Up\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.SignupPage.getTitleElement());
                expect(titleDisplayed).toEqual(this.SignupPage.getTitle());
            });

            it("Then I should see description", function () {
                expect(this.SignupPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Then I should see username input", function () {
                expect(this.SignupPage.getUsernameInput().isDisplayed()).toBe(true);
            });

            it("Username input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getUsernameInput());
            });        

            it("Then I should see password input", function () {
                expect(this.SignupPage.getPasswordInput().isDisplayed()).toBe(true);                
            });

            it("Password input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getPasswordInput());            
            });


            it("Then I should see name input", function () {
                expect(this.SignupPage.getNameInput().isDisplayed()).toBe(true);                
            });

            it("Name input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getNameInput());            
            });

            it("Then I should see email input", function () {
                expect(this.SignupPage.getEmailInput().isDisplayed()).toBe(true);                
            });

            it("Email input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getEmailInput());            
            });

            it("Then I should see day of birth drop-down", function () {
                expect(this.SignupPage.getDayInput().isDisplayed()).toBe(true);                
            });

            it("Day input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getDayInput());            
            });

            it("Then I should see month of birth drop-down", function () {
                expect(this.SignupPage.getMonthInput().isDisplayed()).toBe(true);                
            });

            it("Month input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getMonthInput());            
            });

            it("Then I should see year of birth drop-down", function () {
                expect(this.SignupPage.getYearInput().isDisplayed()).toBe(true);                
            });

            it("Year input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getYearInput());            
            });


        
        });

    });