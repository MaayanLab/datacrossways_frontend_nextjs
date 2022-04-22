import React from 'react';
import styles from './deletebutton.module.css'

/**
 * Primary UI component for user interaction
 */
export const DeleteButton = ({ children, ...rest }) => {
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

export default DeleteButton;