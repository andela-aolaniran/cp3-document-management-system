import app from './server/server.js';
import logger from 'fm-log';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';


const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (request, response) => {
  response.sendFile('../client/index.html');
});

const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  logger.info(`Server running on ${port}`);
});