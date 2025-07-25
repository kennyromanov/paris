import { RemoteComponent, RemoteComponentOptions } from '@/types';
import { BaseError } from './errors';


// Classes

export class Paris {

}


// Functions

export function mountRemoteComponent(component: any, el: any): void {
    const handle = component?.mount ?? defaultMount;
    handle(el);
}

export function defineRemoteComponent(options: RemoteComponentOptions): RemoteComponent {
    const inject = options?.onInject ?? defaultInject;
    const mount = options?.onMount ?? defaultMount;

    return { inject, mount };
}

export function defaultInject(): void {
    // The default injection handler does nothing
}

export function defaultMount(): void {
    throw new BaseError(`Paris: Unable to mount component: The component is missing hooks: 'mount'`);
}


export default Paris;
