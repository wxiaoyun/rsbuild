import { createStubRsbuild } from '@scripts/test-helper';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVueJsx } from '../src';
import type { RsbuildConfig } from '@rsbuild/core';

describe('plugin-vue-jsx', () => {
  const rsbuildConfig: RsbuildConfig = {
    performance: {
      buildCache: false,
    },
  };

  it('should apply jsx babel plugin correctly in rspack mode', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig,
      plugins: [pluginVueJsx(), pluginBabel()],
    });
    const config = await rsbuild.unwrapConfig();

    expect(config).toMatchSnapshot();
  });

  it('should apply jsx babel plugin correctly', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig,
      plugins: [pluginVueJsx(), pluginBabel()],
    });
    const config = await rsbuild.unwrapConfig();

    expect(config).toMatchSnapshot();
  });

  it('should allow to configure jsx babel plugin options', async () => {
    const rsbuild = await createStubRsbuild({
      rsbuildConfig,
      plugins: [
        pluginVueJsx({
          vueJsxOptions: {
            transformOn: false,
          },
        }),
        pluginBabel(),
      ],
    });
    const config = await rsbuild.unwrapConfig();

    expect(config).toMatchSnapshot();
  });
});
