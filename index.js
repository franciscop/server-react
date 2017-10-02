const server = require('server');
server.plugins.push(require('./plugin'));
const { get, error } = server.router;
const { render } = server.reply;

server(

  get('/b/:subreddit', ctx => render('handler.js')),

  // handle() returns a promise
  get('*', ctx => ctx.nexthandle(ctx.req, ctx.res)),

  // Just some light error handling
  error(ctx => { console.log(ctx.error); })
);
