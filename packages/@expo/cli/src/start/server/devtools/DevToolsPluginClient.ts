import { EventEmitter, EventSubscription } from 'fbemitter';

const debug = (function () {
  try {
    return require('debug')('expo:start:server:devtools');
  } catch {}
  return console.log;
})();

// This version should be synced with the one in the **createMessageSocketEndpoint.ts** in rnc-cli.
const MESSAGE_PROTOCOL_VERSION = 2;

const DevToolsPluginMethod = 'Expo:DevToolsPlugin';

/**
 * This class is used to communicate with the Expo CLI DevTools plugin.
 */
export default class DevToolsPluginClient {
  private ws: WebSocket | null = null;
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor(private devServer: string) {}

  public async connectAsync(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`ws://${this.devServer}/message`);
      ws.addEventListener('open', () => {
        this.ws = ws;
        resolve(ws);
      });
      ws.addEventListener('error', (e) => {
        reject(e);
      });
      ws.addEventListener('close', (e) => {
        debug('WebSocket closed', e.code, e.reason);
        this.ws = null;
      });
      ws.addEventListener('message', (e) => {
        this.handleMessage(e);
      });
    });
  }

  public close() {
    this.ws?.close();
    this.ws = null;
    this.eventEmitter.removeAllListeners();
  }

  public sendMessage(method: string, params: any): void {
    const payload = {
      version: MESSAGE_PROTOCOL_VERSION,
      method: DevToolsPluginMethod,
      params: {
        method,
        params,
      },
    };
    this.ws?.send(JSON.stringify(payload));
  }

  public addMessageListener(method: string, listener: (params: any) => void): EventSubscription {
    return this.eventEmitter.addListener(method, listener);
  }

  public addMessageListenerOnce(method: string, listener: (params: any) => void): void {
    this.eventEmitter.once(method, listener);
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const payload = JSON.parse(event.data);
      if (payload.version === MESSAGE_PROTOCOL_VERSION && payload.method === DevToolsPluginMethod) {
        this.eventEmitter.emit(payload.params.method, payload.params.params);
      }
    } catch {}
  }
}
