import { FilterQuery, Model, mongo } from 'mongoose';

import { Customer, CustomerDocument } from './customer.interface';

export class CustomerRepository {
  constructor(private readonly customerModel: Model<CustomerDocument>) {}

  public insertMany(customers: Array<Customer>) {
    return this.customerModel.insertMany(customers);
  }

  public findWithCursor(filter: FilterQuery<CustomerDocument>) {
    return this.customerModel.find(filter).cursor();
  }

  public watch(
    pipeline?: Array<Record<string, unknown>>,
    watchOptions?: mongo.ChangeStreamOptions & { hydrate?: boolean }
  ) {
    return this.customerModel.watch<CustomerDocument>(pipeline, watchOptions);
  }
}
