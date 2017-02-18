import logger from 'fm-log';
import app from './server/server';
import open from 'open';

const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  logger.info(`Server running on ${port}`);
  if (process.NODE_ENV ===  'development') {
    open(`http://localhost:${port}`);
  }
});
