import logger from 'fm-log';
import app from './server/server';

const port = process.env.PORT || 3090;
app.listen(port, () => {
  logger.info(`Server running on ${port}`);
});
