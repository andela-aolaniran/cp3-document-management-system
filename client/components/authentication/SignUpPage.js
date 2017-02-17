import React from 'react';
import {Link} from 'react-router';

/**
 * Class for creating the SignUp page component
 */
class SignUpPage extends React.Component {

  /**
   * Method to render the Component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className='row valign-wrapper'>
        <div className='col s12 m6 offset-m3'>
          <br/>
          <h3 className='indigo-text center-align'>Sign Up</h3>
          <br/>
          <div className='z-depth-1 grey lighten-4'>
            <form>
              <div className='row'>
                <br/>
                <div class='row'>
                  <div className='input-field col s6'>
                    <input placeHolder='Enter your first name'
                      id='first_name' type='text' className='validate' />
                    <label htmlFor='first_name' className='active'>First Name </label>
                  </div>
                  <div className='input-field col s6'>
                    <input placeHolder='Enter your last name'
                      id='last_name' type='text' className='validate' />
                    <label htmlFor='last_name' className='active'>Last Name </label>
                  </div>
                </div>
                <div className='input-field col s12'>
                  <input placeHolder='Enter a valid email address'
                    id='email' type='email' className='validate' />
                  <label htmlFor='email' data-error='Invalid Email' 
                    data-success='Email Valid' className='active'>Email Address </label>
                </div>
                <div className='input-field col s12'>
                  <input placeHolder='Enter your password'
                    id='password' type='password' className='validate' />
                  <label htmlFor='password' className='active'>Password</label>
                </div>
                <div className='input-field col s12'>
                  <input placeHolder='Confirm your password'
                    id='password_confirm' type='password' className='validate' />
                  <label htmlFor='password_password' className='active'>Confirm Password</label>
                </div>
              </div>
              <div className='row'>
                <button type='submit'
                  name='btn_login' 
                  className='col s12 m6 offset-m3 btn btn-large waves-effect indigo'>
                  Create Account</button>
              </div>
              <br/>
            </form>
          </div>
            <br/>
            <Link to='sign_in'>
              <h6 className='center-align'>Sign In</h6>
            </Link>
        </div>
      </div>
    );
  }
}

export default SignUpPage;