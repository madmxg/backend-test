/* eslint-disable no-console, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */

import { Logger } from './logger.interfaces';

export class LoggerConsole implements Logger {
  log(message?: any, ...params: Array<any>): void {
    console.log(message, ...params);
  }
  error(message?: any, ...params: Array<any>): void {
    console.error(message, ...params);
  }
}
