import { Core } from "@doaction/http";
import CancelablePlugin from "./plugins/Cancelable";
import RetryablePlugin from "./plugins/Retryable";

new Core({ plugins: [new CancelablePlugin(), new RetryablePlugin()] });