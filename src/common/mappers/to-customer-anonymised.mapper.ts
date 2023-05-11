import { Types } from 'mongoose';

import { anonymize } from '../utils';
import { CustomerAnonymised, CustomerDocument } from '../db';

export function mapToCustomerAnonymised(
  customer: CustomerDocument & { _id: Types.ObjectId }
): CustomerAnonymised {
  const firstName = anonymize(customer.firstName);
  const lastName = anonymize(customer.lastName);

  let [emailLeft, emailRight] = customer.email.split('@');
  if (typeof emailLeft !== 'string') {
    emailLeft = 'unknown.email';
  }
  if (typeof emailRight !== 'string') {
    emailRight = 'unknown.domain';
  }
  const email = `${anonymize(emailLeft)}@${emailRight}`;

  const addressLine1 = anonymize(customer.address.line1);
  const addressLine2 = anonymize(customer.address.line2);
  const addressPostcode = anonymize(customer.address.postcode);
  const address = {
    ...customer.address,
    line1: addressLine1,
    line2: addressLine2,
    postcode: addressPostcode,
  };

  const customerAnonymised: CustomerAnonymised = {
    ...customer,
    address,
    firstName,
    lastName,
    email,
  };

  return customerAnonymised;
}
