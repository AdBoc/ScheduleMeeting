import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer__label">Source Code On:</p>
      <a href="https://github.com/AdBoc/ScheduleMeeting" target="_blank" rel="noopener noreferrer"><img className="footer__git-icon" alt="Github link" src={require('../../assets/GitHub-Mark-64px.png')}></img></a>
    </footer>
  )
};

export default Footer;