import { connect, disconnect } from 'mongoose';

import { Logger } from '../logger';

export class Db {
  constructor(private readonly uri: string, private readonly logger: Logger) {}
  public connect() {
    this.logger.log('connect to DB %s', this.uri);
    return connect(this.uri);
  }

  public disconnect() {
    this.logger.log('disconnect DB', this.uri);
    return disconnect();
  }
}
