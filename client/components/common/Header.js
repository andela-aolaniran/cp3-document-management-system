import React from 'react';
import {Link} from 'react-router';

/**
 * Header component for the app
 */
class Header extends React.Component {
  /**
   * Navigation components
   * @return{Object} - Navigation component to be rendered
   */
  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper'>
            <Link to='/'>Logo</Link>
            <ul className='right hide-on-med-and-down'>
              <li><Link to='about' activeClassName='active'>About</Link></li>
              <li><Link to='create_document' activeClassName='active'>Create Document</Link></li>
              <li><Link to='list_documents' activeClassName='active'>Update Document</Link></li>
              <li><Link to='sign_in'>Sign In</Link></li>
              <li><Link to='sign_up'>Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
