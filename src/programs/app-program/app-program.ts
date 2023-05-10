import { BuyerProvider } from './buyer';
import { LoggerConsole } from '../../common/logger';
import { CustomerModel, CustomersRepository } from '../../common/db';

export async function appProgram() {
  const logger = new LoggerConsole();
  const buyerProvider = new BuyerProvider(logger);
  const customersRepository = new CustomersRepository(CustomerModel);

  for await (const buyers of buyerProvider.read()) {
    await customersRepository.insertMany(buyers);
  }
}
