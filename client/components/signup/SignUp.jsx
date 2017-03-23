import React from 'react';
import validator from 'validator';
import TextInput from '../common/TextInput';
import Constant from '../../constants/Constant';

/**
 * Class for creating a SignUP form object
 */
class SignUp extends React.Component {

  /**
   * Constructor to create a new instance of this object
   * @param {Object} props - Properties passed down from the parent
   * of this object
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Render component in the dom
   * @return{Object} - Component to be rendered to the dom
   */
  render() {
    return (
      <div className="container-fluid v-center">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4 col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1 className="text-center">
                  SignUp
                </h1>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <TextInput
                    className={
                      validator.isEmail(this.state.email) ?
                      'form-group has-success' :
                      'form-group has-error'
                    }
                    id="email"
                    type="email"
                    feedback={this.getEmailValidityMessage(this.state.email)}
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <TextInput
                    className={
                      this.checkNameValid(
                        this.state.firstName
                      ) ?
                      'form-group has-success' :
                      'form-group has-error'
                    }
                    id="firstName"
                    type="text"
                    feedback={this.getNameValidityMessage(
                      this.state.firstName
                    )}
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <TextInput
                    className={
                      this.checkNameValid(
                        this.state.lastName
                      ) ?
                      'form-group has-success' :
                      'form-group has-error'
                    }
                    id="lastName"
                    type="text"
                    feedback={this.getNameValidityMessage(
                      this.state.lastName
                    )}
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <TextInput
                    className={
                      this.checkPasswordValid(
                        this.state.password) ?
                      'form-group has-success' :
                      'form-group has-error'
                    }
                    id="password"
                    type="password"
                    feedback={this.getPasswordValidityMessage(
                      this.state.password
                    )}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <TextInput
                    className={
                      this.checkPasswordValid(
                        this.state.confirmPassword
                      ) ?
                      'form-group has-success' :
                      'form-group has-error'
                    }
                    id="confirmPassword"
                    type="password"
                    feedback={this.getPasswordValidityMessage(
                      this.state.confirmPassword
                    )}
                    label="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                  <br />
                  <button
                    type="submit"
                    disabled={!this.enableSignupButton() ? 'disabled' : ''}
                    className="btn btn-primary btn-block"
                  >Submit</button>
                </form>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <p
                    className="text-center"
                  >Already have an account ? <a href="">Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Method to check validity of password from the signup form password
   * controls
   * @param {String} password - password to test validity against
   * @return {Boolean} - True if the password is valid, otherwise false
   */
  checkPasswordValid(password) {
    return (password === this.state.confirmPassword &&
      password === this.state.password &&
      password.length > Constant.MIN_PW_LENGTH &&
      password.length < Constant.MAX_PW_LENGTH);
  }

  /**
   * Method to get validity message for a specific password
   * @param {string} password - password to get validity message for
   * @return {string} - message specifiying the password validity state
   */
  getPasswordValidityMessage(password) {
    if (password <= 0) {
      return 'Field required';
    }
    if (password !== this.state.confirmPassword ||
      password !== this.state.password
    ) {
      return 'Passwords do not match';
    }
    if (password.length < Constant.MIN_PW_LENGTH) {
      return `Min password characters is ${Constant.MIN_PW_LENGTH}`;
    }
    if (password.length > Constant.MAX_PW_LENGTH) {
      return `Max password characters is ${Constant.MAX_PW_LENGTH}`;
    }
    return '';
  }

  /**
   * Method to check if name in any of the name field in the signup form
   * contains a valid name
   * @param {String} name - Name to check if its valid
   * @return {Boolean} - True if the name is valid, otherwise false
   */
  checkNameValid(name = this.state.firstName) {
    return (name.length >= Constant.MIN_NAME_LENGTH &&
      name.length <= Constant.MAX_NAME_LENGTH
    );
  }

  /**
   * Method to generate a validity message for a name (first name or last name)
   * input in any of the signup form name fields
   * @param {String} name - name to generate a validity message for
   * @return {String} - Message stating the validity status of the name
   */
  getNameValidityMessage(name = this.state.firstName) {
    if (name.length === 0) {
      return 'Field required';
    }
    if (name.length < Constant.MIN_NAME_LENGTH) {
      return `Min name characters is ${Constant.MIN_NAME_LENGTH}`;
    }
    if (name.length > Constant.MAX_NAME_LENGTH) {
      return `Max name characters is ${Constant.MAX_NAME_LENGTH}`;
    }
    return '';
  }

  /**
   * Method to generate a validity message for an email from the signup form
   * email field
   * @param {String} email - Email strig to generate a validity message for
   * @return {String} - Message stating the validity status of the email
   */
  getEmailValidityMessage(email = this.state.email) {
    if (email.length === 0) {
      return 'Field required';
    }
    if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return '';
  }
  /**
   * Method to enable or disable the signup button based on the validity of the
   * input fields and the state of the signup process
   * @return {undefined} - returns undefined
   */
  enableSignupButton() {
    console.log(`TODO: check state of sign up process before enabling signup 
    button`);
    return (validator.isEmail(this.state.email)
      && this.checkPasswordValid(
        this.state.password
      )
      && this.checkNameValid(
        this.state.lastName
      )
      && this.checkNameValid(
        this.state.firstName
      )
    );
  }

  /**
   * Method to handle submit events on the signup form
   * by passing them to the appropriate dispatcher
   * @param {Oject} event - Submit event object
   * @return{undefined} - Returns undefined
   */
  handleSubmit(event) {
    event.preventDefault();
    const userDetails = Object.assign({}, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
    console.log(userDetails);
  }

  /**
   * Method to handle change events on the signup form input controls
   * and update the state accordingly
   * @param {Object} event - Change event object
   * @return{undefined} - Returns undefined
   */
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

}

export default SignUp;
