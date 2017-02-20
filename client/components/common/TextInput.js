import React from 'react';

/**
 * Class for creating a custom smart text input component
 */
export default class TextInput extends React.Component {
  /**
   * constructor for instantiation of an object of this class
   * @param{Object} props - props passed down to this component
   */
  constructor(props) {
    super(props);
  }

  /**
   * Method for rendering this component
   * @return{Object} - component to be rendered
   */
  render() {
    return (
    <div>
      <input placeHolder={this.props.placeHolder}
        id={this.props.id} 
        type={this.props.type} 
        className={this.props.className}
        value={this.props.value}
        onChange={this.props.handleTextChange} />
      <label htmlFor={this.props.id} className='active'>
        {this.props.label}
      </label>
    </div>
    );
  }
}

