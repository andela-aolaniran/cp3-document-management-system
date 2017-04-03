import React from 'react';

const Button = props => (
  <input
    type={props.type}
    disabled={props.disabled}
    className={props.className}
    value={props.value}
    onClick={props.onClick}
  />
);

Button.propTypes = {
  value: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
