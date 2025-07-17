import { BaseError } from './errors';


// Classes

export class Paris {

}


// Functions

export function mountComponent(component: any, el: any): void {
    const handle = component?.mount ?? null;

    if (handle)
        handle(el);
    else
        throw new BaseError('Paris: Unable to render component: The component is missing hooks: mount');
}

export function defineComponent(options: any): any {
    const mount = options?.onMount ?? null;
    return { mount };
}


export default Paris;
