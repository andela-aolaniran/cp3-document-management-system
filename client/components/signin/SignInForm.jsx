import React from 'react';
import validator from 'validator';
import TextInput from '../common/TextInput';
import Constant from '../../constants/Constant';
import Button from '../common/Button';

/**
 * Class for creating a SignIn form object
 */
class SignInForm extends React.Component {

  /**
   * Constructor to create a new instance of this object
   * @param {Object} props - Properties passed down from the parent
   * of this object
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Method to get validity message for a specific password
   * @param {string} password - password to get validity message for
   * @return {string} - message specifiying the password validity state
   */
  getPasswordValidityMessage() {
    if (this.state.password <= 0) {
      return 'Field required';
    }
    if (this.state.password.length < Constant.MIN_PW_LENGTH) {
      return `Min password characters is ${Constant.MIN_PW_LENGTH}`;
    }
    if (this.state.password.length > Constant.MAX_PW_LENGTH) {
      return `Max password characters is ${Constant.MAX_PW_LENGTH}`;
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
   * Method to check validity of password from the signup form password
   * controls
   * @param {String} password - password to test validity against
   * @return {Boolean} - True if the password is valid, otherwise false
   */
  checkPasswordValid(password) {
    return (
      password === this.state.password &&
      password.length > Constant.MIN_PW_LENGTH &&
      password.length < Constant.MAX_PW_LENGTH
    );
  }

  /**
   * Method to enable or disable the signup button based on the validity of the
   * input fields and the state of the signup process
   * @return {undefined} - returns undefined
   */
  enableSignupButton() {
    // TODO: check state of sign up process before enabling signup button
    return (validator.isEmail(this.state.email));
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
      email: this.state.email,
      password: this.state.password
    });
    // TODO: trigger submit action using redux architecture
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

  /**
   * Render component in the dom
   * @return{Object} - Component to be rendered to the dom
   */
  render() {
    return (
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
        <div className="form-group">
          <Button
            disabled={!this.enableSignupButton() ? 'disabled' : ''}
            value="Sign In"
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}

export default SignInForm;
