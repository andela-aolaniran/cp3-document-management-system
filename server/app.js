import logger from 'fm-log';
import path from 'path';
import app from './config/server';
import addDevSetup from './config/addDevSetUp';

if (process.env.NODE_ENV === 'development') {
  addDevSetup(app);
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
});
const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  return logger.info(`Server running on ${port}`);
});
