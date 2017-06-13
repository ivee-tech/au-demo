import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { ImageDlg } from './components/image-dlg/image-dlg';
import { Image } from './models/image';

@inject(DialogService, EventAggregator)
export class App { 

  message = 'Aurelia demo';

  private router: Router;
  private image: Image;
  private openImageDlgSubscr: Subscription;

  constructor(
    private dialogService: DialogService,
    private ea: EventAggregator
  ) {
    this.openImageDlgSubscr = ea.subscribe('OPEN_IMAGE_DLG', (img: Image) => {
      this.image = img;
      this.openImageDlg();
    });
  }

  configureRouter(config: RouterConfiguration, router: Router): void { 
    config.title = 'Aurelia'; 
    config.map([ 
      { route: ['', 'home'], name: 'home', moduleId: 'views/home-view/home-view', title: 'Home', nav: true }, 
      { route: 'hello', name: 'hello', moduleId: 'views/hello-view/hello-view', nav: true, title: 'Hello' }, 
      { route: 'data', name: 'data', moduleId: 'views/data-view/data-view', nav: true, title: 'Data' }, 
      { route: 'form', name: 'form', moduleId: 'views/form-view/form-view', nav: true, title: 'Form' }, 
      { route: 'obs-ex', name: 'obs-ex', moduleId: 'views/obs-ex-view/obs-ex-view', nav: true, title: 'Observable' }, 
      //{ route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' }, 
    ]); 
    this.router = router;
  }

  detached() {
    this.openImageDlgSubscr.dispose();
  }

  private openImageDlg() {
    this.dialogService.open({ viewModel: ImageDlg, model: this.image }).whenClosed(response => {
        console.log(response);

        if (!response.wasCancelled) {
            console.log('OK');
        } else {
            console.log('cancelled');
        }
    });
  }

}
