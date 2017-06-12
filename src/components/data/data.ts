import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import { Image } from '../../models/image';

@inject(EventAggregator)
export class Data {

    private searchText: string;
    private imageUrl: string;
    private selectedImage: Image; 

    @bindable images: Image[] = [];

    @bindable search;

    constructor(private ea: EventAggregator) {
    }

    private notifySearch() {
        this.search({ data: this.searchText });
    }

    private notifyOpenImageDlg(image: Image) {
        this.selectedImage = image;
        this.ea.publish('OPEN_IMAGE_DLG', this.selectedImage);
    }

}