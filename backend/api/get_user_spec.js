const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));

describe('Feature: Check user retrieve service', function () {

  describe('Scenario: Retrieve admin user data from database', function () {

    it('Given the username ‘admin’ was registered in the database', function () {});

    it('When a client app attempts to request user ‘admin’ details', function () {});

    it('Then the status should be 200 and should return correct JsonObject for user ‘admin’', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.Admin.username}`)
        .expect('status', 200)
        .expect('json', 'id', data.Admin.id)
        .expect('json', 'name', data.Admin.name)
        .expect('json', 'username', data.Admin.username)
        .expect('json', 'email', data.Admin.email)
        .expect('json', 'superpower', data.Admin.superpower)
        .expect('json', 'dateOfBirth', data.Admin.dateOfBirth)
        .expect('json', 'isAdmin', data.Admin.isAdmin)
    });

  });

  describe('Scenario: Retrieve dev user data from database', function () {

    it('Given the username ‘dev’ was registered in the database', function () {});

    it('When a client app attempts to request user ‘dev’ details', function () {});

    it('Then the status should be 200 and should return correct JsonObject for user ‘dev’', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.Dev.username}`)
        .expect('status', 200)
        .expect('json', 'id', data.Dev.id)
        .expect('json', 'name', data.Dev.name)
        .expect('json', 'username', data.Dev.username)
        .expect('json', 'email', data.Dev.email)
        .expect('json', 'superpower', data.Dev.superpower)
        .expect('json', 'dateOfBirth', data.Dev.dateOfBirth)
        .expect('json', 'isAdmin', data.Dev.isAdmin)
    });
  });

  describe('Scenario: Retrieve dev user data from database', function () {

    it('Given the username ‘tester’ was registered in the database', function () {});

    it('When a client app attempts to request user ‘tester’ details', function () {});

    it('Then the status should be 200 and should return correct JsonObject for user ‘tester’', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.Tester.username}`)
        .expect('status', 200)
        .expect('json', 'id', data.Tester.id)
        .expect('json', 'name', data.Tester.name)
        .expect('json', 'username', data.Tester.username)
        .expect('json', 'email', data.Tester.email)
        .expect('json', 'superpower', data.Tester.superpower)
        .expect('json', 'dateOfBirth', data.Tester.dateOfBirth)
        .expect('json', 'isAdmin', data.Tester.isAdmin)
    });
  });

  describe('Scenario: Try to retreive an inexistent user from the database', function () {
    it('Given the username ‘imNotHere’ was not registered in the database', function () {});
    it('When a client app attempts to request user a user ‘imNotHere’ details', function () {});
    it('Then the status should be 404', function () {
      return frisby
        .get('http://localhost:8081/waesheroes/api/v1/users/details?username=imNotHere')
        .expect('status', 404)
    });
  });

});