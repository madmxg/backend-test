import './config/config';

import { config } from './config';
import { LoggerConsole } from './logger';
import {
  connectDb,
  disconnectDb,
  CustomerAnonymisedModel,
  CustomerAnonymisedRepository,
  CustomerModel,
} from './db';
import { mapToCustomerAnonymised } from './mappers';

const logger = new LoggerConsole();

async function run(): Promise<void> {
  await connectDb(config.dbUri);

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

    // const changeStream = CustomerModel.watch();
    // changeStream.on('change', (change) => logger.log('----', change));
  }

  logger.log('done');
}

run()
  .then(() => disconnectDb())
  .catch((error) => logger.error(error));
