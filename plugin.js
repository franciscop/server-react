const next = require('next');

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

    // ctx.app.engine('js', (file, options, callback) => {
    //   console.log('Hey there!', options, file);
    //
    //   return ctx.nextapp.render(ctx.req, ctx.res, '/b', Object.assign({}, ctx.query, {
    //     subreddit: ctx.params.subreddit
    //   }));
    // });
  },
  before: [
    ctx => {
      ctx.res.locals.ctx = ctx;
    }
  ]
};




// const { get } = require('server/router');
// const fs = require('mz/fs');
// const path = require('path');
//
// const webpack = require("webpack");
// const MemoryFS = require("memory-fs");
// const fsmem = new MemoryFS();
//
// let compiled = false;
//
//
// const compile = async (entry, template) => {
//   const compiler = webpack({
//     entry,
//     output: {
//       path: '/',
//       filename: 'bundle.min.js'
//     },
//     module: {
//       loaders: [{
//         test: /.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: { presets: ['es2015', 'react'] }
//       }]
//     },
//   }, (err, stats) => {
//     if (err || stats.hasErrors()) {
//       if (err || stats.hasErrors) {
//         console.log(err, stats.hasErrors(), stats.errors);
//       }
//     }
//     // Done processing
//   });
//
//   compiler.outputFileSystem = fsmem;
//
//   return new Promise((resolve, reject) => {
//     compiler.run((err, stats) => {
//       if (err) return reject(err);
//       resolve(fsmem.readFileSync('/bundle.min.js', 'utf8'));
//     });
//   });
// };
//
//
// module.exports = {
//   name: 'react',
//   options: {
//     entry: {
//       default: process.cwd() + '/views/App.jsx',
//       file: true
//     },
//     template: {
//       clean: (value, opts) => value || `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <title>React App</title>
//         </head>
//         <body>
//           <div id="root"></div>
//           <script src="/bundle.min.js"></script>
//         </body>
//         </html>
//       `
//     }
//   },
//   init: ctx => {
//     ctx.app.engine('jsx', (file, options, callback) => {
//       callback(null, ctx.options.react.template);
//     });
//   },
//   before: [
//     get('/bundle.js', async ctx => {
//       try {
//         const compiled = await compile(ctx.options.react.entry);
//         // console.log(compiled);
//         return compiled;
//       } catch (err) {
//         console.log('Error!', err);
//       }
//     })
//   ]
// };
