// Highly experimental, does not conform to server's specs
const next = require('next');
const { get } = require('server/router');

module.exports = {
  name: 'react',
  options: {
    dev: {
      find: ctx => ctx.parent.env !== 'production'
    }
  },
  init: async ctx => {
    ctx.nextapp = next(ctx.options.react);
    ctx.nexthandle = ctx.nextapp.getRequestHandler();
    await ctx.nextapp.prepare();
    ctx.app.set('views', './pages');

    // TODO: make this actually work

    ctx.app.engine('js', (file, options, callback) => {
      const query = Object.assign({}, options.ctx.query, options.ctx.params, options.query || {});
      file = file.split('/').pop();
      options.ctx.nextapp.render(options.ctx.req, options.ctx.res, '/' + file, query).then(res => {
        // callback(null, res);
      }).catch(callback);
    });
  },
  before: [
    ctx => {
      ctx.res.locals.ctx = ctx;
    }
  ],

  after: [

    // handle() returns a promise
    get('*', ctx => ctx.nexthandle(ctx.req, ctx.res)),
  ]
};
