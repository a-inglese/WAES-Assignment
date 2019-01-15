var commheadel = require('../page_object/commonHeaderElements');

describe("Check WAES Page Elements", function() {

    describe('Home Elements', function() {

        beforeAll(function () {
            // Ignores synchronization with angular for non-angular page,
            isAngularSite(false);
            browser.get("https://waesworks.bitbucket.io/");
            this.CommonHeaderElements = new commheadel();
        });

        it("Should have header displayed", function (done) {
            expect(this.CommonHeaderElements.getHeader().isDisplayed()).toBe(true);
            done();
        });

        it("Should have link to Home Page", function (done) {
            expect(this.CommonHeaderElements.getHomeLink().isDisplayed()).toBe(true);
            done();
        });

        it("Should have link to Login Page", function (done) {
            expect(this.CommonHeaderElements.getLoginLink().isDisplayed()).toBe(true);
            done();
        });

        it("Should have link to Sign Up Page", function (done) {
            expect(this.CommonHeaderElements.getSignupLink().isDisplayed()).toBe(true);
            done();
        });

                    
    });

});
