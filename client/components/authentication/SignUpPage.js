import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import SignUpForm from './SignUpForm';

/**
 * Class for creating the SignUp page component
 */
class SignUpPage extends React.Component {

  constructor(props){
    super(props);
  }

  enableSignUpButton() {
    return this.state.processingSignUp;
  }

  /**
   * Method to render the Component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
      <div className='row'>
        <div className='col s6 offset-s3'>
          <br/>
          <h3 className='indigo-text center-align'>Sign Up</h3>
          <br/>
          <SignUpForm 
          />
          <Link to='sign_in'>
            <h6 className='center-align'>Sign In</h6>
          </Link>
        </div>
      </div>
    );
  }
}

SignUpPage.propType = {
  createUser: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch) 
  };
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
