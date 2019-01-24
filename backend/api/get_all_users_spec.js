const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));

describe("Feature: As a user, I want to successfully get all users from the database", function () {

  describe("Scenario: Retrieve user all users with correct user: \"admin\" and correct password: \"hero\"", function () {


    it('Given there are users registered in the database', function () {});

    it('When a client app attempts to request all users with user: \"admin\" and password: \"hero\"', function () {});

    it('Then it should return correct data for user Admin', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("admin:hero").toString('base64')
            }
          }
        })
        .get('http://localhost:8081/waesheroes/api/v1/users/access')
        .expect('status', 200)
    });

  });

  describe("Scenario: Retrieve with incorrect credentials", function () {

  it('When a client app attempts to request all users without proper credentials', function () {});

  it('It should return status 401 UNAUTHORIZED', function () {
    return frisby
      .setup({
        request: {
          headers: {
            'Authorization': 'Basic ' + Buffer.from("dev:maniac").toString('base64')
          }
        }
      })
      .get('http://localhost:8081/waesheroes/api/v1/users/access')
      .expect('status', 401)
  });

});

});