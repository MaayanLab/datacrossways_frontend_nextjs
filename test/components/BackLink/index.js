import React from 'react';
import Link from 'next/link'
import styles from './backlink.module.css'

/**
 * Primary UI component for user interaction
 */
export const BackLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
    >
      <span className={styles.l1}>{children}</span>
    </Link>
  );
};

export default BackLink;
