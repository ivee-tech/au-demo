import { Aurelia, bindable, inject, customElement } from 'aurelia-framework';

@customElement('iv-spinner')
export class Spinner {  
    private currentTimeout: any;
    private isDelayedRunning: boolean = false;
    private _isRunning: boolean = false;

    @bindable delay: number = 300;
    @bindable spinnerType: string = 'spinner-circles';
    @bindable isRunning: boolean;

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    detached(argument) {
        this.cancelTimeout();
    }

    attached(argument) {
        console.log(this.isRunning);
    }
}