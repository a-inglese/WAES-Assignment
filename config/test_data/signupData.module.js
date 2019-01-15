'use strict';

module.exports = {
    correctUserData: {
        'all correct fields': {
            username: 'ainglese',
            password: 'passw0rd', 
            name: 'Agustin Inglese', 
            email: 'agustin.inglese@gmail.com', 
            dayOfBirth: '15',
            monthOfBirth: 'October',
            yearOfBirth: '1986',
        },
        'at least one special character': {
            username: '%&$"!"·$!%%&/',
            password: '123', 
            name: 'Martös Skøeberg', 
            email: 'mkoerberg@outlook.com', 
            dayOfBirth: '6',
            monthOfBirth: 'August',
            yearOfBirth: '1972',
        },
        'very long name': {
            username: 'Wolfgang',
            password: 'number40', 
            name: 'Johannes Chrysostomus Wolfgangus Theophilus Mozart', 
            email: 'mozart@amadeus.com', 
            dayOfBirth: '27',
            monthOfBirth: 'January',
            yearOfBirth: '1900',
        },
    },
    incorrectUserData: {
        'missing password field': {
            username: 'waesUser',
            password: '', 
            name: 'Waes User', 
            email: 'user@waes.com', 
            dayOfBirth: '12',
            monthOfBirth: 'March',
            yearOfBirth: '1958',
        },
        'incomplete email': {
            username: 'justpassingby',
            password: 'imnothere', 
            name: 'Guy Incognito', 
            email: 'this.is.not.my.email', 
            dayOfBirth: '01',
            monthOfBirth: 'January',
            yearOfBirth: '2000',
        },
        'invalid birth date': {
            username: 'notbornyet',
            password: 'drowssap', 
            name: 'Not Yet', 
            email: 'unborn@test.com', 
            dayOfBirth: '22',
            monthOfBirth: 'September',
            yearOfBirth: '2019',
        },
    }
    
}


