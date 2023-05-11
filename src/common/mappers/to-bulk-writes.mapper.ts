import { Types, mongo } from 'mongoose';

import { CustomerAnonymised, CustomerDocument } from '../db';
import { mapToCustomerAnonymised } from './to-customer-anonymised.mapper';
import { PatchOperation } from '../../programs/sync-program/patches-emitter';

export function mapToBulkWriters(
  patchOperations: Array<
    PatchOperation<CustomerDocument & { _id: Types.ObjectId }>
  >
) {
  const bulkWriters = patchOperations.reduce(
    (accumulator, patchOperation) => {
      const document = mapToCustomerAnonymised(patchOperation.fullDocument);

      if (patchOperation.operationType === 'insert') {
        const insertWrite = { insertOne: { document } };
        accumulator.insertWrites.push(insertWrite);
      }
      if (patchOperation.operationType === 'update') {
        const filter = { _id: document._id };
        const update = {
          $set: {
            ...document,
          },
        };
        const updateWrite = { updateOne: { filter, update } };
        accumulator.updateWrites.push(updateWrite);
      }
      return accumulator;
    },
    {
      insertWrites: [] as Array<{
        insertOne: mongo.InsertOneModel<CustomerAnonymised>;
      }>,
      updateWrites: [] as Array<{
        updateOne: mongo.UpdateOneModel<CustomerAnonymised>;
      }>,
    }
  );
  return bulkWriters;
}
