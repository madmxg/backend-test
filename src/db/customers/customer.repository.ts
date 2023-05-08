import { Model } from 'mongoose';

import { Customer, CustomerDocument } from './customer.interface';

export class CustomersRepository {
  constructor(private readonly customerModel: Model<CustomerDocument>) {}

  public insertMany(customers: Array<Customer>) {
    return this.customerModel.insertMany(customers);
  }
}
