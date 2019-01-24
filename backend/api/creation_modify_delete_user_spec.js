const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));

describe('Feature: Check correct creation, update and deletion of a new user', function () {

  this.userId
  self = this;

  describe('Scenario: Retrieve a recently created user', function () {

    it('Given a client app created a new user with username ‘newguy‘', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        })
        .post('http://localhost:8081/waesheroes/api/v1/users', {
          'username': data.NewUser.username,
          'isAdmin': data.NewUser.isAdmin,
          'dateOfBirth': data.NewUser.dateOfBirth,
          'email': data.NewUser.email,
          'name': data.NewUser.name,
          'password': data.NewUser.password,
          'superpower': data.NewUser.superpower
        })
        .expect('status', 201)
        .then(function (res) {
          self.userId = res.json.id
        })
    });

    it('When a client app attempts to retrieve ‘new guy’ user details', function () {});

    it('Then the status should be 200 and should return correct JsonObject for user ‘newguy’', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.NewUser.username}`)
        .expect('status', 200)
        .expect('json', 'id', self.userId)
        .expect('json', 'name', data.NewUser.name)
        .expect('json', 'username', data.NewUser.username)
        .expect('json', 'email', data.NewUser.email)
        .expect('json', 'superpower', data.NewUser.superpower)
        .expect('json', 'dateOfBirth', data.NewUser.dateOfBirth)
        .expect('json', 'isAdmin', data.NewUser.isAdmin)
    });

  });

  describe('Scenario: Update a recently created user', function () {

    it('Given a client app attempts to modify ‘new guy’ user email with correct credentials (user:dev pass:wizard)', function () {});

    it('When a PUT call is made to <endpoint>/waesheroes/api/v1/users with the updated field in the body (email: newmail@new.com)', function () {});

    it('Then the status should be 200 and should return correct JsonObject for user ‘newguy’', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("dev:wizard").toString('base64')
            }
          }
        })
        .put('http://localhost:8081/waesheroes/api/v1/users', {
          'id': self.userId,
          'username': data.NewUser.username,
          'isAdmin': data.NewUser.isAdmin,
          'dateOfBirth': data.NewUser.dateOfBirth,
          'email': 'newmail@new.com',
          'name': data.NewUser.name,
          'password': data.NewUser.password,
          'superpower': data.NewUser.superpower
        })
        .expect('status', 200);

    });

    it('And email for the user should be newmail@new.com when retrieving the user', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.NewUser.username}`)
        .expect('status', 200)
        .expect('json', 'email', 'newmail@new.com')
    });

  });

  describe('Scenario: Delete a recently created user', function () {

    it('Given the user ‘new guy’ was recently created', function () {});

    it('When a DELETE call is made to <endpoint>/waesheroes/api/v1/users with the correct id in the body', function () {});

    it('Then it should return a status of 204 No Content', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("tester:maniac").toString('base64')
            }
          }
        })
        .fetch('http://localhost:8081/waesheroes/api/v1/users', {
          method: 'DELETE',
          body: JSON.stringify({
            'id': self.userId,
            'username': data.NewUser.username,
            'isAdmin': data.NewUser.isAdmin,
            'dateOfBirth': data.NewUser.dateOfBirth,
            'email': 'newmail@new.com',
            'name': data.NewUser.name,
            'password': data.NewUser.password,
            'superpower': data.NewUser.superpower
          })
        })
    });
  });

  describe('Scenario: Try to retrieve a recently deleted user', function () {

    it('Given the user ‘new guy’ was deleted from the database', function () {});

    it('When a client app attempts to retrieve ‘new guy’ user details', function () {});

    it('Then the status should be 404 Not Found', function () {
      return frisby
        .get(`http://localhost:8081/waesheroes/api/v1/users/details?username=${data.NewUser.username}`)
        .expect('status', 404)
    });

  });
  
})
