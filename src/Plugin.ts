export interface PluginDefine {
    /**
     * on register plugin
     */
    onRegister: (context) => any;

    /**
     * Called after the plug-in has been initialized
     * You can get the context by this.getContext() and do more (you can customize it)
     */
    onInit: () => any;

    /**
     * Before sending the request (before the request is sent, you can modify the request)
     */
    onBeforeRequest: (request) => any;
    
    /**
     * Between onBeforeRequest and onRequest,
     * if a mock identity is provided in onMockRequest,
     * it will respond directly to onResponse as simulated data
     */
    onMockRequest: (request) => void;

    /**
     * Send request
     */
    onRequest: (request) => any;

    // Timeout/Abort/NetworkError/CustomerError/ServerError
    onError: (error) => any;

    /**
     * Retry request
     */
    onRetry: (request) => any;

    /**
     * Cancel request (abort｜CancelToken.cancel)
     */
    onCancel: (request) => any;
    
    /**
     * After receiving the response (you can modify the response)
     */
    onResponse: (response) => Promise<any> | any;

    /**
     * after all
     */
    onFinally: (response) => any;

    /**
     * destroy
     */
    destroy: () => any;
}

export interface Plugin extends Partial<PluginDefine> {}
export type PluginLifecycle = keyof PluginDefine;

export default function Plugin() {}