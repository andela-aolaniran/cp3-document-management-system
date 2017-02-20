import React from 'react';
import TextInput from '../common/TextInput';
import request from 'superagent';

/**
 * Class to create a custom user sign up form
 */
export default class SignUpForm extends React.Component {
   /**
   * constructor for instantiation of an object of this class
   * @param{Object} props - props passed down to this component
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      passwordConfirmation: '',
      processingSignUp: false
    };

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
    request
      .post('/api/users')
      .send({
        firstName: 'Manny',
        lastName: 'cat',
        email: 'thisemailere@gmail.com',
        roleId: 1,
        password: 'the password'
      })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if(error){
          console.log('request error: ', error);
        }
        console.log('response: ', response);
        // Calling the end function will send the request
      });
  }

  /**
   * Method to handle text change in the input fields
   * @param{Object} event - Event object
   * @return{Void} - Returns void
   */
  handleTextChange(event) {
    console.log(this.state);
    this.setState({[event.target.id]: event.target.value});
  }

  /**
   * Method to render the progress bar component
   * @return{Object} - Progress bar component
   */
  renderProgressBar() {
    if(this.state.processingSignUp) {
      return (
        <div className='col s6 offset-s3'>
          <p className='center-align'>Contacting Server....</p>
          <div className="progress col s12 m8 offset-m2" >
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    }
  }

  /**
   * Method for rendering this component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className='row z-depth-1 grey lighten-4'>
        <form onSubmit={this.handleSignUp}>
          <div className='input-field col s12'>
            <br/>
            <TextInput
              id='email'
                type='email'
                className='validate'
                value={this.state.email}
                label='Email Address'
                placeHolder='Enter your email address'
                handleTextChange={this.handleTextChange}
            />
          </div>
          <div class='row'>
            <div className='input-field col s6'>
              <TextInput
                id='firstName'
                type='text'
                className='validate'
                value={this.state.firstName}
                label='First Name'
                placeHolder='Enter your first name'
                handleTextChange={this.handleTextChange}
              />
            </div>
            <div className='input-field col s6'>
              <TextInput
                id='lastName'
                type='text'
                className='validate'
                value={this.state.lastName}
                label='Last Name'
                placeHolder='Enter your last name'
                handleTextChange={this.handleTextChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s6'>
              <TextInput
                id='password'
                  type='password'
                  className='validate'
                  value={this.state.password}
                  label='Password'
                  placeHolder='Enter your password'
                  handleTextChange={this.handleTextChange}
              />
            </div>
            <div className='input-field col s6'>
              <TextInput
                id='passwordConfirmation'
                  type='password'
                  className='validate'
                  value={this.state.passwordConfirmation}
                  label='Password Confirmation'
                  placeHolder='Verify your password'
                  handleTextChange={this.handleTextChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col s6 offset-s3'>
              <button type='submit'
                name='btn_login'
                disabled={this.state.processingSignUp}
                className='btn waves-effect waves-light indigo center-align'>
                Create Account
              </button>
            </div>
          </div>
          <div className='row'>
            {this.renderProgressBar()}
          </div>
        </form>
        <br/>
      </div>
    );
  }
}

