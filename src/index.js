import React from 'react';
import ReactDOM from 'react-dom';
import MainBody from './covid19/main.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <MainBody/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
