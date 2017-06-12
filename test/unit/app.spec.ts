import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { StageComponent } from 'aurelia-testing';
import { Container } from 'aurelia-dependency-injection';
import { bootstrap } from 'aurelia-bootstrapper';


describe('the app', () => {

  let container: Container;
  let component;
  let dlgSvc: DialogService;
  let ea: EventAggregator;

  beforeEach(() => {
    container = new Container();

    component = StageComponent
      .withResources('app')
      .inView('<app></app>');

    component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();
        
        // aurelia.container.registerInstance(DialogService, dlgSvc);
        // aurelia.container.registerInstance(EventAggregator, ea);
        // dlgSvc = container.get(DialogService);
        // ea = container.get(EventAggregator);
    });
  });

  it('says Aurelia demo', (done) => {
    component.create(bootstrap).then(() => {
      // console.log(component);
      const elem = document.querySelector('h1');
      expect(elem.innerText).toBe('Aurelia demo');
      
      done();
    });
  });

  afterEach(() => {
    component.dispose();
  });

});
