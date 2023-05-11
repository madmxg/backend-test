import { FilterQuery, Model, QueryOptions, mongo } from 'mongoose';

import {
  CustomerAnonymised,
  CustomerAnonymisedDocument,
} from './customer-anonymised.interface';

export class CustomerAnonymisedRepository {
  constructor(
    private readonly customerAnonymisedModel: Model<CustomerAnonymisedDocument>
  ) {}

  public upsertOne(customerAnonymised: CustomerAnonymised) {
    const filter: FilterQuery<CustomerAnonymisedDocument> = {
      _id: customerAnonymised._id,
    };
    const options: QueryOptions<CustomerAnonymisedDocument> = {
      upsert: true,
    };
    return this.customerAnonymisedModel.updateOne(
      filter,
      customerAnonymised,
      options
    );
  }

  public bulkWrite(
    writes: Array<mongo.AnyBulkWriteOperation<CustomerAnonymised>>
  ) {
    return this.customerAnonymisedModel.bulkWrite(writes);
  }
}
