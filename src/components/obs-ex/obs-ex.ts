import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import { computedFrom } from 'aurelia-framework';
 
export class ObsEx {
    counter = Observable.interval(1000);
    twoWayBinding = new ReplaySubject(1);
    onClick = new Subject();
 
    constructor() {
        this.onClick.subscribe(next => console.log('clicked!'));
        this.twoWayBinding.subscribe(next => console.log(`new value: ${next}`));
    }
  
    // in this example we want to demonstrate  
    // regeneration of the value based on the observableSignal 
    // hence we fool Aurelia into thinking it's computed from 'nothing' 
    @computedFrom('nothing')
    get random() {
        return Math.random();
    }

    detached() {
        this.onClick.unsubscribe();
        this.twoWayBinding.unsubscribe();
    }
}
