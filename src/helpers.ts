export const isObject = (value: any): boolean => Object.prototype.toString.call(value) === "[object Object]"
export const isFunction = (value: any): value is Function => typeof value === 'function';
export const isString = (value: any): value is String => typeof value === 'string';