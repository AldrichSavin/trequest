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