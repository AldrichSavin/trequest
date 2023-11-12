import { CreateMethodDecorator } from "./decorator";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const requestInstance = axios.create();

const GET = CreateMethodDecorator("get", requestInstance);
const POST = CreateMethodDecorator("post", requestInstance);
const PUT = CreateMethodDecorator("put", requestInstance);
const DELETE = CreateMethodDecorator("delete", requestInstance);
const PATCH = CreateMethodDecorator("patch", requestInstance);

export { GET, POST, PUT, DELETE, PATCH };

export type ExtendedAxiosRequestConfig<D = any, V = any> =
  | AxiosRequestConfig<D>
  | Promise<AxiosResponse<V, D>>;
export type ExtendedAxiosResponse<T = any> = Promise<AxiosResponse<T>>;
