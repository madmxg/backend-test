import * as dotenv from 'dotenv';

import { AppConfig } from './app-config.interface';
import { parseEnvValue, EnvironmentType } from './parce-env';

dotenv.config();

const dbUri = parseEnvValue('DB_URI', EnvironmentType.ENVIRONMENT_TYPE_STRING);

export const config: AppConfig = { dbUri };
