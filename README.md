# cp3-document-management-system
[![Build Status](https://travis-ci.org/andela-aolaniran/cp3-document-management-system.svg?branch=feature/138543863/implement-api-endpoints)](https://travis-ci.org/andela-aolaniran/cp3-document-management-system)  [![Coverage Status](https://coveralls.io/repos/github/andela-aolaniran/cp3-document-management-system/badge.svg?branch=bug%2F140875763%2Fapi-defense-feedback-implementation)](https://coveralls.io/github/andela-aolaniran/cp3-document-management-system?branch=bug%2F140875763%2Fapi-defense-feedback-implementation)  [![Issue Count](https://codeclimate.com/github/andela-aolaniran/cp3-document-management-system/badges/issue_count.svg)](https://codeclimate.com/github/andela-aolaniran/cp3-document-management-system) [![Code Climate](https://codeclimate.com/github/andela-aolaniran/cp3-document-management-system/badges/gpa.svg)](https://codeclimate.com/github/andela-aolaniran/cp3-document-management-system)

This is a full stack document management system, complete with roles and privileges . Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.
Users are categorized by roles.

#### *Postman Collection*
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/79158ea63ffdea6731dd)

#### *Features*

1. **Authentication**
  - It uses JWT for authentication.  
  - It generates and returns a token on successful login or creation of a user.  
  - It verifies the token on every request to authenticated endpoints.

2. **Users**
  - It allows creation of new users. 
  - It ensures no other user can be assigned the admin role (there is only one admin)
  - It sets a newly created user's role category to `regular` by default if a valid role is not specified.   
  - It allows created user to edit/update their information.
  - Only the admin user can update/edit other users information.
  - All registered users can be retrieved by the admin user or other registered users (it doesn't return sensitive information of the users retrieved).

3. **Roles**
  - It ensures that created users have a role defined (default role is `regular`).  
  - It ensures new roles can be created, updated and deleted by only the admin user.   
  - It allows only the admin user carry out CRUD operations on the roles.

4. **Documents**
  - It allows new documents to be created/saved by users.  
  - It ensures all documents have an access type defined (default access type is `public`).  
  - It allows only admin users retrieve all documents regardless of the document required access type.  
  - It ensures private access typed documents can only be retrieved by their owners, public access typed documents can be retrieved by all users and role access typed documents can be retrieved by ONLY users with the same role level as the document owner.     
  - It ensures only authenticated users can delete, edit and update documents they own and users cannot delete documents they do not own (with the exception of the admin). 

#### *API Endpoints*
| **HTTP Verb** | **Endpoint** | **Functionality**|
|------|-------|-----------------|
| **POST** | api/users/login | Logs a user in and returns a token which should be subsequently used to access authenticated endpoints |
| **POST** | api/users/logout | Logs a user out, and invalidates the token associated |
| **POST** | api/users/ | Creates a new user. Required attributes are `firstName`, `lastName`, `email`, `password`. If a `role` category is not specified, a default role of `regular` is assigned |
| **GET** | api/users/ | Fetch all registered users (`admin` privilege required) |
| **GET** | api/users/:id | Fetch a user by specific id |
| **PUT** | api/users/:id | Update a specific user (by id) attributes|
| **DELETE** | api/users/:id | Delete a specific user by id. (`admin` privilege required |
| **POST** | api/documents/ | Creates a new document instance. Required attributes are `title` and `content`. If an `access` restriction is NOT specified, the document is marked  _public_ |
| **GET** | api/documents/ | Fetch all documents (returns all documents the requester should have access to) |
| **GET** | api/documents/:id | Fectch a specific document by it's id |
| **PUT** | api/documents/:id | Update specific document attributes by it's id |
| **DELETE** | api/documents/:id | Delete a specific document by it's id |
| **GET** | api/users/:id/documents | Find a specific user and all documents belonging to the user|
| **POST** | api/roles/ | Create a new role (`admin` privilege required) |
| **GET** | api/roles/ | Fetches all available roles (`admin privilege required`) |
| **GET** | api/roles/:id | Find a role by id (`admin privilege required`) |
| **PUT** | api/roles/:id | Update role attributes (`admin privilege required`) |
| **DELETE** | api/delete/:id | Delete role (`admin privilege required`) |

#### *Contributing*
1. Fork this repository to your GitHub account
2. Clone the forked repository
3. Create your feature branch
4. Commit your changes
5. Push to the remote branch
6. Open a Pull Request

#### *Task List*
- [x] Setup Version Control System
- [x] Integrate Slack BOT notifications
- [x] Integrate Hound CI service
- [x] Integrate Travis CI service
- [x] Integrate Code Coverage and Code Quality service
- [x] ORM (Sequelize) setup
- [x] Create specified API endpoints
- [x] Implement Feedback from API defense
- [ ] Set up Webpack to run mundane tasks for development of the Client side
- [ ] create a frontend/client side interface using React with Redux architecture

#### *Technologies*
CP3-Document-Management-System is implemented using a number of technologies, these include:
* [node.js] - evented I/O for the backend
* [babel-cli] - Babel Command line interface 
* [babel-core] - Babel Core for javascript transpiling
* [babel-loader] - Adds Babel support to Webpack
* [babel-preset-es2015] - Babel preset for ES2015
* [babel-preset-react] - Add JSX support to Babel
* [babel-preset-react-hmre] - Hot reloading preset for Babel
* [babel-register] - Register Babel to transpile our Mocha tests]
* [eslint] - Lints JavaScript
* [expect] - Assertion library for use with Mocha
* [express] - Serves development and production builds]
* [mocha] - JavaScript testing library
* [npm-run-all] - Display results of multiple commands on single command line
* [webpack] - Bundler with plugin system and integrated development server
* [webpack-dev-middleware] - Adds middleware support to webpack
* [webpack-hot-middleware] - Adds hot reloading to webpack


   [mocha]: <https://mochajs.org>
   [node.js]: <http://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [babel-cli]: <https://babeljs.io/>
   [babel-core]: <https://babeljs.io/>
   [babel-loader]: <https://babeljs.io/>
   [babel-preset-es2015]: <https://babeljs.io/>
   [babel-preset-react]: <https://babeljs.io/>
   [babel-preset-react-hmre]: <https://babeljs.io/>
   [babel-register]: <https://babeljs.io/>
   [eslint]: <http://eslint.org/>
   [expect]: <http://chaijs.com/api/bdd/>
   [express]: <http://expressjs.com/>
   [mocha]: <https://mochajs.org/>
   [npm-run-all]: <https://www.npmjs.com/package/npm-run-all>
   [webpack]: <https://webpack.github.io/>
   [webpack-dev-middleware]: <https://webpack.github.io/>
   [webpack-hot-middleware]: <https://webpack.github.io/>
