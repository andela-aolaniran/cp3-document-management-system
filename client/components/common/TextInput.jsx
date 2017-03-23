import React from 'react';

/**
 * Method to create a form text input field
 * @param {Object} props - properties object passed down from the components
 * parent
 * @return {Object} - Component to be rendered 
 */
const TextInput = props =>
  (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="help-block feedback">{props.feedback}</span>
    </div>
  );

TextInput.propTypes = {
  className: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  feedback: React.PropTypes.string.isRequired
};

export default TextInput;
