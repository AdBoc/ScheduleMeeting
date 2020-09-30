import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';

import './assets/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => {
    alert('Version 1.5 is available');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({type: 'SKIP_WAITING'});
    }
    window.location.reload();
  }
});