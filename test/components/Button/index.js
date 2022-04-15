import React from 'react';
import styles from './button.module.css'

/**
 * Primary UI component for user interaction
 */
export const Button = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className={styles.button}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
