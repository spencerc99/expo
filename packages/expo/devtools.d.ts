// TODO: Custom from @expo/cli/src/start/server/devtools because @expo/cli does not emit types.
// We can remove this if we move the devtools code into separated package.
declare module 'expo/devtools' {
  import { EventSubscription } from 'fbemitter';

  /**
   * This class is used to communicate with the Expo CLI DevTools plugin.
   */
  export class DevToolsPluginClient {
    private devServer;
    private ws;
    private eventEmitter;
    constructor(devServer: string);
    connectAsync(): Promise<WebSocket>;
    close(): void;
    sendMessage(method: string, params: any): void;
    addMessageListener(method: string, listener: (params: any) => void): EventSubscription;
    addMessageListenerOnce(method: string, listener: (params: any) => void): void;
    isConnected(): boolean;
    private handleMessage;
  }

  export function connectPluginFromDevToolsAsync(): Promise<DevToolsPluginClient>;
  export function connectPluginFromAppAsync(): Promise<DevToolsPluginClient>;
}
