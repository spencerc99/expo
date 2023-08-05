// The module is to export shared code both for app runtime and devtools webpages.
// Be care of not to export something that requires node runtime.

import DevToolsPluginClient from './DevToolsPluginClient';

export async function connectPluginFromDevToolsAsync(): Promise<DevToolsPluginClient> {
  const devServer = window.location.origin.replace(/^https?:\/\//, '');
  const client = new DevToolsPluginClient(devServer);
  await client.connectAsync();
  return client;
}

export async function connectPluginFromAppAsync(): Promise<DevToolsPluginClient> {
  const getDevServer = require('react-native/Libraries/Core/Devtools/getDevServer');
  const devServer = getDevServer()
    .url.replace(/^https?:\/\//, '')
    .replace(/\/?$/, '');
  const client = new DevToolsPluginClient(devServer);
  await client.connectAsync();
  return client;
}

export type { DevToolsPluginClient };
