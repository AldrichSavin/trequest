export type EventProperties = string | symbol;
export type EventListener<T extends any[] = []> = (...args: [...T]) => void;
export default class EventEmitter extends Map<EventProperties, EventListener> {
    constructor();
    on<T extends any[] = []>(event: EventProperties, listener: EventListener<T>): EventEmitter;
    emit<T extends any[] = []>(event: EventProperties, ...args: [...T]): boolean;
    off(event: EventProperties): EventEmitter;
}
