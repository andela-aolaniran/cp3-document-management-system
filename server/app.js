import logger from 'fm-log';
import app from './config/server';

const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  return logger.info(`Server running on ${port}`);
});
