import mitt from 'mitt';
import { RemoteComponent, RemoteComponentEmitHandler, RemoteComponentListenHandler, RemoteComponentOptions, RemoteComponentOptionsApi } from '@/types';
import { BaseError } from './errors';


// Classes

// export class Paris {
//
// }


// Functions

export function mountRemoteComponent(component: any, el: any): void {
    const handle = component?.mount ?? defaultMount;
    handle(el);
}

export function defineRemoteComponent(options: RemoteComponentOptions): RemoteComponent {

    // Creating the event bus

    const bus = mitt();
    const emit = bus.emit as RemoteComponentEmitHandler;
    const on = bus.on as RemoteComponentListenHandler;


    // Creating the options API

    const $emit = emit;
    const optionsApi: RemoteComponentOptionsApi = { $emit };


    // Defining the functions

    const onInject = options?.onInject ?? defaultInject;
    const onMount = options?.onMount ?? defaultMount;


    // Defining the methods

    const inject = onInject.bind(optionsApi);
    const mount = onMount.bind(optionsApi);

    // TODO: DBG
    on('tctTemplate:create', (val) => console.log('tctTemplate:create', val));


    return {
        inject,
        mount,
        on,
    };
}

export function defaultInject(): void {
    // The default injection handler does nothing
}

export function defaultMount(): void {
    throw new BaseError(`Paris: Unable to mount component: The component is missing hooks: 'mount'`);
}


// export default Paris;

export type {
    RemoteComponent,
    RemoteComponentEmitHandler,
    RemoteComponentListenHandler,
    RemoteComponentOptions,
    RemoteComponentOptionsApi,
};
