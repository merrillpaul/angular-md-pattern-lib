import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ViewContainerRef, TemplateRef, ComponentRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerContext } from '../directives/spinner.directive';
import { SpinnerComponent, SpinnerMode, SpinnerStrategy, SpinnerType, SpinnerStyle } from '../component/spinner.component';
import { SpinnerRef, SpinnerFactory } from './spinner.factory';


export interface ISpinnerConfig {
    name: string;
    type?: SpinnerType;
    mode?: SpinnerMode;
    color?: 'primary' | 'accent' | 'warn' | 'success' | 'secondary';
}



export class SpinnerConfig implements ISpinnerConfig {
    name: string;
    type?: SpinnerType;
    mode?: SpinnerMode;
    color?: 'primary' | 'accent' | 'warn' | 'success' | 'secondary';

    constructor(config: ISpinnerConfig) {
        this.name = config.name;
        if (!this.name) {
            throw Error('Name is required for configuration.');
        }
        this.mode = config.mode ? config.mode : SpinnerMode.Indeterminate;
        this.type = config.type ? config.type : SpinnerType.Circular;
        this.color = config.color ? config.color : 'primary';
    }
}

export interface ISpinnerDirectiveConfig extends ISpinnerConfig {
    strategy?: SpinnerStrategy;
}

export class SpinnerDirectiveConfig extends SpinnerConfig implements ISpinnerDirectiveConfig {
    name: string;
    type: SpinnerType;
    mode: SpinnerMode;
    strategy: SpinnerStrategy;

    constructor(config: ISpinnerDirectiveConfig) {
        super(config);
        this.strategy = config.strategy ? config.strategy : SpinnerStrategy.Replace;
    }
}


@Injectable()
export class SpinnerService {

    private _context: { [key: string]: SpinnerRef } = {};
    private _timeouts: { [key: string]: any } = {};

    constructor(private _spinnerFactory: SpinnerFactory) {
        this.create({
            name: 'spinner-main',
        });
    }

    /**
     * params:
     * - config
     * - viewContainerRef: ViewContainerRef
     * - templateRef: TemplateRef<Object>
     *
     * Creates an replace loading mask and attaches it to the viewContainerRef.
     * Replaces the templateRef with the mask when a request is registered on it.
     *
     * NOTE: @internal usage only.
     */
    createComponent(config: ISpinnerDirectiveConfig, viewContainerRef: ViewContainerRef,
        templateRef: TemplateRef<Object>, context: SpinnerContext): SpinnerRef {
        let directiveConfig: SpinnerDirectiveConfig = new SpinnerDirectiveConfig(config);
        if (this._context[directiveConfig.name]) {
            throw Error(`Name duplication: [TdLoading] directive has a name conflict with ${directiveConfig.name}.`);
        }
        if (directiveConfig.strategy === SpinnerStrategy.Overlay) {
            this._context[directiveConfig.name] = this._spinnerFactory.createOverlayComponent(directiveConfig, viewContainerRef, templateRef);
        } else {
            this._context[directiveConfig.name] = this._spinnerFactory.createReplaceComponent(directiveConfig, viewContainerRef, templateRef, context);
        }
        return this._context[directiveConfig.name];
    }

    /**
     * params:
     * - config
     *
     * Creates a fullscreen loading mask and attaches it to the DOM with the given configuration.
     * Only displayed when the mask has a request registered on it.
     */
    public create(config: ISpinnerConfig): void {
        let fullscreenConfig: SpinnerConfig = new SpinnerConfig(config);
        this.removeComponent(fullscreenConfig.name);
        this._context[fullscreenConfig.name] = this._spinnerFactory.createFullScreenComponent(fullscreenConfig);
    }

    /**
     * params:
     * - name: string
     *
     * Removes `loading` component from service context.
     */
    public removeComponent(name: string): void {
        if (this._context[name]) {
            this._context[name].subject.unsubscribe();
            if (this._context[name].componentRef) {
                this._context[name].componentRef.destroy();
            }
            this._context[name] = undefined;
            delete this._context[name];
        }
    }

    /**
     * params:
     * - name: string
     * - registers?: number
     * returns: true if successful
     *
     * Resolves a request for the loading mask referenced by the name parameter.
     * Can optionally pass registers argument to set a number of register calls.
     *
     * If no paramemeters are used, then default main mask will be used.
     *
     * e.g. spinnerService.register()
     */
    public register(name: string = 'spinner-main', registers: number = 1): boolean {
        // try registering into the service if the loading component has been instanciated or if it exists.
        if (this._context[name]) {
            registers = registers < 1 ? 1 : registers;
            this._context[name].times += registers;
            this._context[name].subject.next(this._context[name].times);
            return true;
        } else {
            // if it doesnt exist, set a timeout so its registered after change detection happens
            // this in case "register" occured on the `ngOnInit` lifehook cycle.
            if (!this._timeouts[name]) {
                this._timeouts[name] = setTimeout(() => {
                    this.register(name, registers);
                });
            } else {
                // if it timeout occured and still doesnt exist, it means the tiemout wasnt needed so we clear it.
                this._clearTimeout(name);
            }
        }
        return false;
    }

    /**
     * params:
     * - name: string
     * - resolves?: number
     * returns: true if successful
     *
     * Resolves a request for the loading mask referenced by the name parameter.
     * Can optionally pass resolves argument to set a number of resolve calls.
     *
     * If no paramemeters are used, then default main mask will be used.
     *
     * e.g. spinnerService.resolve()
     */
    public resolve(name: string = 'spinner-main', resolves: number = 1): boolean {
        // clear timeout if the loading component is "resolved" before its "registered"
        this._clearTimeout(name);
        if (this._context[name]) {
            resolves = resolves < 1 ? 1 : resolves;
            if (this._context[name].times > 0) {
                let times: number = this._context[name].times;
                times -= resolves;
                this._context[name].times = times < 0 ? 0 : times;
            }
            this._context[name].subject.next(this._context[name].times);
            return true;
        }
        return false;
    }

    /**
     * params:
     * - name: string
     * returns: true if successful
     *
     * Resolves all request for the loading mask referenced by the name parameter.
     *
     * If no paramemeters are used, then default main mask will be used.
     *
     * e.g. spinnerService.resolveAll()
     */
    public resolveAll(name: string = 'spinner-main'): boolean {
        // clear timeout if the loading component is "resolved" before its "registered"
        this._clearTimeout(name);
        if (this._context[name]) {
            this._context[name].times = 0;
            this._context[name].subject.next(this._context[name].times);
            return true;
        }
        return false;
    }

    /**
     * params:
     * - name: string
     * - value: number
     * returns: true if successful
     *
     * Set value on a loading mask referenced by the name parameter.
     * Usage only available if its mode is 'determinate' and if loading is showing.
     */
    public setValue(name: string, value: number): boolean {
        if (this._context[name]) {
            let instance: SpinnerComponent = this._context[name].componentRef.instance;
            if (instance.mode === SpinnerMode.Determinate && instance.animation) {
                instance.value = value;
                return true;
            }
        }
        return false;
    }

    /**
     * Clears timeout linked to the name.
     * @param name Name of the loading component to be cleared
     */
    private _clearTimeout(name: string): void {
        clearTimeout(this._timeouts[name]);
        delete this._timeouts[name];
    }
}
