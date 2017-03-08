import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

/**
 * Header component for the app
 */
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  goHome(event) {
    event.preventDefault();
    browserHistory.push('/');
  }

  renderAppropriateNavLinks() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <ul className="right hide-on-med-and-down">
            <li>
              <a
                href
                onClick={this.props.handleAvailableDocuments}
              >Availaible Documents</a></li>
            <li>
              <a
                href
                onClick={this.props.handleProfileUpdate}
              >My Profile</a></li>
            <li><a href onClick={this.props.handleViewUsers}>All Users</a></li>
            <li><a href onClick={this.props.handleSignOut}>Sign out</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <a
                href
                onClick={this.props.handleAvailableDocuments}
              >Availaible Documents</a></li>
            <li>
              <a
                href
                onClick={this.props.handleProfileUpdate}
              >My Profile</a></li>
            <li><a href onClick={this.props.handleViewUsers}>All Users</a></li>
            <li><a href onClick={this.props.handleSignOut}>Sign out</a></li>
          </ul>
        </div>
      );
    }
    return null;
  }

  /**
   * Navigation components
   * @return{Object} - Navigation component to be rendered
   */
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="teal darken-3">
          <div className="nav-wrapper">
            <a href onClick={this.goHome} className="brand-logo">CP3 DMS</a>
            <a href data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            {this.renderAppropriateNavLinks()}
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  handleAvailableDocuments: PropTypes.func.isRequired,
  handleProfileUpdate: PropTypes.func.isRequired,
  handleViewUsers: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default Header;
