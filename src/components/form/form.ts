import { inject, bindable, NewInstance, customElement } from 'aurelia-framework';
import { ValidationRules, ValidationController } from 'aurelia-validation';

@inject(NewInstance.of(ValidationController))
@customElement('d-form')
export class Form {

    @bindable userName: string;
    @bindable password: string;
    @bindable address: string;
    @bindable state: string;
    @bindable isCitizen: boolean;

    private states: string[] = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'VIC', 'TAS', 'WA'];

    private errorMessage: string;
    private infoMessage: string;

    constructor(private validationController: ValidationController) {
        ValidationRules
            .ensure((m: Form) => m.userName).displayName("User name").required()
            .ensure((m: Form) => m.password).displayName("Password").required()
            .ensure((m: Form) => m.address).displayName("Address").required()
            .on(this);
    }

    submit() {
        this.infoMessage = null;
        this.errorMessage = null;
        this.validationController
            .validate()
            .then(result => {
                if (result.valid) {
                    this.errorMessage = null;
                    this.infoMessage = 'Validation successful. Submitting...';
                }
                else {
                    this.infoMessage = null;
                    this.errorMessage = 'Validaton error(s):';
                    for (let error of this.validationController.errors) {
                        this.errorMessage += error.message + ' ';
                    }
                }
            })
    }
}