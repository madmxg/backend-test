import { Document, Types } from 'mongoose';

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface CustomerDocument
  extends Customer,
    Document<Types.ObjectId, unknown, Customer> {
  createdAt: Date;
}
