import { LoggerConsole } from '../../common/logger';
import { syncProgramWatch } from './sync-program-watch';
import { syncProgramReindex } from './sync-program-reindex';

export async function syncProgram(mode: 'reindex' | 'watch'): Promise<void> {
  const logger = new LoggerConsole();
  logger.log('Start program with %s mode', mode);

  const programPromise =
    mode === 'watch' ? syncProgramWatch : syncProgramReindex;

  await programPromise();
  logger.log('Complete program');
}
