import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications from 'react-notify-toast';
import Header from './common/Header';
import * as userActions from '../actions/userActions';

/**
 * Main app component which extends React component
 */
class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAvailableDocuments = this.handleAvailableDocuments.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleViewUsers = this.handleViewUsers.bind(this);
  }

  /**
   * Function to determine if the nav header should be displayed
   * @return {Object} - NavHeader element if user token in present
   * indicating that the user is logged in else it returns a
   * node element to show that the user is not logged in
   */
  renderNavHeader() {
    return (
      <Header
        handleAvailableDocuments={this.handleAvailableDocuments}
        handleProfileUpdate={this.handleProfileUpdate}
        handleSignOut={this.handleSignOut}
        handleViewUsers={this.handleViewUsers}
        isLoggedIn={this.props.user.token ? true : false}
      />
    );
  }

  // handleSignOut: PropTypes.func.isRequired,
  // handleCreateDocument: PropTypes.func.isRequired,
  // handleProfileUpdate: PropTypes.func.isRequired,
  // handleViewUsers: PropTypes.func.isRequired

  handleSignOut(event) {
    event.preventDefault();
    this.props.actions.signOut(this.props.user.token);
  }

  handleAvailableDocuments(event) {
    event.preventDefault();
    this.context.router.push('/documents');
  }

  handleProfileUpdate(event) {
    event.preventDefault();
  }

  handleViewUsers(event) {
    event.preventDefault();
  }

  /**
   * Method to describe what shoud be rendered on the screen
   * @return{Object} view to be rendered by react
   */
  render() {
    return (
      <div >
        { this.renderNavHeader() }
        <Notifications />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired
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
    actions: bindActionCreators(userActions, dispatch)
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
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
