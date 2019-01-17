const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));

it ('Given there are users registered in the database', function () {});

it('When a client app attempts to request all users without proper credentials', function() {});

it ('Should return correct data for user Admin', function () {
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

it('When a client app attempts to request all users without proper credentials', function() {});

it ('Should return statos 401 UNAUTHORIZED', function () {
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