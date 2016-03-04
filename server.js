
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const fs = require('fs');

const port = 3000;
const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

const writeComponents = function () {
  const dirs = fs.readdirSync(path.resolve('components'));
  const App = fs.readFileSync(path.resolve('preview', 'AppTemplate.js')).toString();
  fs.writeFileSync(
    path.resolve('preview', 'App.js'),
    App.replace('__COMPONENTS__', JSON.stringify(dirs.reduce(function (components, dir) {
      components[dir] = 'require(\'../components/' + dir + '\').default';
      return components;
    }, {})).replace(/\"require/g, 'require').replace(/default\"/g, 'default'))
  );
}

writeComponents();
app.use(function (req, res, next) {
  writeComponents();
  next();
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {

  res.write(fs.readFileSync(path.resolve('index.tpl.html')));
  res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
