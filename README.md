# React for server.js

> **Highly experimental plugin** for [server.js](https://serverjs.io/):

Renders React both server-side and browser-side by using next underneath. Write React for managing your views and make your website faster as a SPA.


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

## Pages examples

For our main page, `pages/index.js`:

```js
// pages/index.js
import React from 'react';
import Link from 'next/link';

import Nav from './Nav.js';

export default props => (
  <main>
    <Nav>Main page</Nav>
    <h1>Hello {props.user}</h1>
    <p>I am working quite nicely</p>
    <Link href="/about">About me</Link>
  </main>
);
```

For more information about us:

```js
import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

export default class About extends React.Component {
  static async getInitialProps ({ req }) {
    return {
      server: !!req
    };
  }
  render () {
    return (
      <div>
        <style jsx>{`button { background: red; }`}</style>
        <Head>
          <title>Hello {this.props.server ? 'server' : 'client'}</title>
        </Head>
        Hi {this.props.server ? 'server' : 'client'}
        <Link href="/">
          <button>Homepage</button>
        </Link>
      </div>
    );
  }
}
```

For dynamic routes in `pages/handler.js`:

```js
import React from 'react';
import Nav from './Nav.js';

export default props => (
  <div>
    <Nav>Sub!</Nav>
    <p>Subpage {props.url.query.subreddit}</p>
  </div>
);
```
