import {RouterConfiguration, Router} from 'aurelia-router';

export class App { 

  message = 'Aurelia demo';

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void { 
    config.title = 'Aurelia'; 
    config.map([ 
      { route: ['', 'home'], name: 'home', moduleId: 'views/home-view/home-view', title: 'Home', nav: true }, 
      { route: 'hello', name: 'hello', moduleId: 'views/hello-view/hello-view', nav: true, title: 'Hello' }, 
      { route: 'data', name: 'data', moduleId: 'views/data-view/data-view', nav: true, title: 'Data' }, 
      //{ route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' }, 
    ]); 
    this.router = router;
  }
}
