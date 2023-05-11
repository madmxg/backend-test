import { LoggerConsole } from '../../common/logger';
import { syncProgramWatch } from './sync-program-watch';
import { syncProgramReindex } from './sync-program-reindex';

export async function syncProgram(mode: 'reindex' | 'watch'): Promise<void> {
  const logger = new LoggerConsole();
  logger.log('Start %s mode', mode);

  return mode === 'watch' ? syncProgramWatch() : syncProgramReindex();
}
