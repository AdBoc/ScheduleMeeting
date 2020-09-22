import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer__version">v 1.1</p>
      <Link to="/sheet" className="sheet-link">Sheet</Link>
      <p>Source Code On:</p>
      <a href="https://github.com/AdBoc/ScheduleMeeting" target="_blank" rel="noopener noreferrer"><img className="footer__git-icon" alt="Github link" src={require('../../assets/GitHub-Mark.svg')}/></a>
    </footer>
  )
};

export default Footer;
