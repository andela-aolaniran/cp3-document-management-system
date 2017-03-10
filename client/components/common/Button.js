import React from 'react';

/**
 * This is a presentational component to create
 * default buttons in this app
 * @param{Object} props - Properties of this component passed down
 * from it's parent
 * @returns - A Button component to be rendered
 */
const Button = props =>
  (
    <button
      type={props.type}
      name={props.name}
      value={props.value}
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
    >{props.value}
    </button>
  );

Button.propTypes = {
  type: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: null
};

export default Button;
