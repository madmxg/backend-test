import { FilterQuery } from 'mongoose';

import {
  CustomerModel,
  CustomerDocument,
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

  // TODO: use repository method
  for await (const customer of CustomerModel.find(filter).cursor()) {
    const customerAnonymised = mapToCustomerAnonymised(customer.toObject());
    await customerAnonymisedRepository.upsertOne(customerAnonymised);
  }
}
