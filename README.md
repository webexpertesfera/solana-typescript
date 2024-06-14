# React + TypeScript + Jest

This project uses implementation of SolanaAccountManager class, which can fetch tokens from account, also it can compare two accounts.
As of now it is using mock data and it is not realtime, or using any api

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run dev
```

To run test cases

```sh
npm run test
```

## Documentation

To use this in your app

```sh
const manage = new SolanaAccountManager();
const tokens = await manage.compareBalances('token1', 'token2');
```