import { execSync } from 'node:child_process';
import path from 'node:path';
import { expect, test } from '@playwright/test';

// check for https://github.com/web-infra-dev/rsbuild/pull/809
test('should import esm bundles correctly', () => {
  const mjsFilePath = path.join(import.meta.dirname, 'test.mjs');
  expect(() => execSync(`node ${mjsFilePath}`)).not.toThrow();
});
