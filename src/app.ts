import './config/config';

import { config } from './config';
import { BuyerProvider } from './buyer';
import { LoggerConsole } from './logger';
import { Db, CustomerModel, CustomersRepository } from './db';

const logger = new LoggerConsole();

const db = new Db(config.dbUri, logger);

async function run(): Promise<void> {
  const buyerProvider = new BuyerProvider();
  const customersRepository = new CustomersRepository(CustomerModel);

  for await (const buyers of buyerProvider.read()) {
    logger.log(buyers.length);
    await customersRepository.insertMany(buyers);
  }
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
