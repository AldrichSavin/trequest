import PluginEventEmitter, {
  PluginEventEmitterType,
} from "./PluginEventEmitter";
import { CreateAxiosDefaults } from "axios";
import { AxiosInstance } from "axios";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { isObject, isString } from "./helpers";
import { AxiosResponse } from "axios";

export type MultiServiceBaseURLRecords = Record<string, string> & {
  default?: string;
};

export interface CoreConfig<
  UserMultiServiceBaseURLRecords = MultiServiceBaseURLRecords,
  D = any
> extends Omit<CreateAxiosDefaults<D>, "baseURL"> {
  plugins?: PluginEventEmitterType[];
  instance?: AxiosInstance;
  baseURL?:
    | AxiosRequestConfig["baseURL"]
    | UserMultiServiceBaseURLRecords
    | keyof UserMultiServiceBaseURLRecords;
  /**
   * global loading
   */
  loading?: boolean;

  /**
   * is worker env
   */
  worker?: boolean;
}

export default class Core<
  UserMultiServiceBaseURLRecords = MultiServiceBaseURLRecords,
  D = any
> extends PluginEventEmitter {
  private readonly instance: AxiosInstance;

  constructor(
    private readonly coreConfig: CoreConfig<
      UserMultiServiceBaseURLRecords,
      D
    > = {}
  ) {
    super();

    // Mount plugins
    this.mountPlugins();

    // Init request instance
    this.instance = axios.create({});

    this.registerRequestInterceptor();
    this.registerResponseInterceptor();
  }

  private mountPlugins(): void {
    const { plugins = [] } = this.coreConfig;
    this.register(plugins);
    this.initPluginContext<UserMultiServiceBaseURLRecords>(plugins, this);
  }

  protected registerRequestInterceptor() {
    this.instance.interceptors.request.use(
      async (config: any) => {
        this.run("onRequest", config);
        return config;
      },
      async (error: any) => {
        const errors = await this.runOnionAsync("onError", error);
        this.run("onFinally", errors || error);
        return Promise.reject(errors || error);
      }
    );
  }

  protected registerResponseInterceptor() {
    this.instance.interceptors.response.use(async (response: { data: any; }) => {
        const data = await this.runOnionAsync("onResponse", response);
        const result = data || response.data;
        this.run("onFinally", result);
        return result;
    }, async (error: any) => {
        const errors = await this.runOnionAsync("onError", error);
        this.run("onFinally", error);
        return Promise.reject(errors || error);
    })
  }

  protected isProtocol(url: string): boolean {
    return /(http|https|ws|wss):\/\/([\w.]+\/?)\S*/.test(url);
  }

  public getBaseURL(
    baseURL?: AxiosRequestConfig["baseURL"] | string
  ): AxiosRequestConfig["baseURL"] | string {
    if (baseURL) {
      /**
       * If baseURL is passed during the request and is a valid http/https/ws/wss address,
       * the passed baseURL is taken as the interface address and the request prefix is not automatically added
       */
      if (this.isProtocol(baseURL)) {
        return baseURL;
      }

      /**
       * Due to the internal extension of axios own baseURL attribute,
       * it is possible to pass an object to baseURL when initializing the instance,
       * with the corresponding key being any name and the value being the address of the service (e.g., api interface address).
       *
       * Therefore, when the estrus request, you can specify the key configured at the initialization of the baseURL,
       * the internal will be mapped to the corresponding request prefix, and automatically added to the request
       */
      if (isObject(this.coreConfig.baseURL)) {
        return (
          (this.coreConfig.baseURL as MultiServiceBaseURLRecords)?.[baseURL] ||
          baseURL
        );
      }

      return baseURL;
    }

    // single service mode
    if (isString(this.coreConfig.baseURL)) {
      return this.coreConfig.baseURL;
    }

    /**
     * In multiService mode, if the corresponding key cannot be found, try to find default
     */
    if (
      isObject(this.coreConfig.baseURL) &&
      Reflect.has(
        (this.coreConfig.baseURL as MultiServiceBaseURLRecords) || {},
        "default"
      )
    ) {
      return Reflect.get(this.coreConfig.baseURL || {}, "default");
    }

    /**
     * When a developer uses its own axios instance,
     * it might set baseURL to the defaults property and finally try to look it up in defaults
     */
    return this.instance?.defaults?.baseURL || "";
  }

  public request<
    Data = any,
    D = any,
    R extends AxiosResponse<any> = AxiosResponse<Data>
  >(config: AxiosRequestConfig<D>): Promise<AxiosResponse<Data>> {
    if (!this.instance?.request) {
      throw new Error("HttpCore instance is not initialized");
    }
    this.runOnionAsync("onBeforeRequest", config);
    // @ts-ignore
    return this.instance.request<Data, R, D>(
      this.mergeConfig(config, {
        baseURL: this.getBaseURL(config.baseURL),
      })
    );
  }

  protected mergeConfig(
    config: AxiosRequestConfig,
    userConfig: AxiosRequestConfig
  ) {
    return Object.assign({}, config, userConfig);
  }
}
