import logger from 'fm-log';
import app from './server/server';
import open from 'open';
import path from 'path';

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  logger.info(`Server running on ${port}`);
});
