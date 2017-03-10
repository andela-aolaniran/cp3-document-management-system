import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Validator from 'validator';
import { notify } from 'react-notify-toast';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

/**
 * Class to create a custom user sign up form
 */
class SignInForm extends React.Component {
   /**
   * constructor for instantiation of an object of this class
   * @param{Object} props - props passed down to this component
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  /**
   * Method to handle sign up event
   * @param{Object} event - sign up event
   * @return{Void} - Returns nothing
   */
  handleSignIn(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.props.authActions.updateSignInProcessing(true);
      this.props.userActions.login({
        email: this.state.email,
        password: this.state.password
      });
    } else {
      // we want to show errors here
      notify.show(
        'Required Fields Are Missing/Invalid',
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
      !Validator.isEmpty(this.state.password)
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
    if (this.props.processingSignIn) {
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
            value="Sign In"
            name="btn_login"
            disabled={this.props.processingSignIn}
            className="btn waves-effect waves-light teal darken-3 center-align"
          />
          <Link to="signup">
            <h6
              className="center-align"
            >Do not have an account ? Sign up now</h6>
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
          <h3 className="left-align teal-text darken-3">Yo! Sign In</h3>
          <div className="row grey lighten-5 z-depth-2 form-padding">
            <form onSubmit={this.handleSignIn}>
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
                <div className="input-field col s12">
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

SignInForm.propTypes = {
  userActions: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  processingSignIn: PropTypes.bool.isRequired
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
    processingSignIn: state.processingSignIn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
