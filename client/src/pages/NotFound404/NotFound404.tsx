import React from 'react';
import styles from './notFound.module.scss';

const NotFound404 = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.statusCode}>404</h2>
      <h2 className={styles.message}>Route does not exist</h2>
    </div>
  );
}

export default NotFound404;