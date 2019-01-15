var commheadel = require('../page_object/commonHeaderElements'),
    signupPage = require('../page_object/signUpPage'),
    detailsPage = require('../page_object/detailsPage'),
    profilePage = require('../page_object/profilePage'),
    users = require('../config/test_data/userData.module.js'),
    using = require('jasmine-data-provider');

describe("Check WAES Sign Up Process", function() {

    beforeAll(function () {
        // Ignores synchronization with angular for non-angular page,
        isAngularSite(false);
        browser.get("https://waesworks.bitbucket.io/");
    });
   

    describe('Signup with correct username and password', function() {

        beforeEach(function() {
            this.CommonHeaderElements = new commheadel();
            this.LoginPage = new loginPage();
            this.ProfilePage = new profilePage();
            this.DetailsPage = new detailsPage();
        });

    });

});
