import app from './server/server';
import logger from 'fm-log';

const port = process.env.PORT || 3090;
app.listen(port, () => {
  logger.info(`Server running on ${port}`);
});