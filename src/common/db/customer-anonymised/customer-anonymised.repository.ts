import { FilterQuery, Model } from 'mongoose';

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
    return this.customerAnonymisedModel.updateOne(filter, customerAnonymised, {
      upsert: true,
    });
  }
}
