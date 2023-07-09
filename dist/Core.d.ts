import PluginEventEmitter, { PluginEventEmitterType } from "./PluginEventEmitter";
export interface CoreConfig {
    plugins?: PluginEventEmitterType[];
}
export default class Core extends PluginEventEmitter {
    private readonly coreConfig;
    constructor(coreConfig?: CoreConfig);
    private mountPlugins;
}
