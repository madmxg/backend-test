import { FilterQuery } from 'mongoose';

import {
  CustomerModel,
  CustomerRepository,
  CustomerAnonymisedModel,
  CustomerAnonymisedDocument,
  CustomerAnonymisedRepository,
} from '../../common/db';
import { LoggerConsole } from '../../common/logger';
import { mapToCustomerAnonymised } from '../../common/mappers';

export async function syncProgramReindex(
  reindexFrom: CustomerAnonymisedDocument | null = null
): Promise<void> {
  const logger = new LoggerConsole();

  logger.log('Reindex %s', reindexFrom === null ? 'FULL' : reindexFrom._id);

  const customerRepository = new CustomerRepository(CustomerModel);
  const customerAnonymisedRepository = new CustomerAnonymisedRepository(
    CustomerAnonymisedModel
  );

  let reindexedCount = 0;
  const reindexFromFilter: FilterQuery<CustomerAnonymisedDocument> =
    reindexFrom === null ? {} : { _id: { $gt: reindexFrom._id } };
  for await (const customer of customerRepository.findWithCursor(
    reindexFromFilter
  )) {
    const customerAnonymised = mapToCustomerAnonymised(customer.toObject());
    await customerAnonymisedRepository.upsertOne(customerAnonymised);
    reindexedCount++;
  }

  logger.log('Reindex complete, %d', reindexedCount);
}
