export function parseEnvNumber(envValue: string, envValueName: string): number {
  if (Number.isNaN(envValue)) {
    throw new TypeError(`Invalid ENV ${envValueName}`);
  }

  const envNumberValue = Number(envValue);
  return envNumberValue;
}
