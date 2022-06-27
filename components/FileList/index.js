import React from 'react';
import styles from './filelist.module.css'

export const FileList = ({ posts, loading, handleShow, editFile }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          <div className={styles.filerow}>
            <div>{post.id}</div>
            <div>{post.name}</div>
            <div>{post.uuid}</div>
            <div>{post.owner}</div>
            <div>{post.status}</div>
            <div>{post.date}</div>
            <div><button onClick={() => {
              editFile(post);
              handleShow();
            }}>
              Edit File
              </button></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;