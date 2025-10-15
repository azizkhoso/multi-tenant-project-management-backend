import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import getEnv from './utils/getEnv';
import { logError, logInfo } from './utils/logger';
import errorMiddleware from './middlewares/error';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = getEnv('PORT');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);
// error middleware
app.use(errorMiddleware);

connectToDatabase()
  .then(() => {
    logInfo('Connected to the database successfully');
    app.listen(PORT, () => {
      logInfo(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logError('Unable to connect to the database: ' + err.message, { error: err });
    process.exit(1);
  });