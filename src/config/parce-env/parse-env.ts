import { EnvironmentType } from './environment-type.enum';
import { parseEnvNumber } from './parse-env-number';
import { parseEnvString } from './parse-env-string';

export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_STRING
): string;
export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_NUMBER
): number;

export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType
): string | number | string[] | number[] {
  const envValue = process.env[envValueName];

  const envValueString = parseEnvString(envValue, envValueName);

  switch (envType) {
    case EnvironmentType.ENVIRONMENT_TYPE_STRING:
      return envValueString;
    case EnvironmentType.ENVIRONMENT_TYPE_NUMBER:
      return parseEnvNumber(envValueString, envValueName);
    default:
      const envTypeNever: never = envType;
      throw new TypeError(`Invalid EnvironmentType '${String(envTypeNever)}'`);
  }
}
