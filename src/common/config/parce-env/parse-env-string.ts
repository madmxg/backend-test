export function parseEnvString(
  envValue: string | undefined,
  envValueName: string
): string {
  if (typeof envValue !== 'string') {
    throw new TypeError(`Invalid ENV ${envValueName}`);
  }
  return envValue;
}
