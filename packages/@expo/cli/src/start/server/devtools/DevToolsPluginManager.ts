import resolveFrom from 'resolve-from';

const debug = require('debug')('expo:start:server:devtools');

export const DevToolsPluginEndpoint = '/_expo/plugins';

interface AutolinkingPlugin {
  packageName: string;
  packageRoot: string;
  webpageRoot: string;
}

interface AutolinkingModule {
  queryModulesAsync(platform: string): Promise<DevToolsPlugin[]>;
}

export interface DevToolsPlugin extends AutolinkingPlugin {
  webpageEndpoint: string;
}

export default class DevToolsPluginManager {
  private plugins: DevToolsPlugin[] | null = null;

  constructor(private projectRoot: string) {}

  public async queryPluginsAsync(): Promise<DevToolsPlugin[]> {
    if (this.plugins) {
      return this.plugins;
    }
    const plugins = (await this.queryAutolinkedPluginsAsync(this.projectRoot)).map((plugin) => ({
      ...plugin,
      // webpageEndpoint: `${DevToolsPluginEndpoint}/${plugin.packageName}`,
      //
      // FIXME(kudo): For demo purpose
      packageName: plugin.packageName.replace(/@kudo-chien\//g, ''), // FIXME(kudo): For demo only
      webpageEndpoint: `${DevToolsPluginEndpoint}/${plugin.packageName.replace(
        /@kudo-chien\//g,
        ''
      )}`,
    }));
    this.plugins = plugins;
    return this.plugins;
  }

  public async queryPluginWebpageRootAsync(pluginName: string): Promise<string | null> {
    const plugins = await this.queryPluginsAsync();
    const plugin = plugins.find((p) => p.packageName === pluginName);
    return plugin?.webpageRoot ?? null;
  }

  private async queryAutolinkedPluginsAsync(projectRoot: string): Promise<AutolinkingPlugin[]> {
    const resolvedPath = resolveFrom.silent(
      projectRoot,
      'expo-modules-autolinking/build/autolinking'
    );
    if (!resolvedPath) {
      return [];
    }
    const autolinkingModule: AutolinkingModule = require(resolvedPath);
    if (!autolinkingModule.queryModulesAsync) {
      throw new Error(
        'Missing exported `queryModulesAsync()` function from `expo-modules-autolinking`'
      );
    }
    const plugins = await autolinkingModule.queryModulesAsync('devtools');
    debug('Found autolinked plugins', this.plugins);
    return plugins;
  }
}
