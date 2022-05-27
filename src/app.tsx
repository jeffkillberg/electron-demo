import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Writer from './writer';

function render() {
  ReactDOM.render(
      <div>
        <h2>Electron Demo</h2>
        <p/>
        <Writer></Writer>
      </div>, 
  document.body);
}

render();

