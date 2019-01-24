const frisby = require('frisby');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('backend/test_data/testData.json', 'utf8'));


describe('Feature: Check that a new Admin user has admin permissions', function () {

    describe('Scenario: Create a new Admin user & check permissions', function () {

        this.userId
        self = this;

        it('Given a client app create a new user with username newadmin & with isAdmin value true', function () {
            return frisby
                .setup({
                    request: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .post('http://localhost:8081/waesheroes/api/v1/users', {
                    'username': data.NewAdmin.username,
                    'isAdmin': data.NewAdmin.isAdmin,
                    'dateOfBirth': data.NewAdmin.dateOfBirth,
                    'email': data.NewAdmin.email,
                    'name': data.NewAdmin.name,
                    'password': data.NewAdmin.password,
                    'superpower': data.NewAdmin.superpower
                })
                .expect('status', 201)
                .then(function (res) {
                    self.userId = res.json.id
                })
        });

        it('When a GET call is made to get all users from database with credentials username:newadmin password:heroic', function () {});

        it('Then status should be: 200', function () {
            return frisby
                .setup({
                    request: {
                        headers: {
                            'Authorization': 'Basic ' + Buffer.from("newadmin:heroic").toString('base64')
                        }
                    }
                })
                .get('http://localhost:8081/waesheroes/api/v1/users/access')
                .expect('status', 200)
        });

    });

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
                    'username': data.NewAdmin.username,
                    'isAdmin': data.NewAdmin.isAdmin,
                    'dateOfBirth': data.NewAdmin.dateOfBirth,
                    'email': data.NewAdmin.email,
                    'name': data.NewAdmin.name,
                    'password': data.NewAdmin.password,
                    'superpower': data.NewAdmin.superpower
                })
            })
    });


});