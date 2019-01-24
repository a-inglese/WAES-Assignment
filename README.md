# WAES-Assignment
Test Assignment for WAES

## Prerequisites

- Install node.js 6.x or higher (NVM usage recommended for Linux)

    https://nodejs.org/en/download/
    https://github.com/creationix/nvm#installation

- Install grunt-cli and grunt 1.0.0

    [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)

- Install dependencies and update webdriver manager:
    ```
    npm install && grunt update
    ```
## Running FrontEnd Tests

    grunt test-frontend
    grunt test-frontend --headless

## Running FrontEnd Tests Mobile

    grunt test-frontend --mobile
    grunt test-frontend --mobile --headless    
    
## Running Backend Tests

- download and run backend project first
    https://bitbucket.org/waesworks/backend-for-testers/overview
```
    grunt test-backend
```
## Report Location
 
 - Frontend
    /reports/frontend

 - Backend
    /reports/backend