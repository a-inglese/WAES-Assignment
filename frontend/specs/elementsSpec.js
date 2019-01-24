var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    pageDownloadHelper = require('../helpers/fileDownloaderHelper'),
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
        this.FileDownloadHelper = new pageDownloadHelper();
    });

        describe('Scenario: Home Elements', function() {


            it("Given I am on the Home Page", function () {
                this.NavigationHelper.goToHomePage();                
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

            it("Should have Title", function () {
                expect(this.HomePage.getTitleElement().isDisplayed()).toBe(true);
            });

            it("Title should be \"WAES Tester Assignment\"", function () {
                let titleDisplayed = this.PageObjectHelper.getElementText(this.HomePage.getTitleElement());
                expect(titleDisplayed).toEqual(this.HomePage.getTitle());
            });
                        
        });

        describe('Scenario: File Download', function() {

            it("Given I am on the Home Page", function () {
                this.NavigationHelper.goToHomePage();                
            });

            it("When I click on the download link", function () {
                this.HomePage.clickDownload();          
            });

            it("Then I should be able to download the PDF file", function () {
                this.FileDownloadHelper.waitForDownload();              
            });
                        
        });

});
