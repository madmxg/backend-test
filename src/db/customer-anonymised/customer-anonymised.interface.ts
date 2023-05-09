import { Document, Types } from 'mongoose';
import { Customer } from '../customer';

export interface CustomerAnonymised extends Customer {
  _id: Types.ObjectId;
  createdAt: Date;
}

export interface CustomerAnonymisedDocument
  extends CustomerAnonymised,
    Document {
  _id: Document['_id'];
}
