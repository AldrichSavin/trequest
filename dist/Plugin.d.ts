export interface PluginDefine {
    /**
     * on register plugin
     */
    onRegister: (context: any) => void;
    /**
     * Called after the plug-in has been initialized
     * You can get the context by this.getContext() and do more (you can customize it)
     */
    onInit: () => void;
    /**
     * Before sending the request (before the request is sent, you can modify the request)
     */
    onBeforeRequest: (request: any) => void;
    /**
     * Between onBeforeRequest and onRequest,
     * if a mock identity is provided in onMockRequest,
     * it will respond directly to onResponse as simulated data
     */
    onMockRequest: (request: any) => void;
    /**
     * Send request
     */
    onRequest: (request: any) => void;
    onError: (error: any) => void;
    /**
     * Retry request
     */
    onRetry: (request: any) => void;
    /**
     * Cancel request (abort｜CancelToken.cancel)
     */
    onCancel: (request: any) => void;
    /**
     * After receiving the response (you can modify the response)
     */
    onResponse: (response: any) => Promise<any> | void;
    /**
     * after all
     */
    onFinally: (response: any) => void;
    /**
     * destroy
     */
    destroy: () => void;
}
export interface Plugin extends Partial<PluginDefine> {
}
export type PluginLifecycle = keyof PluginDefine;
export default function Plugin(): void;
