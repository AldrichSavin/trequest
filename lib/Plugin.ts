export interface PluginDefine {
    /**
     * on register plugin
     */
    onRegister: (context: any) => any;

    /**
     * Called after the plug-in has been initialized
     * You can get the context by this.getContext() and do more (you can customize it)
     */
    onInit: () => any;

    /**
     * Before sending the request (before the request is sent, you can modify the request)
     */
    onBeforeRequest: (request: any) => any;

    /**
     * Between onBeforeRequest and onRequest,
     * if a mock identity is provided in onMockRequest,
     * it will respond directly to onResponse as simulated data
     */
    onMockRequest: (request: any) => void;

    /**
     * Send request
     */
    onRequest: (request: any) => any;

    // Timeout/Abort/NetworkError/CustomerError/ServerError
    onError: (error: any) => any;

    /**
     * Retry request
     */
    onRetry: (request: any) => any;

    /**
     * Cancel request (abort｜CancelToken.cancel)
     */
    onCancel: (request: any) => any;

    /**
     * After receiving the response (you can modify the response)
     */
    onResponse: (response: any) => Promise<any> | any;

    /**
     * after all
     */
    onFinally: (response: any) => any;

    /**
     * destroy
     */
    destroy: () => any;
}

export interface Plugin extends Partial<PluginDefine> {}
export type PluginLifecycle = keyof PluginDefine;

export default function Plugin() {}
