const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/tests/config/testData.json', 'utf8'));

it ('Given the username ‘admin’ was registered in the database', function() {});
it('When a client app attempts to request user ‘admin’ details', function() {});
it ('Then the status should be 200 and should return correct JsonObject for user ‘admin’', function () {
    return frisby
      .get('http://localhost:8081/waesheroes/api/v1/users/details?username=admin')
      .expect('status', 200)
      .expect('json', 'id', data.Admin.id)
      .expect('json', 'name', data.Admin.name)
      .expect('json', 'username', data.Admin.username)
      .expect('json', 'email', data.Admin.email)
      .expect('json', 'superpower', data.Admin.superpower)
      .expect('json', 'dateOfBirth', data.Admin.dateOfBirth)
      .expect('json', 'isAdmin', data.Admin.isAdmin)
});

it ('Given the username ‘dev’ was registered in the database', function() {});
it('When a client app attempts to request user ‘dev’ details', function() {});
it ('Then the status should be 200 and should return correct JsonObject for user ‘dev’', function () {
  return frisby
    .get('http://localhost:8081/waesheroes/api/v1/users/details?username=dev')
    .expect('status', 200)
    .expect('json', 'id', data.Dev.id)
    .expect('json', 'name', data.Dev.name)
    .expect('json', 'username', data.Dev.username)
    .expect('json', 'email', data.Dev.email)
    .expect('json', 'superpower', data.Dev.superpower)
    .expect('json', 'dateOfBirth', data.Dev.dateOfBirth)
    .expect('json', 'isAdmin', data.Dev.isAdmin)
});

it ('Given the username ‘tester’ was registered in the database', function() {});
it('When a client app attempts to request user ‘tester’ details', function() {});
it ('Then the status should be 200 and should return correct JsonObject for user ‘tester’', function () {
  return frisby
    .get('http://localhost:8081/waesheroes/api/v1/users/details?username=tester')
    .expect('status', 200)
    .expect('json', 'id', data.Tester.id)
    .expect('json', 'name', data.Tester.name)
    .expect('json', 'username', data.Tester.username)
    .expect('json', 'email', data.Tester.email)
    .expect('json', 'superpower', data.Tester.superpower)
    .expect('json', 'dateOfBirth', data.Tester.dateOfBirth)
    .expect('json', 'isAdmin', data.Tester.isAdmin)
});