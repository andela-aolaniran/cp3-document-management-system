import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent, redirectUrl) {
  class Authenticate extends React.Component {

    componentWillMount() {
      if (this.props.user.token) {
        this.context.router.push('/documents');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user.token) {
        this.context.router.push('/documents');
      }
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }

  }

  Authenticate.propTypes = {
    user: React.PropTypes.object.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps, null)(Authenticate);
}
