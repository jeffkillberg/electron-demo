Readme.md

Started here:
https://www.electronforge.io/guides/framework-integration/react-with-typescript

Some good comments on electron security, ipc communication issues, etc:
https://github.com/electron/electron/issues/9920#issuecomment-575839738

For this demo, have enabled `nodeIntegration: true` which allows node module use from the renderer 'side'.
This is an insecure pattern - more details on exposing node from the main 'side' via context bridge is here: https://www.debugandrelease.com/the-ultimate-electron-guide/
1655862026900
1655863880147
