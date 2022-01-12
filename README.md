# BuscaTermos

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Opens electron window with dev tools opened, compiling react in watch mode.

### `npm run test:react`

Runs unit test on react.

### `npm run test:react-coverage`

Runs unit test on react and generates coverage.
It generates coverage in `coverage` folder.

### `npm run test:api`

Runs unit tests on the API that processes "requests".
It generates coverage in `coverage/electron` folder.

### `npm run build:react`

Builds the react for production to the `build` folder.

### `npm run build:electron-windows`

Builds electron and generates executable file for Windows platform to the `dist` folder.

### `npm run build:installer-windows`

Builds the App installer for windows (`.msi`) in `release/msi` folder.

### `npm run build:zip`

Builds the App portable version in `release/zip` folder.

### `npm run build`

Builds the entire app, cleaning generated folders, then builds react, electron and the installers.
