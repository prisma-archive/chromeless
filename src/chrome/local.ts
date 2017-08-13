import {
  Chrome,
  Command,
  ChromelessOptions,
  Client,
  ChromeInfo,
  DeviceMetrics,
} from '../types'
import * as CDP from 'chrome-remote-interface'
import { LaunchedChrome, launch } from 'chrome-launcher'
import LocalRuntime from './local-runtime'
import { setViewport } from '../util'

interface RuntimeClient {
  client: Client
  runtime: LocalRuntime
}

export default class LocalChrome implements Chrome {
  private options: ChromelessOptions
  private runtimeClientPromise: Promise<RuntimeClient>
  private chromeInstance?: LaunchedChrome

  constructor(options: ChromelessOptions) {
    this.options = options
    this.runtimeClientPromise = this.initRuntimeClient()
  }

  private async initRuntimeClient(): Promise<RuntimeClient> {
    const client = this.options.launchChrome
      ? await this.startChrome()
      : await this.connectToChrome()

    client.ChromeInfo = await this.getVersionInfo()
    const { viewport = {} as DeviceMetrics } = this.options
    await setViewport(client, viewport as DeviceMetrics)

    const runtime = new LocalRuntime(client, this.options)

    return { client, runtime }
  }

  private async startChrome(): Promise<Client> {
    this.chromeInstance = await launch({
      logLevel: this.options.debug ? 'info' : 'silent',
      port: this.options.cdp.port,
    })
    const target = await CDP.New({
      port: this.chromeInstance.port,
    })
    return await CDP({ target })
  }

  private async connectToChrome(): Promise<Client> {
    const target = await CDP.New({
      port: this.options.cdp.port,
      host: this.options.cdp.host,
    })
    return await CDP({
      target,
      port: this.options.cdp.port,
      host: this.options.cdp.host,
    })
  }

  async getVersionInfo(): Promise<ChromeInfo> {
    return CDP.Version(this.options.cdp)
  }

  async process<T extends any>(command: Command): Promise<T> {
    const { runtime } = await this.runtimeClientPromise

    return (await runtime.run(command)) as T
  }

  async close(): Promise<void> {
    const { client } = await this.runtimeClientPromise

    if (this.options.cdp.closeTab) {
      await CDP.Close({
        id: client.target.id,
        port: this.options.cdp.port,
        host: this.options.cdp.host,
      })
    }

    await client.close()

    // Call this after so the client doesn't try to close
    // on a killed instance
    if (this.chromeInstance) {
      await this.chromeInstance.kill()
    }
  }
}
