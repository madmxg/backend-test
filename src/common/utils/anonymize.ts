import { createHash } from 'node:crypto';

export function anonymize(text: string): string {
  const hash = createHash('sha256');
  const digest = hash.update(text).digest('hex').slice(0, 8);
  return digest;
}
