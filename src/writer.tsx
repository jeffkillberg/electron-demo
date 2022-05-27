import * as React from "react";

import { ipcRenderer, shell } from 'electron';

function Writer() {
    const writeToFile = async () => {
        ipcRenderer.send('foo', 'bar');
    };
    return (
        <div>
            <p>
                <button onClick={() => writeToFile()} >
                    Write to README.md
                </button>
            </p>
        </div>
    );
}

export default Writer;