import EventEmitter from "./EventEmitter";
export interface IAbstractPlugin {
    name: string | symbol;
    version?: string;
    setContext(context: Record<string | number | symbol, any>): void;
    getContext(): any;
}
export default abstract class AbstractPlugin extends EventEmitter {
    /**
     * The runtime context of the plug-in
     */
    private _context;
    constructor();
    /**
     * The name of the plug-in
     */
    abstract name: string | symbol;
    /**
     * The version number of the plug-in
     */
    protected version?: string;
    /**
     * This function will be called when the plug-in is registered,
     * passing the current runtime context to each plug-in so that the plug-in can communicate directly
     */
    protected setContext(context: any): void;
    /**
     * You can get the runtime context inside the plugin by modifying the function
     */
    protected getContext(): any;
}
