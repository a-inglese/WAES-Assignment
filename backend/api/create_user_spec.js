const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));

describe('Feature: Check user creation service', function () {

  describe('Scenario: Create a new user', function () {

    this.userId
    self = this;

    it('Given a client app tries to create a new user with username: newguy2', function () {});

    it('When a POST call is made to <endpoint>/waesheroes/api/v1/users', function () {});

    it('Then status should be: 201 Created', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        })
        .post('http://localhost:8081/waesheroes/api/v1/users', {
          'username': data.NewUser2.username,
          'isAdmin': data.NewUser2.isAdmin,
          'dateOfBirth': data.NewUser2.dateOfBirth,
          'email': data.NewUser2.email,
          'name': data.NewUser2.name,
          'password': data.NewUser2.password,
          'superpower': data.NewUser2.superpower
        })
        .expect('status', 201)
        .then(function (res) {
          self.userId = res.json.id
        })
    });
  });

  describe('Scenario: Create user that already exists in database', function () {

    this.userId
    self = this;

    it('Given a client app tries to create a new user with username: admin', function () {});

    it('When a POST call is made', function () {});

    it('Then status should be: 403 Forbidden', function () {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        })
        .post('http://localhost:8081/waesheroes/api/v1/users', {
          'username': data.Admin.username,
          'isAdmin': data.Admin.isAdmin,
          'dateOfBirth': data.Admin.dateOfBirth,
          'email': data.Admin.email,
          'name': data.Admin.name,
          'password': data.Admin.password,
          'superpower': data.Admin.superpower
        })
        .expect('status', 403)
        .then(function (res) {
          self.userId = res.json.id
        })
    });

  });

})

afterAll(function () {
  // Deletes the user in order to clean the database
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
        'username': data.NewUser2.username,
        'isAdmin': data.NewUser2.isAdmin,
        'dateOfBirth': data.NewUser2.dateOfBirth,
        'email': data.NewUser2.email,
        'name': data.NewUser2.name,
        'password': data.NewUser2.password,
        'superpower': data.NewUser2.superpower
      })
    })
});
