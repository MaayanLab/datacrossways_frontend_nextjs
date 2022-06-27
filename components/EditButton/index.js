import React from 'react';
import styles from './editbutton.module.css'

async function edit_user(user){
  console.log(user)
}

/**
 * Primary UI component for user interaction
 */
export const EditButton = ({children, user, ...rest }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => edit_user(user)}
      {...rest}
    >
      <span>{children} - {user.first_name}</span>
    </button>
  );
};

export default EditButton;