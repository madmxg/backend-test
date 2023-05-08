import { model } from 'mongoose';

import { CustomerDocument } from './customer.interface';
import { CustomerSchema } from './customer.schema';

export const CustomerModel = model<CustomerDocument>(
  'Customer',
  CustomerSchema
);
