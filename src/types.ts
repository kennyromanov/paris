
// Base Data Types

export type Obj<T = any> = Record<string, T>;

export type Serializable = Obj | any[];

export type Storable = string | number | Serializable | null;

export type Nullable<T> = T | null | undefined;


// Base System Types

export type Constructor<T = object> = new (..._args: any[]) => T;

export type MaybePromise<T = any> = T | Promise<T>;


// Remote Component Struct Types

export type RemoteComponentOptionsApi = {
    $emit: RemoteComponentEmitHandler,
};

export type RemoteComponent = {
    on: RemoteComponentListenHandler,
    inject: RemoteComponentEmitHandler,
    mount: RemoteComponentDomHandler,
};

export type RemoteComponentOptions = RemoteComponentOptionsApi & {
    onInject?: Nullable<RemoteComponentInjectHook>,
    onMount?: Nullable<RemoteComponentDomHook>,
};


// Remote Component Callable Types

export type RemoteComponentEmitHandler = (name: Symbol | string, val: any) => void;

export type RemoteComponentListenHandler = (name: Symbol | string, val: any) => MaybePromise<void>;

export type RemoteComponentDomHandler = (el: HTMLElement) => void;

export type RemoteComponentInjectHook = (name?: Symbol | string, val?: any) => MaybePromise;

export type RemoteComponentDomHook = (el?: HTMLElement) => MaybePromise;
