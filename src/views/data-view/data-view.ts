import { inject } from 'aurelia-framework';
import { DataService } from '../../services/data-service';
import { Image } from '../../models/image';

@inject(DataService)
export class DataView {

    images: Image[] = [];

    constructor(private dataSvc: DataService) {

    }

    private searchGifs(event) {
        let data: string = event.data;
        this.dataSvc.searchGifs(data).then(output => {
            this.images = [];
            for(let d of output.data) {
                this.images.push({ caption: d.caption, url: d.images.original.url });
            }
        });
    }

}