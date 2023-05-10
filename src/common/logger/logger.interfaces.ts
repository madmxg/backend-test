/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Logger {
  log(message?: any, ...params: Array<any>): void;
  error(message?: any, ...params: Array<any>): void;
}
