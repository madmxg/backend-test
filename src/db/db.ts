import { connect, disconnect } from 'mongoose';

export function connectDb(uri: string) {
  return connect(uri);
}

export function disconnectDb() {
  return disconnect();
}
