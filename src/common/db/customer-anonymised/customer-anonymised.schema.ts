import { Model, Schema, Types } from 'mongoose';

import { CustomerAnonymisedDocument } from './customer-anonymised.interface';

export const CustomerAnonymisedSchema = new Schema<
  CustomerAnonymisedDocument,
  Model<CustomerAnonymisedDocument>
>(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    id: false,
    timestamps: false,
    collection: 'customers_anonymised',
  }
);
