import { AbstractPlugin, Plugin } from "@doaction/http";

export default class CancelablePlugin extends AbstractPlugin implements Plugin {
    name = "CancelablePlugin";
    constructor() {
        super();
    }

    onRegister(): void {
        console.log("onRegister");
    }

    onInit(): void {
        /**
         * 尝试跨插件注册事件
         */
        const context = this.getContext();
        context.getPluginByName("RetryablePlugin").on("retry", () => {
            console.log("retry");
        });
    }
}