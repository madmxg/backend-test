import {
  CustomerModel,
  CustomerDocument,
  CustomerRepository,
  CustomerAnonymisedModel,
  CustomerAnonymisedRepository,
} from '../../common/db';
import { LoggerConsole } from '../../common/logger';
import { mapToBulkWriters } from '../../common/mappers';
import { syncProgramReindex } from './sync-program-reindex';
import { PatchOperation, PatchesEmitter } from './patches-emitter';

export async function syncProgramWatch() {
  const logger = new LoggerConsole();
  const customerRepository = new CustomerRepository(CustomerModel);
  const customerAnonymisedRepository = new CustomerAnonymisedRepository(
    CustomerAnonymisedModel
  );

  const lastAnonymisedCustomer =
    await customerAnonymisedRepository.getLastCustomer();

  const reindexPromise = syncProgramReindex(lastAnonymisedCustomer);
  const watchPromise = new Promise<void>((resolve, reject) => {
    const pipeline = [
      {
        $match: {
          operationType: { $in: ['update', 'insert'] },
        },
      },
    ];
    const watchOptions = { fullDocument: 'updateLookup' };
    const changeStreamEmitter = customerRepository.watch(
      pipeline,
      watchOptions
    );
    const patchChangesEmitter = new PatchesEmitter(changeStreamEmitter);

    patchChangesEmitter.on(
      'data',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (patchOperations: Array<PatchOperation<CustomerDocument>>) => {
        logger.log('patch', patchOperations.length);
        const bulkWriters = mapToBulkWriters(patchOperations);
        await customerAnonymisedRepository.bulkWrite(bulkWriters.insertWrites);
        await customerAnonymisedRepository.bulkWrite(bulkWriters.updateWrites);
      }
    );
    patchChangesEmitter.once('close', () => resolve(void 0));
    patchChangesEmitter.once('end', () => resolve(void 0));
    patchChangesEmitter.once('error', (error: Error) => {
      logger.error(error);
      reject(error);
    });
  });

  return Promise.allSettled([reindexPromise, watchPromise]);
}
