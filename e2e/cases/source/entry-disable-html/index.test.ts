import path from 'node:path';
import { build, globContentJSON } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should allow to disable HTML for specific entry', async () => {
  await build({
    cwd: import.meta.dirname,
  });

  const outputs = await globContentJSON(path.join(import.meta.dirname, 'dist'));
  const outputFiles = Object.keys(outputs);

  expect(outputFiles.find((item) => item.includes('foo.html'))).toBeTruthy();
  expect(outputFiles.find((item) => item.includes('bar.html'))).toBeFalsy();
});
