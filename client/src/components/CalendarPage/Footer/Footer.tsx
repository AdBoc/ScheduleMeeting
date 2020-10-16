import React from 'react';
import {GitSvg} from "../../../assets/GitSvg";

const Footer = () => {
  return (
    <footer>
      <p>v 1.4</p>
      <div>
        <p>Source Code On:</p>
        <GitSvg/>
      </div>
    </footer>
  );
}

export default Footer;