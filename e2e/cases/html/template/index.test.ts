import path from 'node:path';
import { build } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should set template via function correctly', async () => {
  const rsbuild = await build({
    cwd: import.meta.dirname,
    rsbuildConfig: {
      source: {
        entry: {
          index: path.resolve(import.meta.dirname, './src/index.js'),
          foo: path.resolve(import.meta.dirname, './src/foo.js'),
        },
      },
      html: {
        template({ entryName }) {
          return entryName === 'index'
            ? './static/index.html'
            : './static/foo.html';
        },
        templateParameters: {
          foo: 'foo',
          type: 'type',
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON();

  const fooHtml =
    files[Object.keys(files).find((file) => file.endsWith('foo.html'))!];
  expect(fooHtml).toContain('<div id="test-template">foo</div>');

  const indexHtml =
    files[Object.keys(files).find((file) => file.endsWith('index.html'))!];
  expect(indexHtml).toContain('<div id="test-template">text</div>');
});

test('should allow to access templateParameters', async ({ page }) => {
  const rsbuild = await build({
    cwd: import.meta.dirname,
    page,
    rsbuildConfig: {
      html: {
        template: './static/index.html',
        templateParameters: {
          foo: 'bar',
        },
      },
    },
  });

  const testTemplate = page.locator('#test-template');
  await expect(testTemplate).toHaveText('text');

  const testEl = page.locator('#test');
  await expect(testEl).toHaveText('Hello Rsbuild!');

  await expect(page.evaluate('window.foo')).resolves.toBe('bar');

  await rsbuild.close();
});

test('should set template via tools.htmlPlugin correctly', async () => {
  const rsbuild = await build({
    cwd: import.meta.dirname,
    rsbuildConfig: {
      source: {
        entry: {
          index: path.resolve(import.meta.dirname, './src/index.js'),
          foo: path.resolve(import.meta.dirname, './src/foo.js'),
        },
      },
      tools: {
        htmlPlugin(config, { entryName }) {
          config.template =
            entryName === 'index' ? './static/index.html' : './static/foo.html';
        },
      },
      html: {
        templateParameters: {
          foo: 'foo',
          type: 'type',
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON();

  const fooHtml =
    files[Object.keys(files).find((file) => file.endsWith('foo.html'))!];
  expect(fooHtml).toContain('<div id="test-template">foo</div>');

  const indexHtml =
    files[Object.keys(files).find((file) => file.endsWith('index.html'))!];
  expect(indexHtml).toContain('<div id="test-template">text</div>');
});
