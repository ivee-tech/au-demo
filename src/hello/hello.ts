import { customElement, inject } from 'aurelia-framework';


@customElement('say-hello') 
export class Hello { 

  firstName: string = 'John'; 
  lastName: string = 'Doe'; 

  constructor() {
    
  }

  sayHello() { 
    alert(`Hello ${this.firstName} ${this.lastName}. Nice to meet you.`); 
  }
}