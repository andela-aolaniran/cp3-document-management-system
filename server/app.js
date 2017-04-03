import logger from 'fm-log';
import path from 'path';
import app from './config/server';
import addDevSetup from './config/addDevSetup';

// add webpack dev tools if we are in development mode
if (process.env.NODE_ENV !== 'production') {
  addDevSetup(app);
}

// configure our catch all routes
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3090;
app.listen(port, (error) => {
  if (error) {
    return logger.error(error);
  }
  return logger.info(`Server running on ${port}`);
});
