import {
    RemoteComponent,
    RemoteComponentEmitHook,
    RemoteComponentListenHook,
    RemoteComponentListenAllHandler,
    RemoteComponentListenAllHook,
    RemoteComponentOptions,
    RemoteComponentOptionsApi,
} from '@/types';

import { BaseError } from './errors';
import mitt from 'mitt';


// Functions

export function mountRemoteComponent(component: any, el: any): void {
    const handle = component?.mount ?? defaultMount;
    handle(el);
}

export function defineRemoteComponent(options: RemoteComponentOptions): RemoteComponent {

    // Creating the event bus

    const bus = mitt();

    const emit = ((event: Symbol | string, data: any): void => {
        bus.emit('any', { event, data });
        bus.emit(String(event), data);
    }) as RemoteComponentEmitHook;

    const on = bus.on as RemoteComponentListenHook;

    const onAll = ((handler: RemoteComponentListenAllHandler) => on(
        'any',
        (val: any) => handler(val?.event, val?.data),
    )) as RemoteComponentListenAllHook;


    // Creating the options API

    const $emit = emit;

    const optionsApi: RemoteComponentOptionsApi = { $emit };


    // Defining the functions

    const onInject = options?.onInject ?? defaultInject;

    const onMount = options?.onMount ?? defaultMount;


    // Defining the methods

    const inject = onInject.bind(optionsApi);

    const mount = onMount.bind(optionsApi);


    return {
        on,
        onAll,
        inject,
        mount,
    };
}

export function defaultInject(): void {
    // The default injection handler does nothing
}

export function defaultMount(): void {
    throw new BaseError(`Paris: Unable to mount component: The component is missing hooks: 'mount'`);
}


export type {
    RemoteComponent,
    RemoteComponentEmitHook,
    RemoteComponentListenAllHandler,
    RemoteComponentListenAllHook,
    RemoteComponentOptions,
    RemoteComponentOptionsApi,
};
