import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Validator from 'validator';
import { notify } from 'react-notify-toast';
import * as userActions from '../../actions/userActions';
import TextInput from '../common/TextInput';
import * as authActions from '../../actions/authActions';
import Button from '../common/Button';

/**
 * Class to create a custom user sign up form
 */
class SignUpForm extends React.Component {
   /**
   * constructor for instantiation of an object of this class
   * @param{Object} props - props passed down to this component
   */
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {},
      props.user,
      {
        password: '',
        passwordConfirmation: ''
      }
    );
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  /**
   * Method to handle sign up event
   * @param{Object} event - sign up event
   * @return{Void} - Returns nothing
   */
  handleSignUp(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.props.authActions.updateSignUpProcessing(true);
      this.props.userActions.signUp({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      });
    } else {
      // we want to show errors here
      notify.show(
        'Required Fields Are Missing',
        'custom',
        5000,
        { background: '#ff5252', text: '#FFFFFF' }
      );
    }
  }


  /**
   * Method to help with validating user Input before proceeding
   * to sign up
   * @return {Boolean} - True is necessary fields are provided and accurate,
   * otherwise false
   */
  validateInput() {
    return (
      Validator.isEmail(this.state.email) &&
      !Validator.isEmpty(this.state.firstName) &&
      !Validator.isEmpty(this.state.lastName) &&
      !Validator.isEmpty(this.state.password) &&
      Validator.equals(this.state.password, this.state.passwordConfirmation)
    );
  }

  /**
   * Method to handle text change in the input fields
   * @param{Object} event - Event object
   * @return{Void} - Returns void
   */
  handleTextChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Method to render the progress bar component
   * @return{Object} - Progress bar component
   */
  renderProgressBar() {
    if (this.props.processingSignUp) {
      return (
        <div className="row">
          <div className="col s6 offset-s3">
            <p className="center-align">Contacting Server....</p>
            <div className="progress col s12 m8 offset-m2" >
              <div className="indeterminate" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="center-align">
          <Button
            type="submit"
            name="btn_login"
            value="Create Account"
            disabled={this.props.processingSignUp}
            className="btn waves-effect waves-light teal darken-3 center-align"
          />
          <Link to="signin">
            <h6
              className="center-align"
            >Already have an account? Sign In</h6>
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Method for rendering this component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <h3 className="left-align teal-text darken-3">Yo! Sign Up Now</h3>
          <div className="row grey lighten-5 z-depth-2 form-padding">
            <form onSubmit={this.handleSignUp}>
              <br />
              <div className="input-field col s12">
                <TextInput
                  id="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  label="Email Address"
                  placeHolder="Enter your email address"
                  handleTextChange={this.handleTextChange}
                />
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <TextInput
                    id="firstName"
                    type="text"
                    className="validate"
                    value={this.state.firstName}
                    label="First Name"
                    placeHolder="Enter your first name"
                    handleTextChange={this.handleTextChange}
                  />
                </div>
                <div className="input-field col s6">
                  <TextInput
                    id="lastName"
                    type="text"
                    className="validate"
                    value={this.state.lastName}
                    label="Last Name"
                    placeHolder="Enter your last name"
                    handleTextChange={this.handleTextChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <TextInput
                    id="password"
                    type="password"
                    className="validate"
                    value={this.state.password}
                    label="Password"
                    placeHolder="Enter your password"
                    handleTextChange={this.handleTextChange}
                  />
                </div>
                <div className="input-field col s6">
                  <TextInput
                    id="passwordConfirmation"
                    type="password"
                    className="validate"
                    value={this.state.passwordConfirmation}
                    label="Confirm Password"
                    placeHolder="Verify your password"
                    handleTextChange={this.handleTextChange}
                  />
                </div>
              </div>
              {this.renderProgressBar()}
            </form>
            <br />
          </div>
          <br />
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userActions: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  processingSignUp: PropTypes.bool.isRequired
};

/**
 * Function to match our dispatch function to this component props
 * @param {Function} dispatch - dispatch function from our store
 * object passed down fro our Provider
 * @return {Object} object containing all actions we want our store
 * the ability to dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

/**
 * Function to match a slice of our state tree to this component props
 * @param {Object} state - Current state of the user slice of our state
 * tree.
 * @return {Object} - part of our state tree we want available to our component
 * as props
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    processingSignUp: state.processingSignUp
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
