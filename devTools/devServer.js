import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'fm-log';
import config from '../webpack.config.dev';

const port = 3010;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    logger.error(error);
  } else {
    // open(`http://localhost:${port}`);
  }
});
