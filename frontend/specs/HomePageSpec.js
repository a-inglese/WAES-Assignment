var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage');

describe("Feature: As a User, I want to check the correct functionality of the Home Page", function() {

    beforeAll(function() {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
    });

        describe('Scenario: Navigation to Home Page', function() {


            it("Given I open a web browser", function () {              
            });

            it("When I navigate to WAES Assignment homepage", function () {
                this.NavigationHelper.goToHomePage();                
            });

            it("Then I should have header displayed", function () {
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

            it("And I should have Title", function () {
                expect(this.HomePage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("And title should be \"WAES Tester Assignment\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.HomePage.getTitleElement());
                expect(titleDisplayed).toEqual(this.HomePage.getTitle());
            });
                        
        });

});
