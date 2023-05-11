import { FilterQuery } from 'mongoose';

import {
  CustomerModel,
  CustomerDocument,
  CustomerRepository,
  CustomerAnonymisedModel,
  CustomerAnonymisedRepository,
} from '../../common/db';
import { LoggerConsole } from '../../common/logger';
import { mapToCustomerAnonymised } from '../../common/mappers';

export async function syncProgramReindex(
  filter: FilterQuery<CustomerDocument> = {}
): Promise<void> {
  const logger = new LoggerConsole();

  logger.log('reindex mode');

  const customerAnonymisedRepository = new CustomerAnonymisedRepository(
    CustomerAnonymisedModel
  );
  const customerRepository = new CustomerRepository(CustomerModel);

  for await (const customer of customerRepository.findWithCursor(filter)) {
    const customerAnonymised = mapToCustomerAnonymised(customer.toObject());
    await customerAnonymisedRepository.upsertOne(customerAnonymised);
  }
}
