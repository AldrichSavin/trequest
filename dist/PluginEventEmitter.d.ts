import { PluginLifecycle, PluginDefine, Plugin } from "./Plugin";
import { IAbstractPlugin } from "./AbstractPlugin";
import Core, { MultiServiceBaseURLRecords } from "./Core";
import { EventProperties } from "./EventEmitter";
export interface PluginEventEmitterType extends Plugin, IAbstractPlugin {
}
export default class PluginEventEmitter extends Set<PluginEventEmitterType> {
    private readonly coreContext;
    constructor(coreContext?: {});
    register(plugin: PluginEventEmitterType[] | PluginEventEmitterType): void;
    initPluginContext<UserMultiServiceBaseURLRecords = MultiServiceBaseURLRecords>(plugins: PluginEventEmitterType[] | PluginEventEmitterType, core: Core<UserMultiServiceBaseURLRecords, any>): void;
    unregister(plugin: PluginEventEmitterType): void;
    /**
     * filters plugins by lifecycle
     *
     * @param lifecycle PluginLifecycle
     * @returns Plugin[Lifecycle][]
     */
    filters<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle): PluginDefine[Lifecycle][];
    /**
     * @title filters plugins by lifecycle and calls them
     */
    run<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle, ...args: Parameters<PluginDefine[Lifecycle]>): void;
    /**
     * @title filters plugins by lifecycle and calls them asynchronously
     *
     * @param lifecycle PluginLifecycle to filter
     * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
     * @returns Promise<ReturnType<PluginDefine[Lifecycle]>[]>
     */
    runAsync<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle, ...args: Parameters<PluginDefine[Lifecycle]>): Promise<ReturnType<PluginDefine[Lifecycle]>[]>;
    /**
     * filters plugins by lifecycle and calls them synchronously
     */
    runSync<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle, ...args: Parameters<PluginDefine[Lifecycle]>): Promise<void>;
    /**
     * @title filters plugins by lifecycle and calls them in an onion-like fashion
     *
     * @param lifecycle PluginLifecycle to filter
     * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
     * @returns ReturnType<PluginDefine[Lifecycle]> | undefined | void
     */
    runOnion<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle, ...args: Parameters<PluginDefine[Lifecycle]>): ReturnType<PluginDefine[Lifecycle]> | undefined | void;
    /**
     * @title filters plugins by lifecycle and calls them in an onion-like fashion asynchronously
     *
     * @param lifecycle PluginLifecycle to filter
     * @param args arguments to pass to the plugins lifecycle method (e.g. onInit)
     * @returns Promise<ReturnType<PluginDefine[Lifecycle]> | undefined | void>
     */
    runOnionAsync<Lifecycle extends PluginLifecycle = PluginLifecycle>(lifecycle: Lifecycle, ...args: Parameters<PluginDefine[Lifecycle]>): Promise<ReturnType<PluginDefine[Lifecycle]> | undefined | void>;
    /**
     * @title Find the plug-in by its name
     */
    getPluginByName(pluginName: EventProperties): PluginEventEmitterType | undefined;
}
