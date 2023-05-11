import { LoggerConsole } from '../../common/logger';
import {
  CustomerAnonymisedModel,
  CustomerAnonymisedRepository,
  CustomerDocument,
  CustomerModel,
} from '../../common/db';
import { PatchOperation, PatchesEmitter } from './patches-emitter';
import { mapToBulkWriters } from '../../common/mappers';
import { Types } from 'mongoose';

export async function syncProgramWatch(): Promise<void> {
  const logger = new LoggerConsole();

  return new Promise<void>((resolve, reject) => {
    const customerAnonymisedRepository = new CustomerAnonymisedRepository(
      CustomerAnonymisedModel
    );
    const pipeline = [
      {
        $match: {
          operationType: { $in: ['update', 'insert'] },
        },
      },
    ];
    const watchOptions = { fullDocument: 'updateLookup' };
    // TODO: use repository method
    const changeStreamEmitter = CustomerModel.watch<CustomerDocument>(
      pipeline,
      watchOptions
    );
    const patchChangesEmitter = new PatchesEmitter(changeStreamEmitter);

    patchChangesEmitter.once('error', (error: Error) => {
      logger.error(error);
      reject(error);
    });
    patchChangesEmitter.on(
      'data',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (
        patchOperations: Array<
          PatchOperation<CustomerDocument & { _id: Types.ObjectId }>
        >
      ) => {
        logger.log('patch', patchOperations.length);
        const bulkWriters = mapToBulkWriters(patchOperations);
        await customerAnonymisedRepository.bulkWrite(bulkWriters.insertWrites);
        await customerAnonymisedRepository.bulkWrite(bulkWriters.updateWrites);
      }
    );
    patchChangesEmitter.once('close', () => resolve(void 0));
    patchChangesEmitter.once('end', () => resolve(void 0));
  });
}
