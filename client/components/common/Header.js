import React from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';

/**
 * Header component for the app
 */
class Header extends React.Component {

  componentDidMount() {
    //const element = ReactDOM.findDOMNode(this.refs.nav)

    //$(element).ready(() => {
      $('.button-collapse').sideNav();
    //});
  }

  /**
   * Navigation components
   * @return{Object} - Navigation component to be rendered
   */
  render() {
    return (
      <div>
        <nav ref='nav'>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo right'>Logo</Link>
            <Link to='/' 
              data-activates="mobile"
              className="button-collapse">
                <i className="material-icons">menu</i>
            </Link>
            <ul id='nav-mobile' className='left hide-on-med-and-down'>
              <li><Link to='about' activeClassName='active'>About</Link></li>
              <li><Link to='sign_up'>Sign Up</Link></li>
            </ul>
            <ul class="side-nav" id="mobile">
              <li><Link to='about' activeClassName='active'>About</Link></li>
              <li><Link to='sign_up'>Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
