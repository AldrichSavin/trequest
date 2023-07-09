import { PluginLifecycle, PluginDefine, Plugin } from "./Plugin";
import { IAbstractPlugin } from "./AbstractPlugin";
import Core from "./Core";
import { EventProperties } from "./EventEmitter";

export interface PluginEventEmitterType extends Plugin, IAbstractPlugin {}

export default class PluginEventEmitter extends Set<PluginEventEmitterType> {
  constructor(private readonly coreContext = {}) {
    super();
  }

  public register(
    plugin: PluginEventEmitterType[] | PluginEventEmitterType
  ): void {
    const plugins = Array.isArray(plugin) ? plugin : [plugin];
    plugins.forEach((plugin) => {
      this.add(plugin);
      plugin.onRegister?.(this.coreContext);
    });
  }

  public initPluginContext(
    plugins: PluginEventEmitterType[] | PluginEventEmitterType,
    core: Core
  ): void {
    const pluginsArray = Array.isArray(plugins) ? plugins : [plugins];
    pluginsArray.forEach((plugin) => {
      plugin.setContext?.(core);
    });
    this.run("onInit");
  }

  public unregister(plugin: PluginEventEmitterType): void {
    this.delete(plugin);
  }

  /**
   * filters plugins by lifecycle
   *
   * @param lifecycle PluginLifecycle
   * @returns Plugin[Lifecycle][]
   */
  public filters<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle
  ): PluginDefine[Lifecycle][] {
    return Array.from(this)
      .map((plugin) => {
        if (plugin[lifecycle] && typeof plugin[lifecycle] === "function") {
          return plugin[lifecycle]!.bind(plugin);
        }
        return undefined;
      })
      .filter(Boolean) as PluginDefine[Lifecycle][];
  }

  /**
   * @title filters plugins by lifecycle and calls them
   */
  run<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle,
    ...args: Parameters<PluginDefine[Lifecycle]>
  ) {
    const plugins = this.filters<Lifecycle>(lifecycle);
    plugins.forEach((plugin) => {
      plugin.apply(plugin, args);
    });
  }

  /**
   * @title filters plugins by lifecycle and calls them asynchronously
   *
   * @param lifecycle PluginLifecycle to filter
   * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
   * @returns Promise<ReturnType<PluginDefine[Lifecycle]>[]>
   */
  public runAsync<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle,
    ...args: Parameters<PluginDefine[Lifecycle]>
  ): Promise<ReturnType<PluginDefine[Lifecycle]>[]> {
    const plugins = this.filters<Lifecycle>(lifecycle);
    return Promise.all(
      plugins.map((plugin) => {
        return plugin.apply(plugin, args) as Promise<
          ReturnType<PluginDefine[Lifecycle]>
        >;
      })
    );
  }

  /**
   * filters plugins by lifecycle and calls them synchronously
   */
  public async runSync<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle,
    ...args: Parameters<PluginDefine[Lifecycle]>
  ) {
    for (const iterator of this.filters<Lifecycle>(lifecycle)) {
      await iterator.apply(iterator, args);
    }
  }

  /**
   * @title filters plugins by lifecycle and calls them in an onion-like fashion
   *
   * @param lifecycle PluginLifecycle to filter
   * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
   * @returns ReturnType<PluginDefine[Lifecycle]> | undefined | void
   */
  public runOnion<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle,
    ...args: Parameters<PluginDefine[Lifecycle]>
  ): ReturnType<PluginDefine[Lifecycle]> | undefined | void {
    const plugins = this.filters<Lifecycle>(lifecycle);
    return plugins.reduce((prev, plugin) => {
      return plugin.apply(plugin, args) ?? prev;
    }, undefined);
  }

  /**
   * @title filters plugins by lifecycle and calls them in an onion-like fashion asynchronously
   *
   * @param lifecycle PluginLifecycle to filter
   * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
   * @returns Promise<ReturnType<PluginDefine[Lifecycle]> | undefined | void>
   */
  public runOnionAsync<Lifecycle extends PluginLifecycle = PluginLifecycle>(
    lifecycle: Lifecycle,
    ...args: Parameters<PluginDefine[Lifecycle]>
  ): Promise<ReturnType<PluginDefine[Lifecycle]> | undefined | void> {
    const plugins = this.filters<Lifecycle>(lifecycle);
    return plugins.reduce(async (prev, plugin) => {
      const prevResult = await prev;
      return plugin.apply(plugin, args) ?? prevResult;
    }, Promise.resolve(undefined));
  }

  /**
   * @title Find the plug-in by its name
   */
  getPluginByName(pluginName: EventProperties): PluginEventEmitterType | undefined {
    return Array.from(this).find((plugin) => plugin.name === pluginName);
  }
}
