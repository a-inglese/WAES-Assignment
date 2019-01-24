const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));


describe('Feature: Check login service', function () {

  describe('Scenario: Check correct login for user Admin', function () {

    it('Given the username ‘admin’ was registered in the database', function () {});
    it('When a client app attempts to login with user ‘admin’ with valid credentials (admin:hero)', function () {});
    it('Then it should return status 200 Success and correct data for user Admin', function () {
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
        .expect('json', 'id', data.Admin.id)
        .expect('json', 'name', data.Admin.name)
        .expect('json', 'username', data.Admin.username)
        .expect('json', 'email', data.Admin.email)
        .expect('json', 'superpower', data.Admin.superpower)
        .expect('json', 'dateOfBirth', data.Admin.dateOfBirth)
        .expect('json', 'isAdmin', data.Admin.isAdmin)
    });
  });

  describe('Scenario: Check correct login for user Dev', function () {
    it('Given the username ‘dev’ was registered in the database', function () {});
    it('When a client app attempts to login with user ‘dev’ with valid credentials (dev:wizard)', function () {});
    it('Then it should return status 200 Success and correct data for user Dev', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("dev:wizard").toString('base64')
            }
          }
        })
        .get('http://localhost:8081/waesheroes/api/v1/users/access')
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


  describe('Scenario: Check correct login for user Tester', function () {
    it('Given the username ‘dev’ was registered in the database', function () {});
    it('When a client app attempts to login with user ‘tester’ with valid credentials (tester:maniac)', function () {});
    it('Then it should return status 200 Success and correct data for user Tester', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("tester:maniac").toString('base64')
            }
          }
        })
        .get('http://localhost:8081/waesheroes/api/v1/users/access')
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

  describe('Scenario: Check correct behavior of the login service when trying to login with a valid username with invalid password (dev:hero)', function () {
    it('Given the username ‘dev’ was registered in the database', function () {});
    it('When a client app attempts to login with user ‘dev’ with invalid credentials (dev:hero)', function () {});
    it('Then it should return status 401 Unauthorized', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("dev:hero").toString('base64')
            }
          }
        })
        .get('http://localhost:8081/waesheroes/api/v1/users/access')
        .expect('status', 401)
    });

  });

  describe('Scenario: Check correct behavior of the login serice when trying to login with a not registered user', function () {

    it('Given the username ‘waes’ was not registered in the database', function () {});
    it('When a client app attempts to login with username ‘waes’ and password ‘notregistered’', function () {});
    it('Then it should return status 401 Unauthorized', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("waes:notregistered").toString('base64')
            }
          }
        })
        .get('http://localhost:8081/waesheroes/api/v1/users/access')
        .expect('status', 401)
    });

  });
});