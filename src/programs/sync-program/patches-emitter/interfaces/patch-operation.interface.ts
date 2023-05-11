import { Document } from 'mongoose';

import { PatchOperationType } from './patch-operation-type.interface';

export interface PatchOperation<TDocument extends Document> {
  operationType: PatchOperationType;
  fullDocument: TDocument;
}
