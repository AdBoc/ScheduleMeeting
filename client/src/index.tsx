import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
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