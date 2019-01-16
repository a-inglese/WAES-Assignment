var navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage'),
    loginPage = require('../page_object/loginPage');

describe("As a User, I want to Log Out from WAES website", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        this.NavigationHelper = new navigationHelper();
        this.HomePage = new homePage();
        browser.get(this.HomePage.getUrl());  
    });


    describe('Logout functionality', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
        });

        // Jasmine Data Provider for multiple test data        

            it("Given I'm logged in with a valid username and password", function() {
                var self = this,
                loginLink = this.CommonHeaderElements.getLoginLink();

                this.NavigationHelper.waitForElement(loginLink, 'Login Link not present. Are you on the correct page?');

                this.CommonHeaderElements.goToLoginPage().then(function(){
                    let userInput = self.LoginPage.getUsernameInput();
                    // Check for presence of Username Input. In which case we are in Login page
                    self.NavigationHelper.waitForElement(userInput, 'User Input not present. Are you on the correct page?');
                });

                this.LoginPage.setUsername('admin');
                this.LoginPage.setPassword('hero');
                this.LoginPage.login();     
            });


            it("When I click on Logout link", function() {
                // Wait until logged in
                let statusMessage = this.CommonHeaderElements.getStatusMessage();
                
                this.NavigationHelper.waitForTextInElement(statusMessage, 'Logged in as', 'Incorrect Status Text. Are you on the correct page?');
                
                this.CommonHeaderElements.logOut()        
            });

            it("Then I should be correctly redirected to Login page", function() {
                // Check for correct redirection in URL
                // Wait for element text and check for correct redirection in URL                
                let userInput = self.LoginPage.getUsernameInput();

                this.NavigationHelper.waitForElement(userInput, 'User Input not present. Are you on the correct page?');
                expect(browser.getCurrentUrl()).toBe(this.LoginPage.getUrl());                  
            });

            it("And Status Message prompting to log in should be displayed", function() {
                let statusText = this.CommonHeaderElements.getStatusMessage().getText();
                expect(statusText).toEqual(this.CommonHeaderElements.getNotLoggedInUserMessage());               
            });
                    
    });

});
