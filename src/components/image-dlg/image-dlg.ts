import {inject} from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

import { Image } from '../../models/image';

@inject(DialogController)
export class ImageDlg {

    public image: Image;

    constructor(private controller: DialogController) {

        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(image) {
        this.image = image;
    }
}