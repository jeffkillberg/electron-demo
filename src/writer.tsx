import * as React from "react";
import { useState } from "react";
import path from 'path';
import fs from 'fs';

import { ipcRenderer, shell } from 'electron';

function Writer() {
  const [path, setPath] = useState('');
  const [path2, setPath2] = useState('');
  const [path3, setPath3] = useState('');

  const pickDir = async () => {
    new Promise(resolve => {
      ipcRenderer.send('select-dirs', '');
      ipcRenderer.on('select-dirs-reply', (event, result) => {
        resolve(result);
      });
    }).then(
      (result:string) => {
        setPath3(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

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

  // useEffect to replace componentWillMount / componentWillUnmount
  React.useEffect(() => {
    console.log("component mounted");

    // get the app path
    new Promise(resolve => {
      ipcRenderer.send('fetch-app-info', 'exe');
      ipcRenderer.on('fetch-app-info-reply-exe', (event, result) => {
        resolve(result);
      });
    }).then(
      (result:string) => {
        setPath2(result);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
        console.log("component unmounted");
    };
  }, []);

  return (
    <div>
      <p>
        <button onClick={() => writeToFile()} >
          Write to README.md
        </button>
        appPath: {path}
        <p/>
        exe: {path2}
        <p/>
        pick root: {path3}
        <p/>
        <button onClick={() => pickDir()} >
          Pick root directory
        </button>

      </p>
    </div>
  );
}

export default Writer;