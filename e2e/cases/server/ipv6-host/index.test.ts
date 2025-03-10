import { URL } from 'node:url';
import { dev } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should allow to listen ipv6 host', async ({ page }) => {
  const rsbuild = await dev({
    cwd: import.meta.dirname,
  });

  await page.goto(new URL(`http://[::1]:${rsbuild.port}`).href);

  const locator = page.locator('#test');
  await expect(locator).toHaveText('Hello Rsbuild!');

  await rsbuild.close();
});
