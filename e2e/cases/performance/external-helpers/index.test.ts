import path from 'node:path';
import { build, providerType } from '@e2e/helper';
import { expect, test } from '@playwright/test';
import { pluginSwc } from '@rsbuild/plugin-webpack-swc';

test('should externalHelpers by default', async () => {
  const rsbuild = await build({
    cwd: import.meta.dirname,
    plugins: providerType === 'rspack' ? [] : [pluginSwc()],
    rsbuildConfig: {
      source: {
        entry: { index: path.resolve(import.meta.dirname, './src/main.ts') },
        decorators: {
          version: '2022-03',
        },
      },
      output: {
        sourceMap: {
          js: 'source-map',
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON(false);

  const content =
    files[
      Object.keys(files).find(
        (file) => file.includes('static/js') && file.endsWith('.js.map'),
      )!
    ];

  expect(content).toContain('@swc/helpers');
});
