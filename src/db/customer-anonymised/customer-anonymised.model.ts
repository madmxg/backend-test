import { model } from 'mongoose';

import { CustomerAnonymisedDocument } from './customer-anonymised.interface';
import { CustomerAnonymisedSchema } from './customer-anonymised.schema';

export const CustomerAnonymisedModel = model<CustomerAnonymisedDocument>(
  'CustomerAnonymised',
  CustomerAnonymisedSchema
);
