import { AbstractPlugin, Plugin } from "@doaction/http";

export default class RetryablePlugin extends AbstractPlugin implements Plugin {
    name = "RetryablePlugin";

    constructor() {
        super();
    }

    onRegister(): void {
        console.log("onRegister");
    }

    onInit(): void {
        /**
         * 尝试跨插件通信
         */
        setTimeout(() => {
            this.emit("retry");
        }, 3000)
    }
}