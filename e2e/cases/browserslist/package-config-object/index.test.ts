import { build } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should read browserslist string from package.json', async () => {
  const rsbuild = await build({
    cwd: import.meta.dirname,
  });

  const files = await rsbuild.unwrapOutputJSON();

  const indexFile =
    files[Object.keys(files).find((file) => file.endsWith('.js'))!];

  expect(indexFile.includes('async ')).toBeFalsy();
});
