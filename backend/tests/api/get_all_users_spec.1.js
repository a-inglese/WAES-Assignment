const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/tests/test_data/testData.json', 'utf8'));

it ('Should return correct data for user Admin', function () {
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

it ('Should return correct data for user Dev', function () {
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

it ('Should return correct data for user Tester', function () {
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