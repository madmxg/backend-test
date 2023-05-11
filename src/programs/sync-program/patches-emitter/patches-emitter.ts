import EventEmitter from 'node:events';
import { Document, mongo } from 'mongoose';

import { PatchOperation } from './interfaces';

export class PatchesEmitter<TDocument extends Document> extends EventEmitter {
  private deadline: NodeJS.Timeout | null = null;
  private deadlineMilliseconds = 6000;
  private patches: Array<PatchOperation<TDocument>> = [];

  constructor(changeStreamEmitter: mongo.ChangeStream<TDocument, any>) {
    super();
    this.addDeadline();

    changeStreamEmitter.on('error', (error: Error) =>
      this.emit('error', error)
    );
    changeStreamEmitter.on('change', (changeData: PatchOperation<TDocument>) =>
      this.addDocument(changeData)
    );
    changeStreamEmitter.on('close', (closeData: unknown) =>
      this.emit('close', closeData)
    );
    changeStreamEmitter.on('end', (endData: unknown) =>
      this.emit('end', endData)
    );
  }

  private emitData(): void {
    if (this.deadline !== null) {
      clearTimeout(this.deadline);
    }
    if (this.patches.length !== 0) {
      this.emit('data', this.patches);
      this.patches.length = 0;
    }
    this.addDeadline();
  }

  private addDeadline(): void {
    this.deadline = setTimeout(
      () => this.emitData(),
      this.deadlineMilliseconds
    );
  }

  public addDocument(document: PatchOperation<TDocument>) {
    this.patches.push(document);
    if (this.patches.length === 30) {
      this.emitData();
    }
  }
}
