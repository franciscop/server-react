# React for server.js

> **Highly experimental plugin** for [server.js](https://serverjs.io/):

## Install

```bash
npm install server @server/react
```

## Usage

First thing in your `index.js` file:

```js
const server = require('server');
server.plugins.push(require('@server/react'));

server(...);
```

Then you can add routes to it. See the example from this project's repository in the `index.js`:

```js
const server = require('server');
server.plugins.push(require('./plugin'));
const { get, error } = server.router;
const { render } = server.reply;

server(
  get('/b/:subreddit', ctx => render('handler.js')),

  // Just some light error handling
  error(ctx => { console.log(ctx.error); })
);
```

Each page that you create under the `pages` folder will be automatically linked, and here we are also handling any subreddit manually with `handler.js`.
