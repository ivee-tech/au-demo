import { bindable } from 'aurelia-framework';
import { Image } from '../models/image';

export class Data {

    private searchText: string;
    private imageUrl: string;

    @bindable images: Image[] = [];

    @bindable search;

    private notifySearch() {
        this.search({ data: this.searchText });
    }

}