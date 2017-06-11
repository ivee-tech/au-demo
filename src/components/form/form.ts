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

    private loginErrorMessage: string;

    constructor(private validationController: ValidationController) {
        ValidationRules
            .ensure((m: Form) => m.userName).displayName("User name").required()
            .ensure((m: Form) => m.password).displayName("Password").required()
            .ensure((m: Form) => m.address).displayName("Address").required()
            .on(this);
    }

    submit() {
        this.validationController
            .validate()
            .then(result => {
                if (result.valid) {
                    this.loginErrorMessage = null;
                    alert('Validation successful. Submitting...');
                }
                else {
                    this.loginErrorMessage = 'Validaton error(s):';
                    for (let error of this.validationController.errors) {
                        this.loginErrorMessage += error.message + ' ';
                    }
                }
            })
    }
}