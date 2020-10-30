import React from 'react';
import {GitSvg} from "../../../assets/GitSvg";
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <>
      <hr/>
      <footer className={styles.footer}>
        <p className={styles.version}>v 1.4</p>
        <p>Source Code:</p>
        <GitSvg cssClass={styles.svgStyle}/>
      </footer>
    </>
  );
}

export default Footer;