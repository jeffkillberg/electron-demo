import * as React from "react";
import { useState } from "react";
import path from 'path';
import fs from 'fs';

import { ipcRenderer, shell } from 'electron';

function Writer() {
  const [path, setPath] = useState('');

  const writeToFile = async () => {

    // get the app path
    new Promise(resolve => {
      ipcRenderer.send('fetch-app-info', 'appPath');
      ipcRenderer.on('fetch-app-info-reply', (event, result) => {
        resolve(result);
      });
    }).then(
      (result) => {
        const content = Date.now().toString() + "\n";
        const filePath = result + '/README.md';
        fs.appendFile(filePath, content, err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Appended.`);
            setPath(filePath);
          }
        });


      },
      (error) => {
        console.log(error);
      }
    );



  };
  return (
    <div>
      <p>
        <button onClick={() => writeToFile()} >
          Write to README.md
        </button>
        {path}
      </p>
    </div>
  );
}

export default Writer;