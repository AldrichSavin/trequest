export type EventProperties = string | symbol;
export type EventListener<T extends any[] = []> = (...args: [...T]) => void;

export default class EventEmitter extends Map<EventProperties, EventListener> {
    constructor() {
        super();
    }

    on<T extends any[] = []>(event: EventProperties, listener: EventListener<T>): EventEmitter {
        this.set(event, listener);
        return this;
    }

    emit<T extends any[] = []>(event: EventProperties, ...args: [...T]): boolean {
        const listener = this.get(event);
        if (listener) {
            // @ts-ignore
            listener.apply(this, args);
            return true;
        }
        return false;
    }

    off(event: EventProperties): EventEmitter {
        this.delete(event);
        return this;
    }
}
