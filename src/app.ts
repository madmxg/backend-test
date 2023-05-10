import * as dotenv from 'dotenv';
dotenv.config();

import { Db } from './common/db';
import { config } from './common/config';
import { LoggerConsole } from './common/logger';
import { appProgram } from './programs/app-program';

const logger = new LoggerConsole();

const db = new Db(config.dbUri, logger);

db.connect()
  .then(() => appProgram())
  .catch((error) => logger.error(error))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(() => db.disconnect());

process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received.');
  db.disconnect().finally(() => process.exit(0));
});
