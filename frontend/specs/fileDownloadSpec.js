var pageObjectHelper = require('../helpers/pageObjectHelper'),
    navigationHelper = require('../helpers/navigationHelper'),
    pageDownloadHelper = require('../helpers/fileDownloaderHelper'),
    commheadel = require('../page_object/commonHeaderElements'),
    homePage = require('../page_object/homePage');

describe("Feature: As a User, I want to correctly download the Assignment file from WAES Homepage", function () {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        // Page object initialization
        this.CommonHeaderElements = new commheadel();
        this.HomePage = new homePage();
        this.NavigationHelper = new navigationHelper();
        this.PageObjectHelper = new pageObjectHelper();
        this.FileDownloadHelper = new pageDownloadHelper();
    });


    describe('Scenario: Download the Assignment File', function () {

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