# resilientdb-javascript-sdk

**Authors:** Christopher Chen, Jamie Hsi, Samuel Li, Shrey Gupta, Tyler Beer

NPM Registry Link: https://www.npmjs.com/package/resilientdb-javascript-sdk

This repo holds the source code for the ResilientDB JavaScript SDK. It's meant to communicate with the GraphQL server and provide a simple and easy to use interface for JavaScript applications.

## How to clone repository
`git clone https://github.com/samuelili/resilientdb-javascript-sdk.git`

## How to push a new version of the npm package

```sh
npm login # first time only

npm run test # make sure tests pass
npm run build # build to ./dist
npm publish # publish to npm registry
```

## How to use the package
```sh
npm install resilientdb-javascript-sdk
```

```javascript
const resilientdb = require(“resilientdb-javascript-sdk”);

import resilientdb from “resilientdb-javascript-sdk”;
```