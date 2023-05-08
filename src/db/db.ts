import { connect } from 'mongoose';

export function connectMongoDb(uri: string) {
  return connect(uri);
}
