import React from 'react';
import {Link} from 'react-router';

/**
 * Class for creating the SignIn page component
 */
class SignInPage extends React.Component {

  /**
   * Method to render the Component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className='row'>
        <div className='col s12 m6 offset-m3'>
          <br/>
          <h3 className='indigo-text center-align'>Log In</h3>
          <br/>
          <div className='z-depth-1 grey lighten-4'>
            <form>
              <div className='row'>
                <br/>
                <div className='input-field col s12'>
                  <input
                    id='email' type='email' className='validate' />
                  <label htmlFor='email' data-error='Invalid Email' 
                    data-success='' className='active'>Email Address</label>
                </div>
                <div className='input-field col s12'>
                  <input placeHolder='xyz@nomailer.com'
                    id='email' type='password' className='validate' />
                  <label htmlFor='password' className='active'>Password</label>
                </div>
              </div>
              <div className='row'>
                <button type='submit'
                  name='btn_login' 
                  className='col s12 m6 offset-m3 btn btn-large waves-effect indigo'>
                  Login</button>
              </div>
              <br/>
            </form>
          </div>
            <br/>
            <Link to='sign_up'>
              <h6 className='center-align'>Create Account</h6>
            </Link>
        </div>
      </div>
    );
  }
}

export default SignInPage;
