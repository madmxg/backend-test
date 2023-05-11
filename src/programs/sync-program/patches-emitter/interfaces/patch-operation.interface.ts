import { Document, Types } from 'mongoose';

import { PatchOperationType } from './patch-operation-type.interface';

export interface PatchOperation<
  TDocument extends Document & { _id: Types.ObjectId }
> {
  operationType: PatchOperationType;
  fullDocument: TDocument;
}
