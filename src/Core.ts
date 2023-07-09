import PluginEventEmitter, { PluginEventEmitterType } from "./PluginEventEmitter";

export interface CoreConfig {
    plugins?: PluginEventEmitterType[];
}

export default class Core extends PluginEventEmitter {
    constructor(private readonly coreConfig: CoreConfig = {}) {
        super();

        // Mount plugins
        this.mountPlugins();
    }

    private mountPlugins(): void {
        const { plugins = [] } = this.coreConfig;
        this.register(plugins);
        this.initPluginContext(plugins, this);
    }
}