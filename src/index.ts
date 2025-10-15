import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import getEnv from './utils/getEnv';
import { logError, logInfo } from './utils/logger';
import errorMiddleware from './middlewares/error';
import { connectToDatabase } from './config/database';
import { syncDb } from './models';

const app = express();
const PORT = getEnv('PORT');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);
// error middleware
app.use(errorMiddleware);

async function initialize() {
  try {
    logInfo('Initializing application...');
    await connectToDatabase();
    await syncDb();
    logInfo('Database synchronized successfully');
    app.listen(PORT, () => {
      logInfo(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logError('Initialization failed: ' + (error as Error).message, { error });
    process.exit(1);
  }
}

initialize();
