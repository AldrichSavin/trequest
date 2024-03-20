import PluginEventEmitter, { PluginEventEmitterType } from "./PluginEventEmitter";
import { CreateAxiosDefaults } from "axios";
import { AxiosInstance } from "axios";
import { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
export type MultiServiceBaseURLRecords = Record<string, string> & {
    default?: string;
};
export interface CoreConfig<UserMultiServiceBaseURLRecords = MultiServiceBaseURLRecords, D = any> extends Omit<CreateAxiosDefaults<D>, "baseURL"> {
    plugins?: PluginEventEmitterType[];
    instance?: AxiosInstance;
    baseURL?: AxiosRequestConfig["baseURL"] | UserMultiServiceBaseURLRecords | keyof UserMultiServiceBaseURLRecords;
    /**
     * global loading
     */
    loading?: boolean;
    /**
     * is worker env
     */
    worker?: boolean;
}
export default class Core<UserMultiServiceBaseURLRecords = MultiServiceBaseURLRecords, D = any> extends PluginEventEmitter {
    private readonly coreConfig;
    private readonly instance;
    constructor(coreConfig?: CoreConfig<UserMultiServiceBaseURLRecords, D>);
    private mountPlugins;
    protected registerRequestInterceptor(): void;
    protected registerResponseInterceptor(): void;
    protected isProtocol(url: string): boolean;
    getBaseURL(baseURL?: AxiosRequestConfig["baseURL"] | string): AxiosRequestConfig["baseURL"] | string;
    request<Data = any, D = any, R extends AxiosResponse<any> = AxiosResponse<Data>>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<Data>>;
    protected mergeConfig(config: AxiosRequestConfig, userConfig: AxiosRequestConfig): AxiosRequestConfig<any>;
}
