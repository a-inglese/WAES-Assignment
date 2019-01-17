const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/tests/test_data/testData.json', 'utf8'));

it ('Given the username ‘admin’ was registered in the database', function() {});
it('When a client app attempts to login with user ‘admin’ with valid credentials', function() {});
it ('Then it should return status 200 and correct data for user Admin', function () {
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

it ('Given the username ‘waes’ was not registered in the database', function() {});
it('When a client app attempts to login with username ‘waes’ and password ‘notregistered’', function() {});
it ('Then it should return status 418', function () {
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