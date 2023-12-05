# resilientdb-javascript-sdk

**Authors:** Christopher Chen, Jamie Hsi, Samuel Li, Shrey Gupta, Tyler Beer

NPM Registry Link: https://www.npmjs.com/package/resilientdb-javascript-sdk

This repo holds the source code for the ResilientDB JavaScript SDK. It's meant to communicate with the GraphQL server and provide a simple and easy to use interface for JavaScript applications.

# Install

```sh
npm install resilientdb-javascript-sdk
```

# How to Use

```typescript
import { ResilientDB, FetchClient } from '../../';

const client = new ResilientDB("https://cloud.resilientdb.com", new FetchClient());
```

# Available Clients

## Fetch
```typescript
const client = new ResilientDB("https://cloud.resilientdb.com", new FetchClient());
```

## Axios
```typescript
const client = new ResilientDB("https://cloud.resilientdb.com", new AxiosClient());
```

# Demo
The demo project is under the `demo` folder at the root of this repository. To run:

```sh
cd demo

npm install
npm run dev
```

Then open in your browser the dev sever that starts

## How to clone repository
`git clone https://github.com/samuelili/resilientdb-javascript-sdk.git`

## How to push a new version of the npm package

```sh
npm login # first time only

npm run test # make sure tests pass
npm run build # build to ./dist
npm publish # publish to npm registry
```