var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    signUpPage = require('../page_object/signUpPage');

    beforeAll(function () {   
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
        this.CommonHeaderElements = new commheadel();
        this.SignupPage = new signUpPage();
        this.NavigationHelper.logoutIfLoggedIn(); 
    });

    describe('Feature: As a user I want to check that all Sign Up page elements & input fields are correctly defined', function() {
        
        describe("Check Sign Up page elements & input fields", function() {
            

            it("Given I am on the WAES Home page", function() {
                browser.get(this.HomePage.getUrl());     
            });

            it("When I navigate to Signup Page", function() {
                this.NavigationHelper.goToSignupPage();
            });

            it("Then I should see header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);                
            });

            it("And I should see link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            });

            it("And I should see link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true); 
            });

            it("And I should see link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            });

            it("And I should see Status Message", function () {
                expect(this.CommonHeaderElements.getStatusMessage().isDisplayed()).toBe(true);
            });

            it("And Status Message should be correct", function () {
                let statusText = this.PageObjectHelper.getElementText(this.CommonHeaderElements.getStatusMessage());
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());  
            });

            it("And I should see the Title", function () {
                expect(this.SignupPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("And Title should be \"Sign Up\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.SignupPage.getTitleElement());
                expect(titleDisplayed).toEqual(this.SignupPage.getTitle());
            });

            it("And I should see description", function () {
                expect(this.SignupPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("And I should see username input", function () {
                expect(this.SignupPage.getUsernameInput().isDisplayed()).toBe(true);
            });

            it("And username input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getUsernameInput());
            });        

            it("And I should see password input", function () {
                expect(this.SignupPage.getPasswordInput().isDisplayed()).toBe(true);                
            });

            it("And password input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getPasswordInput());            
            });


            it("And I should see name input", function () {
                expect(this.SignupPage.getNameInput().isDisplayed()).toBe(true);                
            });

            it("And name input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getNameInput());            
            });

            it("And I should see email input", function () {
                expect(this.SignupPage.getEmailInput().isDisplayed()).toBe(true);                
            });

            it("And email input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getEmailInput());            
            });

            it("And I should see day of birth drop-down", function () {
                expect(this.SignupPage.getDayInput().isDisplayed()).toBe(true);                
            });

            it("And day input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getDayInput());            
            });

            it("And I should see month of birth drop-down", function () {
                expect(this.SignupPage.getMonthInput().isDisplayed()).toBe(true);                
            });

            it("And month input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getMonthInput());            
            });

            it("And I should see year of birth drop-down", function () {
                expect(this.SignupPage.getYearInput().isDisplayed()).toBe(true);                
            });

            it("And year input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignupPage.getYearInput());            
            });
        
        });

    });