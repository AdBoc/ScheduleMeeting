import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorkerRegistration';

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => {
    alert('Version 1.1 is available');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({type: 'SKIP_WAITING'});
    }
    window.location.reload();
  }
}); 