### 🧪 Experiment

### Axios extensible plug-in implementation
Do We have to tie the business logic to the request library? This repository tries to give you another way to decouple the request library from the business logic by implementing plugins.

### What is this?
Before
```
import axios from "axios";

const instance = axios.create({ baseURL: "https://xxx.com" });

instance.interceptors.request.use((config) => {
    // doAuthentication
    // doSetCancelToken
    // doSetHeaders
    // doSomethingElse
    return config;
});

instance.interceptors.response.use((response) => {
    // doCheckStatus
    // doCancel
    // doCheckError
    // doSomethingElse
    return response;
});
```

Now
```typescript
import { Core } from "@doaction/http";
import CancelablePlugin from "./plugins/Cancelable";
import RetryablePlugin from "./plugins/Retryable";

const http = new Core({ plugins: [new CancelablePlugin(), new RetryablePlugin()] });

http.get("/"); // TODO
http.get("/", { cancelable: true }); // TODO: cancelable
http.get("/", { retryable: true })
```

### How Create a Plugin
You can develop a Plugin simply by inheriting AbstractPlugin and using the methods that the plugin uses.

Of course, there are some unique life cycles within plug-ins, which we will explain in detail in the development documentation

```typescript
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
```