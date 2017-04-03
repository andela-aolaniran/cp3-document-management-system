import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config.dev';

const compiler = webpack(config);

/**
 * function to configure an Express app to use
 * webpack development middlewares
 * @param {Object} app - Express app
 * @return {undefined} - Returns undefined
 */
export default function (app) {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
