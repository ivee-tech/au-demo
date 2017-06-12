import { customElement, bindable } from 'aurelia-framework';


@customElement('say-hello') 
export class Hello { 

  @bindable firstName: string = 'John'; 
  @bindable lastName: string = 'Doe'; 

  constructor() {
    console.log('Hello - ctor');
  }

  sayHello() { 
    alert(`Hello ${this.firstName} ${this.lastName}. Nice to meet you.`); 
  }
  
  created(owningView, myView) {
    console.log('Hello - created');
  }

  bind(bindingContext, overrideContext) {
    console.log('Hello - bind'); 
  }
  
  attached() {
    console.log('Hello - attached');
  }

  detached() {
    console.log('Hello - detached');
  }

  unbind() {
    console.log('Hello - unbind');
  }

  firstNameChanged(newValue: string, oldValue: string) {
    console.log(`firstName changed: newValue: ${newValue}, oldValue: ${oldValue}`);  
  }

}