import { BuyerProvider } from './buyer';
import { LoggerConsole } from '../../common/logger';
import { CustomerModel, CustomerRepository } from '../../common/db';

export async function appProgram(): Promise<void> {
  const logger = new LoggerConsole();
  const buyerProvider = new BuyerProvider(logger);
  const customerRepository = new CustomerRepository(CustomerModel);

  for await (const buyers of buyerProvider.read()) {
    await customerRepository.insertMany(buyers);
  }
}
