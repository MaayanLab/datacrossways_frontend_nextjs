import React from 'react';
import styles from './googlebutton.module.css'

/**
 * Primary UI component for user interaction
 */
export const GoogleButton = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className={styles.button}
      {...rest}
    >
      <img src="/google_logo.svg"/>
      <div>{children}</div>
    </button>
  );
};

export default GoogleButton;
