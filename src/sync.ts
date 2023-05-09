import './config/config';

import { config } from './config';
import { LoggerConsole } from './logger';
import {
  Db,
  CustomerAnonymisedModel,
  CustomerAnonymisedRepository,
  CustomerModel,
} from './db';
import { mapToCustomerAnonymised } from './mappers';

const logger = new LoggerConsole();

const db = new Db(config.dbUri, logger);

async function run(): Promise<void> {
  const customerAnonymisedRepository = new CustomerAnonymisedRepository(
    CustomerAnonymisedModel
  );

  if (process.argv.includes('--full-reindex')) {
    logger.log('reindex mode');

    for await (const customer of CustomerModel.find().cursor()) {
      const customerAnonymised = mapToCustomerAnonymised(customer);
      await customerAnonymisedRepository.upsertOne(customerAnonymised);
    }
  } else {
    logger.log('watch mode');

    const changeStream = CustomerModel.watch();
    changeStream.on('change', (change) => logger.log('----', change));
  }

  logger.log('done');
}

db.connect()
  .then(() => run())
  .catch((error) => logger.error(error))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(() => db.disconnect());

process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received.');
  db.disconnect().finally(() => process.exit(0));
});
