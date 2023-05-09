import './config/config';

import { config } from './config';
import { BuyerProvider } from './buyer';
import { LoggerConsole } from './logger';
import { connectDb, CustomerModel, CustomersRepository } from './db';

const logger = new LoggerConsole();

async function run(): Promise<void> {
  await connectDb(config.dbUri);

  const buyerProvider = new BuyerProvider();
  const customersRepository = new CustomersRepository(CustomerModel);

  for await (const buyers of buyerProvider.read()) {
    logger.log(buyers.length);
    await customersRepository.insertMany(buyers);
  }
}

run().catch((error) => logger.error(error));
