var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage'),
    signUpPage = require('../page_object/signUpPage');

describe("Check WAES Page Elements", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
        this.LoginPage = new loginPage();
        this.SignUpPage = new signUpPage();
        // Navigate to Home Page
        browser.get(this.HomePage.getUrl());
    });

        describe('Home Elements', function() {

            it("Should have header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
                
            });

            it("Should have link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
                
            });

            it("Should have link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true);
                
            });

            it("Should have link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
                
            });

            it("Should have Title", function () {
                expect(this.HomePage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Title should be \"WAES Tester Assignment\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.HomePage.getTitleElement());
                expect(titleDisplayed).toEqual(this.HomePage.getTitle());
            });

                        
        });

        describe('Login Page Elements', function() {

            beforeAll(function () {
                browser.get(this.HomePage.getUrl());
                this.CommonHeaderElements.goToLoginPage();
                let usernameInput = this.LoginPage.getUsernameInput();
                this.NavigationHelper.waitForElement(usernameInput, 'Username input not present. Are you on the correct page?');  
            });


            it("Should have header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
                
            });

            it("Should have link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            });

            it("Should have link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true); 
            });

            it("Should have link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            });

            it("Should have Status Message", function () {
                expect(this.CommonHeaderElements.getStatusMessage().isDisplayed()).toBe(true);
            });

            it("Status Message should be correct", function () {
                let statusText = this.PageObjectHelper.getElementText(this.CommonHeaderElements.getStatusMessage());
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());  
            });

            it("Should have Title", function () {
                expect(this.LoginPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Title should be \"Log in\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.LoginPage.getTitleElement());
                expect(titleDisplayed).toEqual(this.LoginPage.getTitle());
            });

            it("Should have description", function () {
                expect(this.LoginPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Should have username input", function () {
                expect(this.LoginPage.getUsernameInput().isDisplayed()).toBe(true);
            });

            it("Username input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.LoginPage.getUsernameInput());
            });        

            it("Should have password input", function () {
                expect(this.LoginPage.getPasswordInput().isDisplayed()).toBe(true);
                
            });

            it("Password input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.LoginPage.getPasswordInput());            
            });
                        
        });

         describe('Sign Up Page Elements', function() {

            beforeAll(function () {
                browser.get(this.HomePage.getUrl());
                this.CommonHeaderElements.goToSignupPage();
                let usernameInput = this.LoginPage.getUsernameInput();
                this.NavigationHelper.waitForElement(usernameInput, 'Username input not present. Are you on the correct page?');    
            });


            it("Should have header displayed", function () {
                expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
                
            });

            it("Should have link to Home Page", function () {
                expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            });

            it("Should have link to Login Page", function () {
                expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true); 
            });

            it("Should have link to Sign Up Page", function () {
                expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            });

            it("Should have Status Message", function () {
                expect(this.CommonHeaderElements.getStatusMessage().isDisplayed()).toBe(true);
            });

            it("Status Message should be correct", function () {
                let statusText = this.PageObjectHelper.getElementText(this.CommonHeaderElements.getStatusMessage());
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());  
            });

            it("Should have Title", function () {
                expect(this.SignUpPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Title should be \"Sign Up\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.SignUpPage.getTitleElement());
                expect(titleDisplayed).toEqual(this.SignUpPage.getTitle());
            });

            it("Should have description", function () {
                expect(this.SignUpPage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Should have username input", function () {
                expect(this.SignUpPage.getUsernameInput().isDisplayed()).toBe(true);
            });

            it("Username input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignUpPage.getUsernameInput());
            });        

            it("Should have password input", function () {
                expect(this.SignUpPage.getPasswordInput().isDisplayed()).toBe(true);
                
            });

            it("Password input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignUpPage.getPasswordInput());            
            });


            it("Should have name input", function () {
                expect(this.SignUpPage.getNameInput().isDisplayed()).toBe(true);
                
            });

            it("Name input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignUpPage.getNameInput());            
            });

            it("Should have email input", function () {
                expect(this.SignUpPage.getEmailInput().isDisplayed()).toBe(true);
                
            });

            it("Email input should be mandatory", function () {
                this.PageObjectHelper.isFieldRequired(this.SignUpPage.getEmailInput());            
            });



                        
        });

});
