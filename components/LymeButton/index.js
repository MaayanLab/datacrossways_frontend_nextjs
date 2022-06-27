import React from 'react';
import styles from './lymebutton.module.css'

/**
 * Primary UI component for user interaction
 */
export const LymeButton = ({ children, ...rest }) => {
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

export default LymeButton;
