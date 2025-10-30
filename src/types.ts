
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
    $emit: RemoteComponentEmitHook,
};

export type RemoteComponent = {
    on: RemoteComponentListenHook,
    onAll: RemoteComponentListenAllHook,
    inject: RemoteComponentEmitHook,
    mount: RemoteComponentDomHook,
};

export type RemoteComponentOptions = {
    $emit?: Nullable<RemoteComponentEmitHook>,
    onInject?: Nullable<RemoteComponentInjectHandler>,
    onMount?: Nullable<RemoteComponentDomHandler>,
};


// Remote Component Callable Types

export type RemoteComponentListenHook = (name: Symbol | string, val: any) => MaybePromise<void>;

export type RemoteComponentListenAllHandler = (name: Symbol | string, val: any) => MaybePromise<void>;

export type RemoteComponentListenAllHook = (val: RemoteComponentListenAllHandler) => MaybePromise<void>;

export type RemoteComponentEmitHook = (name: Symbol | string, val: any) => MaybePromise<void>;

export type RemoteComponentDomHook = (el: HTMLElement) => void;

export type RemoteComponentInjectHandler = (name?: Symbol | string, val?: any) => MaybePromise;

export type RemoteComponentDomHandler = (el?: HTMLElement) => MaybePromise;
