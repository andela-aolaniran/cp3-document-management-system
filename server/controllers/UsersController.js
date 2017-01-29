// import dependencies
import database from '../models';

// declare the usersDB
const usersDB = database.Users;

/**
 * Class for the UsersController
 * to handle connections to our database
 */
class UsersController {

  /**
   * Method to check that the post request contains required Fields
   * @param{Object} request - post request object
   * @return{Boolean} - True if request contains all required fields,
   * otherwise false
   */
  static checkPostRequest(request){
    return (request.body &&
      request.body.email &&
      request.body.firstName &&
      request.body.password &&
      request.body.lastName
    );
  }

  /**
   * Method to create a new User (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static createUser(request, response){
    if(UsersController.checkPostRequest(request)){
      return usersDB.create({
        email: request.body.email,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        roleId: request.body.roleId
      })
      .then((user) => {
        response.status(201).json(user);
      })
      .catch((error) => {
        // send an array of errors that occurred
        response.status(400).json(error.errors);
      });
    } else {
      response.status(400).json({
        status: 'Failed',
        message: 'Required fields are missing'
      });
    }
  }

  /**
   * Method to delete a specific user (DELETE)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static deleteUser(request, response){
    usersDB.findOne({
      where: {
        id: request.params.id
      }
    }).then((user) => {
      if (user) {
        user.destroy()
        .then(() => {
          response.status(200).json({
            status: 'Success',
            message: 'User deleted'
          });
        })
        .catch((error) => {
          response.status(400).json(error.errors);
        });
      } else {
        response.status(404).json({
          status: 'Failed',
          message: 'User not found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json(error.errors);
    });
  }

  /**
   * Method to update a specific user (PUT)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static updateUser(request, response){
    usersDB.findOne({
      where: {
        id: request.params.id
      }
    }).then((user) => {
      if (user) {
        user.update(request.body)
        .then((updatedUser) => {
          response.status(200).json(updatedUser);
        })
        .catch((error) => {
          response.status(400).json(error.errors);
        });
      } else {
        response.status(404).json({
          status: 'Failed',
          message: 'User not found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json(error.errors);
    });
  }
  
  /**
   * Method to fetch a specific user (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUser(request, response) {
    usersDB.findOne({where: {id: request.params.id}})
    .then((user) => {
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(404).json({
          status: 'Failed',
          message: 'User not found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        error
      });
    });
  }

  /**
   * Method to fetch all users (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUsers(request, response){
    usersDB.findAll({})
    .then((users) => {
      if(users) {
        response.status(200).json(users);
      } else {
        response.status(404).json({
          status: 'Failed',
          message: 'No Users found'
        });
      }
    })
    .catch((error) => {
      response.json(error);
    });
  }

  /**
   * Method to login a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static loginUser(request, response){
    if(request.body.email && request.body.password){
      usersDB.findOne({
        where: {
          email: request.body.email
        } 
      })
      .then((user) => {
        if (user) {
          if(user.verifyPassword(request.body.password)) {
            response.status(200).json({
              status: 'Success',
              message: 'Login Successful'
            });
          } else {
            response.status(401).json({
              status: 'Failed',
              message: 'Invalid Credentials'
            });
          }
        } else {
          response.status(404).json({
            status: 'Failed',
            message: 'User not found'
          });
        }
      });
    } else {
      response.status(401).json({
        status: 'Failed',
        message: 'Missing Credentials'
      });
    }
  }

  /**
   * Method to logout a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static logoutUser(request, response){
    // Todo, Implement Log out functionality
    response.send('You have hit the logout user controller');
  }
}

export default UsersController;
