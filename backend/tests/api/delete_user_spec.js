const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/tests/config/testData.json', 'utf8'));

it ('Given the username ‘admin’ was registered in the database', function() {});
it('When a client app attempts to delete user ‘admin’ with valid credentials', function() {});
it ('DELETE should return a status of 204 No Content', function () {
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
    body: JSON.stringify(data.Tester)
  })
    .expect('status', 204);
});