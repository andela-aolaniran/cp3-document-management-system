import React, {PropTypes, Component} from 'react';
import Header from './common/Header';
  
/**
 * Main app component which extends React component
 */
class App extends Component {

  /**
   * Method to describe what shoud be rendered on the screen
   * @return{Object} view to be rendered by react
   */
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
