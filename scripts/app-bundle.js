define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.message = 'Aurelia demo';
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia';
            config.map([
                { route: ['', 'home'], name: 'home', moduleId: 'views/home-view/home-view', title: 'Home', nav: true },
                { route: 'hello', name: 'hello', moduleId: 'views/hello-view/hello-view', nav: true, title: 'Hello' },
                { route: 'data', name: 'data', moduleId: 'views/data-view/data-view', nav: true, title: 'Data' },
                { route: 'form', name: 'form', moduleId: 'views/form-view/form-view', nav: true, title: 'Form' },
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-router')
            .plugin('aurelia-validation');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('models/image',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Image = (function () {
        function Image() {
        }
        return Image;
    }());
    exports.Image = Image;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/data-service',["require", "exports", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataService = (function () {
        function DataService(httpClient) {
            this.httpClient = httpClient;
        }
        DataService.prototype.loadData = function (url) {
            var _this = this;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.httpClient.fetch(url, {
                credentials: 'omit',
                headers: headers
            })
                .then(function (response) {
                return _this.handleResponse(response);
            });
        };
        DataService.prototype.postData = function (url, data) {
            var _this = this;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.httpClient.fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: headers
            })
                .then(function (response) {
                return _this.handleResponse(response);
            });
        };
        DataService.prototype.searchGifs = function (searchText) {
            var url = "http://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";
            return this.loadData(url);
        };
        DataService.prototype.handleResponse = function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log(response);
                return response.json()
                    .then(function (jsonResponse) {
                    return new Promise(function (resolve, reject) {
                        if (jsonResponse) {
                            resolve(jsonResponse);
                        }
                        else {
                            reject(response.status + " " + response.statusText);
                        }
                    });
                });
            }
        };
        return DataService;
    }());
    DataService = __decorate([
        aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient),
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], DataService);
    exports.DataService = DataService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/data/data',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Data = (function () {
        function Data() {
            this.images = [];
        }
        Data.prototype.notifySearch = function () {
            this.search({ data: this.searchText });
        };
        return Data;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], Data.prototype, "images", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Data.prototype, "search", void 0);
    exports.Data = Data;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/form/form',["require", "exports", "aurelia-framework", "aurelia-validation"], function (require, exports, aurelia_framework_1, aurelia_validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Form = (function () {
        function Form(validationController) {
            this.validationController = validationController;
            this.states = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'VIC', 'TAS', 'WA'];
            aurelia_validation_1.ValidationRules
                .ensure(function (m) { return m.userName; }).displayName("User name").required()
                .ensure(function (m) { return m.password; }).displayName("Password").required()
                .ensure(function (m) { return m.address; }).displayName("Address").required()
                .on(this);
        }
        Form.prototype.submit = function () {
            var _this = this;
            this.validationController
                .validate()
                .then(function (result) {
                if (result.valid) {
                    _this.loginErrorMessage = null;
                    alert('Validation successful. Submitting...');
                }
                else {
                    _this.loginErrorMessage = 'Validaton error(s):';
                    for (var _i = 0, _a = _this.validationController.errors; _i < _a.length; _i++) {
                        var error = _a[_i];
                        _this.loginErrorMessage += error.message + ' ';
                    }
                }
            });
        };
        return Form;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Form.prototype, "userName", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Form.prototype, "password", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Form.prototype, "address", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Form.prototype, "state", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Form.prototype, "isCitizen", void 0);
    Form = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(aurelia_validation_1.ValidationController)),
        aurelia_framework_1.customElement('d-form'),
        __metadata("design:paramtypes", [aurelia_validation_1.ValidationController])
    ], Form);
    exports.Form = Form;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/hello/hello',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Hello = (function () {
        function Hello() {
            this.firstName = 'John';
            this.lastName = 'Doe';
        }
        Hello.prototype.sayHello = function () {
            alert("Hello " + this.firstName + " " + this.lastName + ". Nice to meet you.");
        };
        return Hello;
    }());
    Hello = __decorate([
        aurelia_framework_1.customElement('say-hello'),
        __metadata("design:paramtypes", [])
    ], Hello);
    exports.Hello = Hello;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/spinner/spinner',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Spinner = (function () {
        function Spinner() {
            this.isDelayedRunning = false;
            this._isRunning = false;
            this.delay = 300;
            this.spinnerType = 'spinner-circles';
        }
        Spinner.prototype.cancelTimeout = function () {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = undefined;
        };
        Spinner.prototype.detached = function (argument) {
            this.cancelTimeout();
        };
        Spinner.prototype.attached = function (argument) {
            console.log(this.isRunning);
        };
        return Spinner;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Spinner.prototype, "delay", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], Spinner.prototype, "spinnerType", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Spinner.prototype, "isRunning", void 0);
    Spinner = __decorate([
        aurelia_framework_1.customElement('iv-spinner')
    ], Spinner);
    exports.Spinner = Spinner;
});

define('views/form-view/form-view',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormView = (function () {
        function FormView() {
        }
        return FormView;
    }());
    exports.FormView = FormView;
});

define('views/hello-view/hello-view',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HelloView = (function () {
        function HelloView() {
            this.message = 'Hello World!';
        }
        return HelloView;
    }());
    exports.HelloView = HelloView;
});

define('views/home-view/home-view',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HomeView = (function () {
        function HomeView() {
        }
        return HomeView;
    }());
    exports.HomeView = HomeView;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/data-view/data-view',["require", "exports", "aurelia-framework", "../../services/data-service"], function (require, exports, aurelia_framework_1, data_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataView = (function () {
        function DataView(dataSvc) {
            this.dataSvc = dataSvc;
            this.images = [];
        }
        DataView.prototype.searchGifs = function (event) {
            var _this = this;
            var data = event.data;
            this.dataSvc.searchGifs(data).then(function (output) {
                _this.images = [];
                for (var _i = 0, _a = output.data; _i < _a.length; _i++) {
                    var d = _a[_i];
                    _this.images.push({ caption: d.caption, url: d.images.fixed_width.url });
                }
            });
        };
        return DataView;
    }());
    DataView = __decorate([
        aurelia_framework_1.inject(data_service_1.DataService),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], DataView);
    exports.DataView = DataView;
});

define('aurelia-validation/get-target-dom-element',["require", "exports", "aurelia-pal"], function (require, exports, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Gets the DOM element associated with the data-binding. Most of the time it's
     * the binding.target but sometimes binding.target is an aurelia custom element,
     * or custom attribute which is a javascript "class" instance, so we need to use
     * the controller's container to retrieve the actual DOM element.
     */
    function getTargetDOMElement(binding, view) {
        var target = binding.target;
        // DOM element
        if (target instanceof Element) {
            return target;
        }
        // custom element or custom attribute
        // tslint:disable-next-line:prefer-const
        for (var i = 0, ii = view.controllers.length; i < ii; i++) {
            var controller = view.controllers[i];
            if (controller.viewModel === target) {
                var element = controller.container.get(aurelia_pal_1.DOM.Element);
                if (element) {
                    return element;
                }
                throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
            }
        }
        throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
    }
    exports.getTargetDOMElement = getTargetDOMElement;
});

define('aurelia-validation/property-info',["require", "exports", "aurelia-binding"], function (require, exports, aurelia_binding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getObject(expression, objectExpression, source) {
        var value = objectExpression.evaluate(source, null);
        if (value === null || value === undefined || value instanceof Object) {
            return value;
        }
        // tslint:disable-next-line:max-line-length
        throw new Error("The '" + objectExpression + "' part of '" + expression + "' evaluates to " + value + " instead of an object, null or undefined.");
    }
    /**
     * Retrieves the object and property name for the specified expression.
     * @param expression The expression
     * @param source The scope
     */
    function getPropertyInfo(expression, source) {
        var originalExpression = expression;
        while (expression instanceof aurelia_binding_1.BindingBehavior || expression instanceof aurelia_binding_1.ValueConverter) {
            expression = expression.expression;
        }
        var object;
        var propertyName;
        if (expression instanceof aurelia_binding_1.AccessScope) {
            object = source.bindingContext;
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessMember) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessKeyed) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.key.evaluate(source);
        }
        else {
            throw new Error("Expression '" + originalExpression + "' is not compatible with the validate binding-behavior.");
        }
        if (object === null || object === undefined) {
            return null;
        }
        return { object: object, propertyName: propertyName };
    }
    exports.getPropertyInfo = getPropertyInfo;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/validate-binding-behavior',["require", "exports", "aurelia-task-queue", "./validate-trigger", "./validate-binding-behavior-base"], function (require, exports, aurelia_task_queue_1, validate_trigger_1, validate_binding_behavior_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the validate trigger specified by the associated controller's
     * validateTrigger property occurs.
     */
    var ValidateBindingBehavior = (function (_super) {
        __extends(ValidateBindingBehavior, _super);
        function ValidateBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateBindingBehavior.prototype.getValidateTrigger = function (controller) {
            return controller.validateTrigger;
        };
        return ValidateBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateBindingBehavior = ValidateBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property will be validated
     * manually, by calling controller.validate(). No automatic validation
     * triggered by data-entry or blur will occur.
     */
    var ValidateManuallyBindingBehavior = (function (_super) {
        __extends(ValidateManuallyBindingBehavior, _super);
        function ValidateManuallyBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateManuallyBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.manual;
        };
        return ValidateManuallyBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateManuallyBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateManuallyBindingBehavior = ValidateManuallyBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs.
     */
    var ValidateOnBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnBlurBindingBehavior, _super);
        function ValidateOnBlurBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.blur;
        };
        return ValidateOnBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnBlurBindingBehavior = ValidateOnBlurBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element is changed by the user, causing a change
     * to the model.
     */
    var ValidateOnChangeBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeBindingBehavior, _super);
        function ValidateOnChangeBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnChangeBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.change;
        };
        return ValidateOnChangeBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeBindingBehavior = ValidateOnChangeBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs or is changed by the user, causing
     * a change to the model.
     */
    var ValidateOnChangeOrBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeOrBlurBindingBehavior, _super);
        function ValidateOnChangeOrBlurBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnChangeOrBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.changeOrBlur;
        };
        return ValidateOnChangeOrBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeOrBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeOrBlurBindingBehavior = ValidateOnChangeOrBlurBindingBehavior;
});

define('aurelia-validation/validate-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validation triggers.
     */
    var validateTrigger;
    (function (validateTrigger) {
        /**
         * Manual validation.  Use the controller's `validate()` and  `reset()` methods
         * to validate all bindings.
         */
        validateTrigger[validateTrigger["manual"] = 0] = "manual";
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event.
         */
        validateTrigger[validateTrigger["blur"] = 1] = "blur";
        /**
         * Validate the binding when it updates the model due to a change in the view.
         */
        validateTrigger[validateTrigger["change"] = 2] = "change";
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event and
         * when it updates the model due to a change in the view.
         */
        validateTrigger[validateTrigger["changeOrBlur"] = 3] = "changeOrBlur";
    })(validateTrigger = exports.validateTrigger || (exports.validateTrigger = {}));
    ;
});

define('aurelia-validation/validate-binding-behavior-base',["require", "exports", "aurelia-dependency-injection", "./validation-controller", "./validate-trigger", "./get-target-dom-element"], function (require, exports, aurelia_dependency_injection_1, validation_controller_1, validate_trigger_1, get_target_dom_element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Binding behavior. Indicates the bound property should be validated.
     */
    var ValidateBindingBehaviorBase = (function () {
        function ValidateBindingBehaviorBase(taskQueue) {
            this.taskQueue = taskQueue;
        }
        ValidateBindingBehaviorBase.prototype.bind = function (binding, source, rulesOrController, rules) {
            var _this = this;
            // identify the target element.
            var target = get_target_dom_element_1.getTargetDOMElement(binding, source);
            // locate the controller.
            var controller;
            if (rulesOrController instanceof validation_controller_1.ValidationController) {
                controller = rulesOrController;
            }
            else {
                controller = source.container.get(aurelia_dependency_injection_1.Optional.of(validation_controller_1.ValidationController));
                rules = rulesOrController;
            }
            if (controller === null) {
                throw new Error("A ValidationController has not been registered.");
            }
            controller.registerBinding(binding, target, rules);
            binding.validationController = controller;
            var trigger = this.getValidateTrigger(controller);
            // tslint:disable-next-line:no-bitwise
            if (trigger & validate_trigger_1.validateTrigger.change) {
                binding.standardUpdateSource = binding.updateSource;
                // tslint:disable-next-line:only-arrow-functions
                binding.updateSource = function (value) {
                    this.standardUpdateSource(value);
                    this.validationController.validateBinding(this);
                };
            }
            // tslint:disable-next-line:no-bitwise
            if (trigger & validate_trigger_1.validateTrigger.blur) {
                binding.validateBlurHandler = function () {
                    _this.taskQueue.queueMicroTask(function () { return controller.validateBinding(binding); });
                };
                binding.validateTarget = target;
                target.addEventListener('blur', binding.validateBlurHandler);
            }
            if (trigger !== validate_trigger_1.validateTrigger.manual) {
                binding.standardUpdateTarget = binding.updateTarget;
                // tslint:disable-next-line:only-arrow-functions
                binding.updateTarget = function (value) {
                    this.standardUpdateTarget(value);
                    this.validationController.resetBinding(this);
                };
            }
        };
        ValidateBindingBehaviorBase.prototype.unbind = function (binding) {
            // reset the binding to it's original state.
            if (binding.standardUpdateSource) {
                binding.updateSource = binding.standardUpdateSource;
                binding.standardUpdateSource = null;
            }
            if (binding.standardUpdateTarget) {
                binding.updateTarget = binding.standardUpdateTarget;
                binding.standardUpdateTarget = null;
            }
            if (binding.validateBlurHandler) {
                binding.validateTarget.removeEventListener('blur', binding.validateBlurHandler);
                binding.validateBlurHandler = null;
                binding.validateTarget = null;
            }
            binding.validationController.unregisterBinding(binding);
            binding.validationController = null;
        };
        return ValidateBindingBehaviorBase;
    }());
    exports.ValidateBindingBehaviorBase = ValidateBindingBehaviorBase;
});

define('aurelia-validation/validation-controller',["require", "exports", "./validator", "./validate-trigger", "./property-info", "./validate-result"], function (require, exports, validator_1, validate_trigger_1, property_info_1, validate_result_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Orchestrates validation.
     * Manages a set of bindings, renderers and objects.
     * Exposes the current list of validation results for binding purposes.
     */
    var ValidationController = (function () {
        function ValidationController(validator) {
            this.validator = validator;
            // Registered bindings (via the validate binding behavior)
            this.bindings = new Map();
            // Renderers that have been added to the controller instance.
            this.renderers = [];
            /**
             * Validation results that have been rendered by the controller.
             */
            this.results = [];
            /**
             * Validation errors that have been rendered by the controller.
             */
            this.errors = [];
            /**
             *  Whether the controller is currently validating.
             */
            this.validating = false;
            // Elements related to validation results that have been rendered.
            this.elements = new Map();
            // Objects that have been added to the controller instance (entity-style validation).
            this.objects = new Map();
            /**
             * The trigger that will invoke automatic validation of a property used in a binding.
             */
            this.validateTrigger = validate_trigger_1.validateTrigger.blur;
            // Promise that resolves when validation has completed.
            this.finishValidating = Promise.resolve();
        }
        /**
         * Adds an object to the set of objects that should be validated when validate is called.
         * @param object The object.
         * @param rules Optional. The rules. If rules aren't supplied the Validator implementation will lookup the rules.
         */
        ValidationController.prototype.addObject = function (object, rules) {
            this.objects.set(object, rules);
        };
        /**
         * Removes an object from the set of objects that should be validated when validate is called.
         * @param object The object.
         */
        ValidationController.prototype.removeObject = function (object) {
            this.objects.delete(object);
            this.processResultDelta('reset', this.results.filter(function (result) { return result.object === object; }), []);
        };
        /**
         * Adds and renders an error.
         */
        ValidationController.prototype.addError = function (message, object, propertyName) {
            if (propertyName === void 0) { propertyName = null; }
            var result = new validate_result_1.ValidateResult({}, object, propertyName, false, message);
            this.processResultDelta('validate', [], [result]);
            return result;
        };
        /**
         * Removes and unrenders an error.
         */
        ValidationController.prototype.removeError = function (result) {
            if (this.results.indexOf(result) !== -1) {
                this.processResultDelta('reset', [result], []);
            }
        };
        /**
         * Adds a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.addRenderer = function (renderer) {
            var _this = this;
            this.renderers.push(renderer);
            renderer.render({
                kind: 'validate',
                render: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); }),
                unrender: []
            });
        };
        /**
         * Removes a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.removeRenderer = function (renderer) {
            var _this = this;
            this.renderers.splice(this.renderers.indexOf(renderer), 1);
            renderer.render({
                kind: 'reset',
                render: [],
                unrender: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); })
            });
        };
        /**
         * Registers a binding with the controller.
         * @param binding The binding instance.
         * @param target The DOM element.
         * @param rules (optional) rules associated with the binding. Validator implementation specific.
         */
        ValidationController.prototype.registerBinding = function (binding, target, rules) {
            this.bindings.set(binding, { target: target, rules: rules, propertyInfo: null });
        };
        /**
         * Unregisters a binding with the controller.
         * @param binding The binding instance.
         */
        ValidationController.prototype.unregisterBinding = function (binding) {
            this.resetBinding(binding);
            this.bindings.delete(binding);
        };
        /**
         * Interprets the instruction and returns a predicate that will identify
         * relevant results in the list of rendered validation results.
         */
        ValidationController.prototype.getInstructionPredicate = function (instruction) {
            var _this = this;
            if (instruction) {
                var object_1 = instruction.object, propertyName_1 = instruction.propertyName, rules_1 = instruction.rules;
                var predicate_1;
                if (instruction.propertyName) {
                    predicate_1 = function (x) { return x.object === object_1 && x.propertyName === propertyName_1; };
                }
                else {
                    predicate_1 = function (x) { return x.object === object_1; };
                }
                if (rules_1) {
                    return function (x) { return predicate_1(x) && _this.validator.ruleExists(rules_1, x.rule); };
                }
                return predicate_1;
            }
            else {
                return function () { return true; };
            }
        };
        /**
         * Validates and renders results.
         * @param instruction Optional. Instructions on what to validate. If undefined, all
         * objects and bindings will be validated.
         */
        ValidationController.prototype.validate = function (instruction) {
            var _this = this;
            // Get a function that will process the validation instruction.
            var execute;
            if (instruction) {
                // tslint:disable-next-line:prefer-const
                var object_2 = instruction.object, propertyName_2 = instruction.propertyName, rules_2 = instruction.rules;
                // if rules were not specified, check the object map.
                rules_2 = rules_2 || this.objects.get(object_2);
                // property specified?
                if (instruction.propertyName === undefined) {
                    // validate the specified object.
                    execute = function () { return _this.validator.validateObject(object_2, rules_2); };
                }
                else {
                    // validate the specified property.
                    execute = function () { return _this.validator.validateProperty(object_2, propertyName_2, rules_2); };
                }
            }
            else {
                // validate all objects and bindings.
                execute = function () {
                    var promises = [];
                    for (var _i = 0, _a = Array.from(_this.objects); _i < _a.length; _i++) {
                        var _b = _a[_i], object = _b[0], rules = _b[1];
                        promises.push(_this.validator.validateObject(object, rules));
                    }
                    for (var _c = 0, _d = Array.from(_this.bindings); _c < _d.length; _c++) {
                        var _e = _d[_c], binding = _e[0], rules = _e[1].rules;
                        var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                        if (!propertyInfo || _this.objects.has(propertyInfo.object)) {
                            continue;
                        }
                        promises.push(_this.validator.validateProperty(propertyInfo.object, propertyInfo.propertyName, rules));
                    }
                    return Promise.all(promises).then(function (resultSets) { return resultSets.reduce(function (a, b) { return a.concat(b); }, []); });
                };
            }
            // Wait for any existing validation to finish, execute the instruction, render the results.
            this.validating = true;
            var returnPromise = this.finishValidating
                .then(execute)
                .then(function (newResults) {
                var predicate = _this.getInstructionPredicate(instruction);
                var oldResults = _this.results.filter(predicate);
                _this.processResultDelta('validate', oldResults, newResults);
                if (returnPromise === _this.finishValidating) {
                    _this.validating = false;
                }
                var result = {
                    instruction: instruction,
                    valid: newResults.find(function (x) { return !x.valid; }) === undefined,
                    results: newResults
                };
                return result;
            })
                .catch(function (exception) {
                // recover, to enable subsequent calls to validate()
                _this.validating = false;
                _this.finishValidating = Promise.resolve();
                return Promise.reject(exception);
            });
            this.finishValidating = returnPromise;
            return returnPromise;
        };
        /**
         * Resets any rendered validation results (unrenders).
         * @param instruction Optional. Instructions on what to reset. If unspecified all rendered results
         * will be unrendered.
         */
        ValidationController.prototype.reset = function (instruction) {
            var predicate = this.getInstructionPredicate(instruction);
            var oldResults = this.results.filter(predicate);
            this.processResultDelta('reset', oldResults, []);
        };
        /**
         * Gets the elements associated with an object and propertyName (if any).
         */
        ValidationController.prototype.getAssociatedElements = function (_a) {
            var object = _a.object, propertyName = _a.propertyName;
            var elements = [];
            for (var _i = 0, _b = Array.from(this.bindings); _i < _b.length; _i++) {
                var _c = _b[_i], binding = _c[0], target = _c[1].target;
                var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                if (propertyInfo && propertyInfo.object === object && propertyInfo.propertyName === propertyName) {
                    elements.push(target);
                }
            }
            return elements;
        };
        ValidationController.prototype.processResultDelta = function (kind, oldResults, newResults) {
            // prepare the instruction.
            var instruction = {
                kind: kind,
                render: [],
                unrender: []
            };
            // create a shallow copy of newResults so we can mutate it without causing side-effects.
            newResults = newResults.slice(0);
            var _loop_1 = function (oldResult) {
                // get the elements associated with the old result.
                var elements = this_1.elements.get(oldResult);
                // remove the old result from the element map.
                this_1.elements.delete(oldResult);
                // create the unrender instruction.
                instruction.unrender.push({ result: oldResult, elements: elements });
                // determine if there's a corresponding new result for the old result we are unrendering.
                var newResultIndex = newResults.findIndex(function (x) { return x.rule === oldResult.rule && x.object === oldResult.object && x.propertyName === oldResult.propertyName; });
                if (newResultIndex === -1) {
                    // no corresponding new result... simple remove.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1);
                    if (!oldResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                }
                else {
                    // there is a corresponding new result...
                    var newResult = newResults.splice(newResultIndex, 1)[0];
                    // get the elements that are associated with the new result.
                    var elements_1 = this_1.getAssociatedElements(newResult);
                    this_1.elements.set(newResult, elements_1);
                    // create a render instruction for the new result.
                    instruction.render.push({ result: newResult, elements: elements_1 });
                    // do an in-place replacement of the old result with the new result.
                    // this ensures any repeats bound to this.results will not thrash.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1, newResult);
                    if (!oldResult.valid && newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                    else if (!oldResult.valid && !newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1, newResult);
                    }
                    else if (!newResult.valid) {
                        this_1.errors.push(newResult);
                    }
                }
            };
            var this_1 = this;
            // create unrender instructions from the old results.
            for (var _i = 0, oldResults_1 = oldResults; _i < oldResults_1.length; _i++) {
                var oldResult = oldResults_1[_i];
                _loop_1(oldResult);
            }
            // create render instructions from the remaining new results.
            for (var _a = 0, newResults_1 = newResults; _a < newResults_1.length; _a++) {
                var result = newResults_1[_a];
                var elements = this.getAssociatedElements(result);
                instruction.render.push({ result: result, elements: elements });
                this.elements.set(result, elements);
                this.results.push(result);
                if (!result.valid) {
                    this.errors.push(result);
                }
            }
            // render.
            for (var _b = 0, _c = this.renderers; _b < _c.length; _b++) {
                var renderer = _c[_b];
                renderer.render(instruction);
            }
        };
        /**
         * Validates the property associated with a binding.
         */
        ValidationController.prototype.validateBinding = function (binding) {
            if (!binding.isBound) {
                return;
            }
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            var rules;
            var registeredBinding = this.bindings.get(binding);
            if (registeredBinding) {
                rules = registeredBinding.rules;
                registeredBinding.propertyInfo = propertyInfo;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.validate({ object: object, propertyName: propertyName, rules: rules });
        };
        /**
         * Resets the results for a property associated with a binding.
         */
        ValidationController.prototype.resetBinding = function (binding) {
            var registeredBinding = this.bindings.get(binding);
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            if (!propertyInfo && registeredBinding) {
                propertyInfo = registeredBinding.propertyInfo;
            }
            if (registeredBinding) {
                registeredBinding.propertyInfo = null;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.reset({ object: object, propertyName: propertyName });
        };
        return ValidationController;
    }());
    ValidationController.inject = [validator_1.Validator];
    exports.ValidationController = ValidationController;
});

define('aurelia-validation/validator',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validates objects and properties.
     */
    var Validator = (function () {
        function Validator() {
        }
        return Validator;
    }());
    exports.Validator = Validator;
});

define('aurelia-validation/validate-result',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The result of validating an individual validation rule.
     */
    var ValidateResult = (function () {
        /**
         * @param rule The rule associated with the result. Validator implementation specific.
         * @param object The object that was validated.
         * @param propertyName The name of the property that was validated.
         * @param error The error, if the result is a validation error.
         */
        function ValidateResult(rule, object, propertyName, valid, message) {
            if (message === void 0) { message = null; }
            this.rule = rule;
            this.object = object;
            this.propertyName = propertyName;
            this.valid = valid;
            this.message = message;
            this.id = ValidateResult.nextId++;
        }
        ValidateResult.prototype.toString = function () {
            return this.valid ? 'Valid.' : this.message;
        };
        return ValidateResult;
    }());
    ValidateResult.nextId = 0;
    exports.ValidateResult = ValidateResult;
});

define('aurelia-validation/validation-controller-factory',["require", "exports", "./validation-controller", "./validator"], function (require, exports, validation_controller_1, validator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Creates ValidationController instances.
     */
    var ValidationControllerFactory = (function () {
        function ValidationControllerFactory(container) {
            this.container = container;
        }
        ValidationControllerFactory.get = function (container) {
            return new ValidationControllerFactory(container);
        };
        /**
         * Creates a new controller instance.
         */
        ValidationControllerFactory.prototype.create = function (validator) {
            if (!validator) {
                validator = this.container.get(validator_1.Validator);
            }
            return new validation_controller_1.ValidationController(validator);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.createForCurrentScope = function (validator) {
            var controller = this.create(validator);
            this.container.registerInstance(validation_controller_1.ValidationController, controller);
            return controller;
        };
        return ValidationControllerFactory;
    }());
    exports.ValidationControllerFactory = ValidationControllerFactory;
    ValidationControllerFactory['protocol:aurelia:resolver'] = true;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-validation/validation-errors-custom-attribute',["require", "exports", "aurelia-binding", "aurelia-dependency-injection", "aurelia-templating", "./validation-controller", "aurelia-pal"], function (require, exports, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_templating_1, validation_controller_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationErrorsCustomAttribute = (function () {
        function ValidationErrorsCustomAttribute(boundaryElement, controllerAccessor) {
            this.boundaryElement = boundaryElement;
            this.controllerAccessor = controllerAccessor;
            this.controller = null;
            this.errors = [];
            this.errorsInternal = [];
        }
        ValidationErrorsCustomAttribute.prototype.sort = function () {
            this.errorsInternal.sort(function (a, b) {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                // tslint:disable-next-line:no-bitwise
                return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
            });
        };
        ValidationErrorsCustomAttribute.prototype.interestingElements = function (elements) {
            var _this = this;
            return elements.filter(function (e) { return _this.boundaryElement.contains(e); });
        };
        ValidationErrorsCustomAttribute.prototype.render = function (instruction) {
            var _loop_1 = function (result) {
                var index = this_1.errorsInternal.findIndex(function (x) { return x.error === result; });
                if (index !== -1) {
                    this_1.errorsInternal.splice(index, 1);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var result = _a[_i].result;
                _loop_1(result);
            }
            for (var _b = 0, _c = instruction.render; _b < _c.length; _b++) {
                var _d = _c[_b], result = _d.result, elements = _d.elements;
                if (result.valid) {
                    continue;
                }
                var targets = this.interestingElements(elements);
                if (targets.length) {
                    this.errorsInternal.push({ error: result, targets: targets });
                }
            }
            this.sort();
            this.errors = this.errorsInternal;
        };
        ValidationErrorsCustomAttribute.prototype.bind = function () {
            if (!this.controller) {
                this.controller = this.controllerAccessor();
            }
            // this will call render() with the side-effect of updating this.errors
            this.controller.addRenderer(this);
        };
        ValidationErrorsCustomAttribute.prototype.unbind = function () {
            if (this.controller) {
                this.controller.removeRenderer(this);
            }
        };
        return ValidationErrorsCustomAttribute;
    }());
    ValidationErrorsCustomAttribute.inject = [aurelia_pal_1.DOM.Element, aurelia_dependency_injection_1.Lazy.of(validation_controller_1.ValidationController)];
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], ValidationErrorsCustomAttribute.prototype, "controller", void 0);
    __decorate([
        aurelia_templating_1.bindable({ primaryProperty: true, defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], ValidationErrorsCustomAttribute.prototype, "errors", void 0);
    ValidationErrorsCustomAttribute = __decorate([
        aurelia_templating_1.customAttribute('validation-errors')
    ], ValidationErrorsCustomAttribute);
    exports.ValidationErrorsCustomAttribute = ValidationErrorsCustomAttribute;
});

define('aurelia-validation/validation-renderer-custom-attribute',["require", "exports", "./validation-controller"], function (require, exports, validation_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationRendererCustomAttribute = (function () {
        function ValidationRendererCustomAttribute() {
        }
        ValidationRendererCustomAttribute.prototype.created = function (view) {
            this.container = view.container;
        };
        ValidationRendererCustomAttribute.prototype.bind = function () {
            this.controller = this.container.get(validation_controller_1.ValidationController);
            this.renderer = this.container.get(this.value);
            this.controller.addRenderer(this.renderer);
        };
        ValidationRendererCustomAttribute.prototype.unbind = function () {
            this.controller.removeRenderer(this.renderer);
            this.controller = null;
            this.renderer = null;
        };
        return ValidationRendererCustomAttribute;
    }());
    exports.ValidationRendererCustomAttribute = ValidationRendererCustomAttribute;
});

define('aurelia-validation/implementation/rules',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Sets, unsets and retrieves rules on an object or constructor function.
     */
    var Rules = (function () {
        function Rules() {
        }
        /**
         * Applies the rules to a target.
         */
        Rules.set = function (target, rules) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            Object.defineProperty(target, Rules.key, { enumerable: false, configurable: false, writable: true, value: rules });
        };
        /**
         * Removes rules from a target.
         */
        Rules.unset = function (target) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            target[Rules.key] = null;
        };
        /**
         * Retrieves the target's rules.
         */
        Rules.get = function (target) {
            return target[Rules.key] || null;
        };
        return Rules;
    }());
    /**
     * The name of the property that stores the rules.
     */
    Rules.key = '__rules__';
    exports.Rules = Rules;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/implementation/standard-validator',["require", "exports", "aurelia-templating", "../validator", "../validate-result", "./rules", "./validation-messages"], function (require, exports, aurelia_templating_1, validator_1, validate_result_1, rules_1, validation_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var StandardValidator = (function (_super) {
        __extends(StandardValidator, _super);
        function StandardValidator(messageProvider, resources) {
            var _this = _super.call(this) || this;
            _this.messageProvider = messageProvider;
            _this.lookupFunctions = resources.lookupFunctions;
            _this.getDisplayName = messageProvider.getDisplayName.bind(messageProvider);
            return _this;
        }
        /**
         * Validates the specified property.
         * @param object The object to validate.
         * @param propertyName The name of the property to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateProperty = function (object, propertyName, rules) {
            return this.validate(object, propertyName, rules || null);
        };
        /**
         * Validates all rules for specified object and it's properties.
         * @param object The object to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateObject = function (object, rules) {
            return this.validate(object, null, rules || null);
        };
        /**
         * Determines whether a rule exists in a set of rules.
         * @param rules The rules to search.
         * @parem rule The rule to find.
         */
        StandardValidator.prototype.ruleExists = function (rules, rule) {
            var i = rules.length;
            while (i--) {
                if (rules[i].indexOf(rule) !== -1) {
                    return true;
                }
            }
            return false;
        };
        StandardValidator.prototype.getMessage = function (rule, object, value) {
            var expression = rule.message || this.messageProvider.getMessage(rule.messageKey);
            // tslint:disable-next-line:prefer-const
            var _a = rule.property, propertyName = _a.name, displayName = _a.displayName;
            if (propertyName !== null) {
                displayName = this.messageProvider.getDisplayName(propertyName, displayName);
            }
            var overrideContext = {
                $displayName: displayName,
                $propertyName: propertyName,
                $value: value,
                $object: object,
                $config: rule.config,
                // returns the name of a given property, given just the property name (irrespective of the property's displayName)
                // split on capital letters, first letter ensured to be capitalized
                $getDisplayName: this.getDisplayName
            };
            return expression.evaluate({ bindingContext: object, overrideContext: overrideContext }, this.lookupFunctions);
        };
        StandardValidator.prototype.validateRuleSequence = function (object, propertyName, ruleSequence, sequence, results) {
            var _this = this;
            // are we validating all properties or a single property?
            var validateAllProperties = propertyName === null || propertyName === undefined;
            var rules = ruleSequence[sequence];
            var allValid = true;
            // validate each rule.
            var promises = [];
            var _loop_1 = function (i) {
                var rule = rules[i];
                // is the rule related to the property we're validating.
                if (!validateAllProperties && rule.property.name !== propertyName) {
                    return "continue";
                }
                // is this a conditional rule? is the condition met?
                if (rule.when && !rule.when(object)) {
                    return "continue";
                }
                // validate.
                var value = rule.property.name === null ? object : object[rule.property.name];
                var promiseOrBoolean = rule.condition(value, object);
                if (!(promiseOrBoolean instanceof Promise)) {
                    promiseOrBoolean = Promise.resolve(promiseOrBoolean);
                }
                promises.push(promiseOrBoolean.then(function (valid) {
                    var message = valid ? null : _this.getMessage(rule, object, value);
                    results.push(new validate_result_1.ValidateResult(rule, object, rule.property.name, valid, message));
                    allValid = allValid && valid;
                    return valid;
                }));
            };
            for (var i = 0; i < rules.length; i++) {
                _loop_1(i);
            }
            return Promise.all(promises)
                .then(function () {
                sequence++;
                if (allValid && sequence < ruleSequence.length) {
                    return _this.validateRuleSequence(object, propertyName, ruleSequence, sequence, results);
                }
                return results;
            });
        };
        StandardValidator.prototype.validate = function (object, propertyName, rules) {
            // rules specified?
            if (!rules) {
                // no. attempt to locate the rules.
                rules = rules_1.Rules.get(object);
            }
            // any rules?
            if (!rules) {
                return Promise.resolve([]);
            }
            return this.validateRuleSequence(object, propertyName, rules, 0, []);
        };
        return StandardValidator;
    }(validator_1.Validator));
    StandardValidator.inject = [validation_messages_1.ValidationMessageProvider, aurelia_templating_1.ViewResources];
    exports.StandardValidator = StandardValidator;
});

define('aurelia-validation/implementation/validation-messages',["require", "exports", "./validation-parser"], function (require, exports, validation_parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Dictionary of validation messages. [messageKey]: messageExpression
     */
    exports.validationMessages = {
        /**
         * The default validation message. Used with rules that have no standard message.
         */
        default: "${$displayName} is invalid.",
        required: "${$displayName} is required.",
        matches: "${$displayName} is not correctly formatted.",
        email: "${$displayName} is not a valid email.",
        minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        equals: "${$displayName} must be ${$config.expectedValue}.",
    };
    /**
     * Retrieves validation messages and property display names.
     */
    var ValidationMessageProvider = (function () {
        function ValidationMessageProvider(parser) {
            this.parser = parser;
        }
        /**
         * Returns a message binding expression that corresponds to the key.
         * @param key The message key.
         */
        ValidationMessageProvider.prototype.getMessage = function (key) {
            var message;
            if (key in exports.validationMessages) {
                message = exports.validationMessages[key];
            }
            else {
                message = exports.validationMessages['default'];
            }
            return this.parser.parseMessage(message);
        };
        /**
         * Formulates a property display name using the property name and the configured
         * displayName (if provided).
         * Override this with your own custom logic.
         * @param propertyName The property name.
         */
        ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
            if (displayName !== null && displayName !== undefined) {
                return (displayName instanceof Function) ? displayName() : displayName;
            }
            // split on upper-case letters.
            var words = propertyName.split(/(?=[A-Z])/).join(' ');
            // capitalize first letter.
            return words.charAt(0).toUpperCase() + words.slice(1);
        };
        return ValidationMessageProvider;
    }());
    ValidationMessageProvider.inject = [validation_parser_1.ValidationParser];
    exports.ValidationMessageProvider = ValidationMessageProvider;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/implementation/validation-parser',["require", "exports", "aurelia-binding", "aurelia-templating", "./util", "aurelia-logging"], function (require, exports, aurelia_binding_1, aurelia_templating_1, util_1, LogManager) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationParser = (function () {
        function ValidationParser(parser, bindinqLanguage) {
            this.parser = parser;
            this.bindinqLanguage = bindinqLanguage;
            this.emptyStringExpression = new aurelia_binding_1.LiteralString('');
            this.nullExpression = new aurelia_binding_1.LiteralPrimitive(null);
            this.undefinedExpression = new aurelia_binding_1.LiteralPrimitive(undefined);
            this.cache = {};
        }
        ValidationParser.prototype.parseMessage = function (message) {
            if (this.cache[message] !== undefined) {
                return this.cache[message];
            }
            var parts = this.bindinqLanguage.parseInterpolation(null, message);
            if (parts === null) {
                return new aurelia_binding_1.LiteralString(message);
            }
            var expression = new aurelia_binding_1.LiteralString(parts[0]);
            for (var i = 1; i < parts.length; i += 2) {
                expression = new aurelia_binding_1.Binary('+', expression, new aurelia_binding_1.Binary('+', this.coalesce(parts[i]), new aurelia_binding_1.LiteralString(parts[i + 1])));
            }
            MessageExpressionValidator.validate(expression, message);
            this.cache[message] = expression;
            return expression;
        };
        ValidationParser.prototype.parseProperty = function (property) {
            if (util_1.isString(property)) {
                return { name: property, displayName: null };
            }
            var accessor = this.getAccessorExpression(property.toString());
            if (accessor instanceof aurelia_binding_1.AccessScope
                || accessor instanceof aurelia_binding_1.AccessMember && accessor.object instanceof aurelia_binding_1.AccessScope) {
                return {
                    name: accessor.name,
                    displayName: null
                };
            }
            throw new Error("Invalid subject: \"" + accessor + "\"");
        };
        ValidationParser.prototype.coalesce = function (part) {
            // part === null || part === undefined ? '' : part
            return new aurelia_binding_1.Conditional(new aurelia_binding_1.Binary('||', new aurelia_binding_1.Binary('===', part, this.nullExpression), new aurelia_binding_1.Binary('===', part, this.undefinedExpression)), this.emptyStringExpression, new aurelia_binding_1.CallMember(part, 'toString', []));
        };
        ValidationParser.prototype.getAccessorExpression = function (fn) {
            /* tslint:disable:max-line-length */
            var classic = /^function\s*\([$_\w\d]+\)\s*\{(?:\s*"use strict";)?\s*(?:[$_\w\d.['"\]+;]+)?\s*return\s+[$_\w\d]+\.([$_\w\d]+)\s*;?\s*\}$/;
            /* tslint:enable:max-line-length */
            var arrow = /^\(?[$_\w\d]+\)?\s*=>\s*[$_\w\d]+\.([$_\w\d]+)$/;
            var match = classic.exec(fn) || arrow.exec(fn);
            if (match === null) {
                throw new Error("Unable to parse accessor function:\n" + fn);
            }
            return this.parser.parse(match[1]);
        };
        return ValidationParser;
    }());
    ValidationParser.inject = [aurelia_binding_1.Parser, aurelia_templating_1.BindingLanguage];
    exports.ValidationParser = ValidationParser;
    var MessageExpressionValidator = (function (_super) {
        __extends(MessageExpressionValidator, _super);
        function MessageExpressionValidator(originalMessage) {
            var _this = _super.call(this, []) || this;
            _this.originalMessage = originalMessage;
            return _this;
        }
        MessageExpressionValidator.validate = function (expression, originalMessage) {
            var visitor = new MessageExpressionValidator(originalMessage);
            expression.accept(visitor);
        };
        MessageExpressionValidator.prototype.visitAccessScope = function (access) {
            if (access.ancestor !== 0) {
                throw new Error('$parent is not permitted in validation message expressions.');
            }
            if (['displayName', 'propertyName', 'value', 'object', 'config', 'getDisplayName'].indexOf(access.name) !== -1) {
                LogManager.getLogger('aurelia-validation')
                    .warn("Did you mean to use \"$" + access.name + "\" instead of \"" + access.name + "\" in this validation message template: \"" + this.originalMessage + "\"?");
            }
        };
        return MessageExpressionValidator;
    }(aurelia_binding_1.Unparser));
    exports.MessageExpressionValidator = MessageExpressionValidator;
});

define('aurelia-validation/implementation/util',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    exports.isString = isString;
});

define('aurelia-validation/implementation/validation-rules',["require", "exports", "./util", "./rules", "./validation-messages"], function (require, exports, util_1, rules_1, validation_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Part of the fluent rule API. Enables customizing property rules.
     */
    var FluentRuleCustomizer = (function () {
        function FluentRuleCustomizer(property, condition, config, fluentEnsure, fluentRules, parser) {
            if (config === void 0) { config = {}; }
            this.fluentEnsure = fluentEnsure;
            this.fluentRules = fluentRules;
            this.parser = parser;
            this.rule = {
                property: property,
                condition: condition,
                config: config,
                when: null,
                messageKey: 'default',
                message: null,
                sequence: fluentRules.sequence
            };
            this.fluentEnsure._addRule(this.rule);
        }
        /**
         * Validate subsequent rules after previously declared rules have
         * been validated successfully. Use to postpone validation of costly
         * rules until less expensive rules pass validation.
         */
        FluentRuleCustomizer.prototype.then = function () {
            this.fluentRules.sequence++;
            return this;
        };
        /**
         * Specifies the key to use when looking up the rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessageKey = function (key) {
            this.rule.messageKey = key;
            this.rule.message = null;
            return this;
        };
        /**
         * Specifies rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessage = function (message) {
            this.rule.messageKey = 'custom';
            this.rule.message = this.parser.parseMessage(message);
            return this;
        };
        /**
         * Specifies a condition that must be met before attempting to validate the rule.
         * @param condition A function that accepts the object as a parameter and returns true
         * or false whether the rule should be evaluated.
         */
        FluentRuleCustomizer.prototype.when = function (condition) {
            this.rule.when = condition;
            return this;
        };
        /**
         * Tags the rule instance, enabling the rule to be found easily
         * using ValidationRules.taggedRules(rules, tag)
         */
        FluentRuleCustomizer.prototype.tag = function (tag) {
            this.rule.tag = tag;
            return this;
        };
        ///// FluentEnsure APIs /////
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentRuleCustomizer.prototype.ensure = function (subject) {
            return this.fluentEnsure.ensure(subject);
        };
        /**
         * Targets an object with validation rules.
         */
        FluentRuleCustomizer.prototype.ensureObject = function () {
            return this.fluentEnsure.ensureObject();
        };
        Object.defineProperty(FluentRuleCustomizer.prototype, "rules", {
            /**
             * Rules that have been defined using the fluent API.
             */
            get: function () {
                return this.fluentEnsure.rules;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentRuleCustomizer.prototype.on = function (target) {
            return this.fluentEnsure.on(target);
        };
        ///////// FluentRules APIs /////////
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRuleCustomizer.prototype.satisfies = function (condition, config) {
            return this.fluentRules.satisfies(condition, config);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRuleCustomizer.prototype.satisfiesRule = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.fluentRules).satisfiesRule.apply(_a, [name].concat(args));
            var _a;
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRuleCustomizer.prototype.required = function () {
            return this.fluentRules.required();
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.matches = function (regex) {
            return this.fluentRules.matches(regex);
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.email = function () {
            return this.fluentRules.email();
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.minLength = function (length) {
            return this.fluentRules.minLength(length);
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxLength = function (length) {
            return this.fluentRules.maxLength(length);
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.minItems = function (count) {
            return this.fluentRules.minItems(count);
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxItems = function (count) {
            return this.fluentRules.maxItems(count);
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.equals = function (expectedValue) {
            return this.fluentRules.equals(expectedValue);
        };
        return FluentRuleCustomizer;
    }());
    exports.FluentRuleCustomizer = FluentRuleCustomizer;
    /**
     * Part of the fluent rule API. Enables applying rules to properties and objects.
     */
    var FluentRules = (function () {
        function FluentRules(fluentEnsure, parser, property) {
            this.fluentEnsure = fluentEnsure;
            this.parser = parser;
            this.property = property;
            /**
             * Current rule sequence number. Used to postpone evaluation of rules until rules
             * with lower sequence number have successfully validated. The "then" fluent API method
             * manages this property, there's usually no need to set it directly.
             */
            this.sequence = 0;
        }
        /**
         * Sets the display name of the ensured property.
         */
        FluentRules.prototype.displayName = function (name) {
            this.property.displayName = name;
            return this;
        };
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRules.prototype.satisfies = function (condition, config) {
            return new FluentRuleCustomizer(this.property, condition, config, this.fluentEnsure, this, this.parser);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRules.prototype.satisfiesRule = function (name) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var rule = FluentRules.customRules[name];
            if (!rule) {
                // standard rule?
                rule = this[name];
                if (rule instanceof Function) {
                    return rule.call.apply(rule, [this].concat(args));
                }
                throw new Error("Rule with name \"" + name + "\" does not exist.");
            }
            var config = rule.argsToConfig ? rule.argsToConfig.apply(rule, args) : undefined;
            return this.satisfies(function (value, obj) {
                return (_a = rule.condition).call.apply(_a, [_this, value, obj].concat(args));
                var _a;
            }, config)
                .withMessageKey(name);
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRules.prototype.required = function () {
            return this.satisfies(function (value) {
                return value !== null
                    && value !== undefined
                    && !(util_1.isString(value) && !/\S/.test(value));
            }).withMessageKey('required');
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.matches = function (regex) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || regex.test(value); })
                .withMessageKey('matches');
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.email = function () {
            // regex from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            /* tslint:disable:max-line-length */
            return this.matches(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                .withMessageKey('email');
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.minLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length >= length; }, { length: length })
                .withMessageKey('minLength');
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.maxLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length <= length; }, { length: length })
                .withMessageKey('maxLength');
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.minItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length >= count; }, { count: count })
                .withMessageKey('minItems');
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.maxItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length <= count; }, { count: count })
                .withMessageKey('maxItems');
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.equals = function (expectedValue) {
            return this.satisfies(function (value) { return value === null || value === undefined || value === '' || value === expectedValue; }, { expectedValue: expectedValue })
                .withMessageKey('equals');
        };
        return FluentRules;
    }());
    FluentRules.customRules = {};
    exports.FluentRules = FluentRules;
    /**
     * Part of the fluent rule API. Enables targeting properties and objects with rules.
     */
    var FluentEnsure = (function () {
        function FluentEnsure(parser) {
            this.parser = parser;
            /**
             * Rules that have been defined using the fluent API.
             */
            this.rules = [];
        }
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor
         * function.
         */
        FluentEnsure.prototype.ensure = function (property) {
            this.assertInitialized();
            return new FluentRules(this, this.parser, this.parser.parseProperty(property));
        };
        /**
         * Targets an object with validation rules.
         */
        FluentEnsure.prototype.ensureObject = function () {
            this.assertInitialized();
            return new FluentRules(this, this.parser, { name: null, displayName: null });
        };
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentEnsure.prototype.on = function (target) {
            rules_1.Rules.set(target, this.rules);
            return this;
        };
        /**
         * Adds a rule definition to the sequenced ruleset.
         * @internal
         */
        FluentEnsure.prototype._addRule = function (rule) {
            while (this.rules.length < rule.sequence + 1) {
                this.rules.push([]);
            }
            this.rules[rule.sequence].push(rule);
        };
        FluentEnsure.prototype.assertInitialized = function () {
            if (this.parser) {
                return;
            }
            throw new Error("Did you forget to add \".plugin('aurelia-validation')\" to your main.js?");
        };
        return FluentEnsure;
    }());
    exports.FluentEnsure = FluentEnsure;
    /**
     * Fluent rule definition API.
     */
    var ValidationRules = (function () {
        function ValidationRules() {
        }
        ValidationRules.initialize = function (parser) {
            ValidationRules.parser = parser;
        };
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        ValidationRules.ensure = function (property) {
            return new FluentEnsure(ValidationRules.parser).ensure(property);
        };
        /**
         * Targets an object with validation rules.
         */
        ValidationRules.ensureObject = function () {
            return new FluentEnsure(ValidationRules.parser).ensureObject();
        };
        /**
         * Defines a custom rule.
         * @param name The name of the custom rule. Also serves as the message key.
         * @param condition The rule function.
         * @param message The message expression
         * @param argsToConfig A function that maps the rule's arguments to a "config"
         * object that can be used when evaluating the message expression.
         */
        ValidationRules.customRule = function (name, condition, message, argsToConfig) {
            validation_messages_1.validationMessages[name] = message;
            FluentRules.customRules[name] = { condition: condition, argsToConfig: argsToConfig };
        };
        /**
         * Returns rules with the matching tag.
         * @param rules The rules to search.
         * @param tag The tag to search for.
         */
        ValidationRules.taggedRules = function (rules, tag) {
            return rules.map(function (x) { return x.filter(function (r) { return r.tag === tag; }); });
        };
        /**
         * Removes the rules from a class or object.
         * @param target A class or object.
         */
        ValidationRules.off = function (target) {
            rules_1.Rules.unset(target);
        };
        return ValidationRules;
    }());
    exports.ValidationRules = ValidationRules;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n\n  <nav>\n    <ul>\n      <li repeat.for=\"row of router.navigation\">\n        <a href.bind=\"row.href\">${row.title}</a>\n      </li>\n    <ul>\n  </nav>\n\n  <router-view></router-view>\n</template>\n"; });
define('text!components/spinner/spinner.css', ['module'], function(module) { module.exports = "/* spinner-circles */\r\n.spinner-circles {\r\n  width: 40px;\r\n  height: 40px;\r\n\r\n  position: relative;\r\n  margin: 100px auto;\r\n}\r\n\r\n.double-bounce1, .double-bounce2 {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 50%;\r\n  background-color: #fff;\r\n  opacity: 0.6;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n\r\n  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\r\n  animation: sk-bounce 2.0s infinite ease-in-out;\r\n}\r\n\r\n.double-bounce2 {\r\n  -webkit-animation-delay: -1.0s;\r\n  animation-delay: -1.0s;\r\n}\r\n\r\n@-webkit-keyframes sk-bounce {\r\n  0%, 100% { -webkit-transform: scale(0.0) }\r\n  50% { -webkit-transform: scale(1.0) }\r\n}\r\n\r\n@keyframes sk-bounce {\r\n  0%, 100% {\r\n    transform: scale(0.0);\r\n    -webkit-transform: scale(0.0);\r\n  } 50% {\r\n      transform: scale(1.0);\r\n      -webkit-transform: scale(1.0);\r\n    }\r\n}\r\n\r\n\r\n/* folding-cube */\r\n.sk-folding-cube {\r\n  margin: 20px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n  -webkit-transform: rotateZ(45deg);\r\n          transform: rotateZ(45deg);\r\n}\r\n\r\n.sk-folding-cube .sk-cube {\r\n  float: left;\r\n  width: 50%;\r\n  height: 50%;\r\n  position: relative;\r\n  -webkit-transform: scale(1.1);\r\n      -ms-transform: scale(1.1);\r\n          transform: scale(1.1); \r\n}\r\n.sk-folding-cube .sk-cube:before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: #fff;\r\n  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;\r\n          animation: sk-foldCubeAngle 2.4s infinite linear both;\r\n  -webkit-transform-origin: 100% 100%;\r\n      -ms-transform-origin: 100% 100%;\r\n          transform-origin: 100% 100%;\r\n}\r\n.sk-folding-cube .sk-cube2 {\r\n  -webkit-transform: scale(1.1) rotateZ(90deg);\r\n          transform: scale(1.1) rotateZ(90deg);\r\n}\r\n.sk-folding-cube .sk-cube3 {\r\n  -webkit-transform: scale(1.1) rotateZ(180deg);\r\n          transform: scale(1.1) rotateZ(180deg);\r\n}\r\n.sk-folding-cube .sk-cube4 {\r\n  -webkit-transform: scale(1.1) rotateZ(270deg);\r\n          transform: scale(1.1) rotateZ(270deg);\r\n}\r\n.sk-folding-cube .sk-cube2:before {\r\n  -webkit-animation-delay: 0.3s;\r\n          animation-delay: 0.3s;\r\n}\r\n.sk-folding-cube .sk-cube3:before {\r\n  -webkit-animation-delay: 0.6s;\r\n          animation-delay: 0.6s; \r\n}\r\n.sk-folding-cube .sk-cube4:before {\r\n  -webkit-animation-delay: 0.9s;\r\n          animation-delay: 0.9s;\r\n}\r\n@-webkit-keyframes sk-foldCubeAngle {\r\n  0%, 10% {\r\n    -webkit-transform: perspective(140px) rotateX(-180deg);\r\n            transform: perspective(140px) rotateX(-180deg);\r\n    opacity: 0; \r\n  } 25%, 75% {\r\n    -webkit-transform: perspective(140px) rotateX(0deg);\r\n            transform: perspective(140px) rotateX(0deg);\r\n    opacity: 1; \r\n  } 90%, 100% {\r\n    -webkit-transform: perspective(140px) rotateY(180deg);\r\n            transform: perspective(140px) rotateY(180deg);\r\n    opacity: 0; \r\n  } \r\n}\r\n\r\n@keyframes sk-foldCubeAngle {\r\n  0%, 10% {\r\n    -webkit-transform: perspective(140px) rotateX(-180deg);\r\n            transform: perspective(140px) rotateX(-180deg);\r\n    opacity: 0; \r\n  } 25%, 75% {\r\n    -webkit-transform: perspective(140px) rotateX(0deg);\r\n            transform: perspective(140px) rotateX(0deg);\r\n    opacity: 1; \r\n  } 90%, 100% {\r\n    -webkit-transform: perspective(140px) rotateY(180deg);\r\n            transform: perspective(140px) rotateY(180deg);\r\n    opacity: 0; \r\n  }\r\n}\r\n\r\n\r\n/* cube-grid */\r\n.sk-cube-grid {\r\n  width: 40px;\r\n  height: 40px;\r\n  margin: 100px auto;\r\n}\r\n\r\n.sk-cube-grid .sk-cube {\r\n  width: 33%;\r\n  height: 33%;\r\n  background-color: #fff;\r\n  float: left;\r\n  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\r\n          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; \r\n}\r\n.sk-cube-grid .sk-cube1 {\r\n  -webkit-animation-delay: 0.2s;\r\n          animation-delay: 0.2s; }\r\n.sk-cube-grid .sk-cube2 {\r\n  -webkit-animation-delay: 0.3s;\r\n          animation-delay: 0.3s; }\r\n.sk-cube-grid .sk-cube3 {\r\n  -webkit-animation-delay: 0.4s;\r\n          animation-delay: 0.4s; }\r\n.sk-cube-grid .sk-cube4 {\r\n  -webkit-animation-delay: 0.1s;\r\n          animation-delay: 0.1s; }\r\n.sk-cube-grid .sk-cube5 {\r\n  -webkit-animation-delay: 0.2s;\r\n          animation-delay: 0.2s; }\r\n.sk-cube-grid .sk-cube6 {\r\n  -webkit-animation-delay: 0.3s;\r\n          animation-delay: 0.3s; }\r\n.sk-cube-grid .sk-cube7 {\r\n  -webkit-animation-delay: 0s;\r\n          animation-delay: 0s; }\r\n.sk-cube-grid .sk-cube8 {\r\n  -webkit-animation-delay: 0.1s;\r\n          animation-delay: 0.1s; }\r\n.sk-cube-grid .sk-cube9 {\r\n  -webkit-animation-delay: 0.2s;\r\n          animation-delay: 0.2s; }\r\n\r\n@-webkit-keyframes sk-cubeGridScaleDelay {\r\n  0%, 70%, 100% {\r\n    -webkit-transform: scale3D(1, 1, 1);\r\n            transform: scale3D(1, 1, 1);\r\n  } 35% {\r\n    -webkit-transform: scale3D(0, 0, 1);\r\n            transform: scale3D(0, 0, 1); \r\n  }\r\n}\r\n\r\n@keyframes sk-cubeGridScaleDelay {\r\n  0%, 70%, 100% {\r\n    -webkit-transform: scale3D(1, 1, 1);\r\n            transform: scale3D(1, 1, 1);\r\n  } 35% {\r\n    -webkit-transform: scale3D(0, 0, 1);\r\n            transform: scale3D(0, 0, 1);\r\n  } \r\n}\r\n\r\n\r\n/* circle */\r\n.sk-circle {\r\n  margin: 100px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n}\r\n.sk-circle .sk-child {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n.sk-circle .sk-child:before {\r\n  content: '';\r\n  display: block;\r\n  margin: 0 auto;\r\n  width: 15%;\r\n  height: 15%;\r\n  background-color: #fff;\r\n  border-radius: 100%;\r\n  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\r\n          animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\r\n}\r\n.sk-circle .sk-circle2 {\r\n  -webkit-transform: rotate(30deg);\r\n      -ms-transform: rotate(30deg);\r\n          transform: rotate(30deg); }\r\n.sk-circle .sk-circle3 {\r\n  -webkit-transform: rotate(60deg);\r\n      -ms-transform: rotate(60deg);\r\n          transform: rotate(60deg); }\r\n.sk-circle .sk-circle4 {\r\n  -webkit-transform: rotate(90deg);\r\n      -ms-transform: rotate(90deg);\r\n          transform: rotate(90deg); }\r\n.sk-circle .sk-circle5 {\r\n  -webkit-transform: rotate(120deg);\r\n      -ms-transform: rotate(120deg);\r\n          transform: rotate(120deg); }\r\n.sk-circle .sk-circle6 {\r\n  -webkit-transform: rotate(150deg);\r\n      -ms-transform: rotate(150deg);\r\n          transform: rotate(150deg); }\r\n.sk-circle .sk-circle7 {\r\n  -webkit-transform: rotate(180deg);\r\n      -ms-transform: rotate(180deg);\r\n          transform: rotate(180deg); }\r\n.sk-circle .sk-circle8 {\r\n  -webkit-transform: rotate(210deg);\r\n      -ms-transform: rotate(210deg);\r\n          transform: rotate(210deg); }\r\n.sk-circle .sk-circle9 {\r\n  -webkit-transform: rotate(240deg);\r\n      -ms-transform: rotate(240deg);\r\n          transform: rotate(240deg); }\r\n.sk-circle .sk-circle10 {\r\n  -webkit-transform: rotate(270deg);\r\n      -ms-transform: rotate(270deg);\r\n          transform: rotate(270deg); }\r\n.sk-circle .sk-circle11 {\r\n  -webkit-transform: rotate(300deg);\r\n      -ms-transform: rotate(300deg);\r\n          transform: rotate(300deg); }\r\n.sk-circle .sk-circle12 {\r\n  -webkit-transform: rotate(330deg);\r\n      -ms-transform: rotate(330deg);\r\n          transform: rotate(330deg); }\r\n.sk-circle .sk-circle2:before {\r\n  -webkit-animation-delay: -1.1s;\r\n          animation-delay: -1.1s; }\r\n.sk-circle .sk-circle3:before {\r\n  -webkit-animation-delay: -1s;\r\n          animation-delay: -1s; }\r\n.sk-circle .sk-circle4:before {\r\n  -webkit-animation-delay: -0.9s;\r\n          animation-delay: -0.9s; }\r\n.sk-circle .sk-circle5:before {\r\n  -webkit-animation-delay: -0.8s;\r\n          animation-delay: -0.8s; }\r\n.sk-circle .sk-circle6:before {\r\n  -webkit-animation-delay: -0.7s;\r\n          animation-delay: -0.7s; }\r\n.sk-circle .sk-circle7:before {\r\n  -webkit-animation-delay: -0.6s;\r\n          animation-delay: -0.6s; }\r\n.sk-circle .sk-circle8:before {\r\n  -webkit-animation-delay: -0.5s;\r\n          animation-delay: -0.5s; }\r\n.sk-circle .sk-circle9:before {\r\n  -webkit-animation-delay: -0.4s;\r\n          animation-delay: -0.4s; }\r\n.sk-circle .sk-circle10:before {\r\n  -webkit-animation-delay: -0.3s;\r\n          animation-delay: -0.3s; }\r\n.sk-circle .sk-circle11:before {\r\n  -webkit-animation-delay: -0.2s;\r\n          animation-delay: -0.2s; }\r\n.sk-circle .sk-circle12:before {\r\n  -webkit-animation-delay: -0.1s;\r\n          animation-delay: -0.1s; }\r\n\r\n@-webkit-keyframes sk-circleBounceDelay {\r\n  0%, 80%, 100% {\r\n    -webkit-transform: scale(0);\r\n            transform: scale(0);\r\n  } 40% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes sk-circleBounceDelay {\r\n  0%, 80%, 100% {\r\n    -webkit-transform: scale(0);\r\n            transform: scale(0);\r\n  } 40% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n\r\n/* spinner-rects */\r\n.spinner-rects {\r\n  margin: 100px auto;\r\n  width: 50px;\r\n  height: 40px;\r\n  text-align: center;\r\n  font-size: 10px;\r\n}\r\n\r\n.spinner-rects > div {\r\n  background-color: #fff;\r\n  height: 100%;\r\n  width: 6px;\r\n  display: inline-block;\r\n  \r\n  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\r\n  animation: sk-stretchdelay 1.2s infinite ease-in-out;\r\n}\r\n\r\n.spinner-rects .rect2 {\r\n  -webkit-animation-delay: -1.1s;\r\n  animation-delay: -1.1s;\r\n}\r\n\r\n.spinner-rects .rect3 {\r\n  -webkit-animation-delay: -1.0s;\r\n  animation-delay: -1.0s;\r\n}\r\n\r\n.spinner-rects .rect4 {\r\n  -webkit-animation-delay: -0.9s;\r\n  animation-delay: -0.9s;\r\n}\r\n\r\n.spinner-rects .rect5 {\r\n  -webkit-animation-delay: -0.8s;\r\n  animation-delay: -0.8s;\r\n}\r\n\r\n@-webkit-keyframes sk-stretchdelay {\r\n  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  \r\n  20% { -webkit-transform: scaleY(1.0) }\r\n}\r\n\r\n@keyframes sk-stretchdelay {\r\n  0%, 40%, 100% { \r\n    transform: scaleY(0.4);\r\n    -webkit-transform: scaleY(0.4);\r\n  }  20% { \r\n    transform: scaleY(1.0);\r\n    -webkit-transform: scaleY(1.0);\r\n  }\r\n}\r\n\r\n/* spinner-cubes */\r\n.spinner-cubes {\r\n  margin: 100px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n}\r\n\r\n.cube1, .cube2 {\r\n  background-color: #fff;\r\n  width: 15px;\r\n  height: 15px;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  \r\n  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\r\n  animation: sk-cubemove 1.8s infinite ease-in-out;\r\n}\r\n\r\n.cube2 {\r\n  -webkit-animation-delay: -0.9s;\r\n  animation-delay: -0.9s;\r\n}\r\n\r\n@-webkit-keyframes sk-cubemove {\r\n  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }\r\n  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }\r\n  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }\r\n  100% { -webkit-transform: rotate(-360deg) }\r\n}\r\n\r\n@keyframes sk-cubemove {\r\n  25% { \r\n    transform: translateX(42px) rotate(-90deg) scale(0.5);\r\n    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\r\n  } 50% { \r\n    transform: translateX(42px) translateY(42px) rotate(-179deg);\r\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\r\n  } 50.1% { \r\n    transform: translateX(42px) translateY(42px) rotate(-180deg);\r\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\r\n  } 75% { \r\n    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\r\n    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\r\n  } 100% { \r\n    transform: rotate(-360deg);\r\n    -webkit-transform: rotate(-360deg);\r\n  }\r\n}\r\n\r\n\r\n/* spinner-scaleout */\r\n\r\n.spinner-scaleout {\r\n  width: 40px;\r\n  height: 40px;\r\n  margin: 100px auto;\r\n  background-color: #fff;\r\n\r\n  border-radius: 100%;  \r\n  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\r\n  animation: sk-scaleout 1.0s infinite ease-in-out;\r\n}\r\n\r\n@-webkit-keyframes sk-scaleout {\r\n  0% { -webkit-transform: scale(0) }\r\n  100% {\r\n    -webkit-transform: scale(1.0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes sk-scaleout {\r\n  0% { \r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n  } 100% {\r\n    -webkit-transform: scale(1.0);\r\n    transform: scale(1.0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n\r\n/* spinner-dots */\r\n\r\n.spinner-dots {\r\n  margin: 100px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n  text-align: center;\r\n  \r\n  -webkit-animation: sk-rotate 2.0s infinite linear;\r\n  animation: sk-rotate 2.0s infinite linear;\r\n}\r\n\r\n.dot1, .dot2 {\r\n  width: 60%;\r\n  height: 60%;\r\n  display: inline-block;\r\n  position: absolute;\r\n  top: 0;\r\n  background-color: #fff;\r\n  border-radius: 100%;\r\n  \r\n  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\r\n  animation: sk-bounce 2.0s infinite ease-in-out;\r\n}\r\n\r\n.dot2 {\r\n  top: auto;\r\n  bottom: 0;\r\n  -webkit-animation-delay: -1.0s;\r\n  animation-delay: -1.0s;\r\n}\r\n\r\n@-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}\r\n@keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}\r\n\r\n@-webkit-keyframes sk-bounce {\r\n  0%, 100% { -webkit-transform: scale(0.0) }\r\n  50% { -webkit-transform: scale(1.0) }\r\n}\r\n\r\n@keyframes sk-bounce {\r\n  0%, 100% { \r\n    transform: scale(0.0);\r\n    -webkit-transform: scale(0.0);\r\n  } 50% { \r\n    transform: scale(1.0);\r\n    -webkit-transform: scale(1.0);\r\n  }\r\n}\r\n\r\n\r\n/* spinner-bounce */\r\n\r\n.spinner-bounce {\r\n  margin: 100px auto 0;\r\n  width: 70px;\r\n  text-align: center;\r\n}\r\n\r\n.spinner-bounce > div {\r\n  width: 18px;\r\n  height: 18px;\r\n  background-color: #fff;\r\n\r\n  border-radius: 100%;\r\n  display: inline-block;\r\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\r\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\r\n}\r\n\r\n.spinner-bounce .bounce1 {\r\n  -webkit-animation-delay: -0.32s;\r\n  animation-delay: -0.32s;\r\n}\r\n\r\n.spinner-bounce .bounce2 {\r\n  -webkit-animation-delay: -0.16s;\r\n  animation-delay: -0.16s;\r\n}\r\n\r\n@-webkit-keyframes sk-bouncedelay {\r\n  0%, 80%, 100% { -webkit-transform: scale(0) }\r\n  40% { -webkit-transform: scale(1.0) }\r\n}\r\n\r\n@keyframes sk-bouncedelay {\r\n  0%, 80%, 100% { \r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n  } 40% { \r\n    -webkit-transform: scale(1.0);\r\n    transform: scale(1.0);\r\n  }\r\n}\r\n\r\n/* spinner-fading-circle */\r\n\r\n.sk-fading-circle {\r\n  margin: 100px auto;\r\n  width: 40px;\r\n  height: 40px;\r\n  position: relative;\r\n}\r\n\r\n.sk-fading-circle .sk-circle {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n\r\n.sk-fading-circle .sk-circle:before {\r\n  content: '';\r\n  display: block;\r\n  margin: 0 auto;\r\n  width: 15%;\r\n  height: 15%;\r\n  background-color: #fff;\r\n  border-radius: 100%;\r\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\r\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\r\n}\r\n.sk-fading-circle .sk-circle2 {\r\n  -webkit-transform: rotate(30deg);\r\n      -ms-transform: rotate(30deg);\r\n          transform: rotate(30deg);\r\n}\r\n.sk-fading-circle .sk-circle3 {\r\n  -webkit-transform: rotate(60deg);\r\n      -ms-transform: rotate(60deg);\r\n          transform: rotate(60deg);\r\n}\r\n.sk-fading-circle .sk-circle4 {\r\n  -webkit-transform: rotate(90deg);\r\n      -ms-transform: rotate(90deg);\r\n          transform: rotate(90deg);\r\n}\r\n.sk-fading-circle .sk-circle5 {\r\n  -webkit-transform: rotate(120deg);\r\n      -ms-transform: rotate(120deg);\r\n          transform: rotate(120deg);\r\n}\r\n.sk-fading-circle .sk-circle6 {\r\n  -webkit-transform: rotate(150deg);\r\n      -ms-transform: rotate(150deg);\r\n          transform: rotate(150deg);\r\n}\r\n.sk-fading-circle .sk-circle7 {\r\n  -webkit-transform: rotate(180deg);\r\n      -ms-transform: rotate(180deg);\r\n          transform: rotate(180deg);\r\n}\r\n.sk-fading-circle .sk-circle8 {\r\n  -webkit-transform: rotate(210deg);\r\n      -ms-transform: rotate(210deg);\r\n          transform: rotate(210deg);\r\n}\r\n.sk-fading-circle .sk-circle9 {\r\n  -webkit-transform: rotate(240deg);\r\n      -ms-transform: rotate(240deg);\r\n          transform: rotate(240deg);\r\n}\r\n.sk-fading-circle .sk-circle10 {\r\n  -webkit-transform: rotate(270deg);\r\n      -ms-transform: rotate(270deg);\r\n          transform: rotate(270deg);\r\n}\r\n.sk-fading-circle .sk-circle11 {\r\n  -webkit-transform: rotate(300deg);\r\n      -ms-transform: rotate(300deg);\r\n          transform: rotate(300deg); \r\n}\r\n.sk-fading-circle .sk-circle12 {\r\n  -webkit-transform: rotate(330deg);\r\n      -ms-transform: rotate(330deg);\r\n          transform: rotate(330deg); \r\n}\r\n.sk-fading-circle .sk-circle2:before {\r\n  -webkit-animation-delay: -1.1s;\r\n          animation-delay: -1.1s; \r\n}\r\n.sk-fading-circle .sk-circle3:before {\r\n  -webkit-animation-delay: -1s;\r\n          animation-delay: -1s; \r\n}\r\n.sk-fading-circle .sk-circle4:before {\r\n  -webkit-animation-delay: -0.9s;\r\n          animation-delay: -0.9s; \r\n}\r\n.sk-fading-circle .sk-circle5:before {\r\n  -webkit-animation-delay: -0.8s;\r\n          animation-delay: -0.8s; \r\n}\r\n.sk-fading-circle .sk-circle6:before {\r\n  -webkit-animation-delay: -0.7s;\r\n          animation-delay: -0.7s; \r\n}\r\n.sk-fading-circle .sk-circle7:before {\r\n  -webkit-animation-delay: -0.6s;\r\n          animation-delay: -0.6s; \r\n}\r\n.sk-fading-circle .sk-circle8:before {\r\n  -webkit-animation-delay: -0.5s;\r\n          animation-delay: -0.5s; \r\n}\r\n.sk-fading-circle .sk-circle9:before {\r\n  -webkit-animation-delay: -0.4s;\r\n          animation-delay: -0.4s;\r\n}\r\n.sk-fading-circle .sk-circle10:before {\r\n  -webkit-animation-delay: -0.3s;\r\n          animation-delay: -0.3s;\r\n}\r\n.sk-fading-circle .sk-circle11:before {\r\n  -webkit-animation-delay: -0.2s;\r\n          animation-delay: -0.2s;\r\n}\r\n.sk-fading-circle .sk-circle12:before {\r\n  -webkit-animation-delay: -0.1s;\r\n          animation-delay: -0.1s;\r\n}\r\n\r\n@-webkit-keyframes sk-circleFadeDelay {\r\n  0%, 39%, 100% { opacity: 0; }\r\n  40% { opacity: 1; }\r\n}\r\n\r\n@keyframes sk-circleFadeDelay {\r\n  0%, 39%, 100% { opacity: 0; }\r\n  40% { opacity: 1; } \r\n}"; });
define('text!components/data/data.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        <label>Search for GIFs</label>\r\n        <input type=\"text\" value.bind=\"searchText\" />\r\n        <button click.delegate=\"notifySearch()\" >Search</button>\r\n    </div>\r\n    <div repeat.for=\"image of images\">\r\n        <img src.bind=\"image.url\" />\r\n        <label>${image.caption}</label>\r\n    </div>\r\n</template>"; });
define('text!components/form/form.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        <h2>Form</h2>\r\n\r\n        <require from=\"../spinner/spinner\"></require>\r\n        <iv-spinner spinner-type=\"spinner-cubes\" is-running.bind=\"actionState === 1\"></iv-spinner>\r\n\r\n        <div class=\"col-md-3\" if.bind=\"actionState !== 1\">\r\n            <div class=\"panel\">\r\n                ${loginErrorMessage}\r\n            </div>\r\n            <form>\r\n                <div class=\"form-group\">\r\n                    <label for=\"user\">User name</label>\r\n                    <input type=\"text\" id=\"user\" name=\"user\" class=\"form-control\" placeholder=\"Username\" value.bind=\"userName & validate\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"pass\">Password</label>\r\n                    <input type=\"password\" class=\"form-control\" id=\"pass\" name=\"pass\" placeholder=\"Password\" value.bind=\"password & validate\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"address\">Address</label>\r\n                    <textarea class=\"form-control\" id=\"address\" name=\"address\" placeholder=\"Address\" value.bind=\"address & validate\"></textarea>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"state\">State</label>\r\n                    <select id=\"state\" name=\"state\">\r\n                        <option repeat.for=\"s of states\" value.bind=\"state\">${s}</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"isCitizen\">Citizen?</label>\r\n                    <input type=\"checkbox\" class=\"form-control\" id=\"isCitizen\" name=\"isCitizen\" placeholder=\"Citizen?\" checked.bind=\"isCitizen & validate\">\r\n                </div>\r\n                <hr />\r\n                <input type=\"submit\" name=\"submit\" class=\"btn btn-info\" value=\"Login\" click.delegate=\"submit()\">\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!components/hello/hello.html', ['module'], function(module) { module.exports = "<template> \r\n  <label>Hi Everyone, this is Aurelia</label>\r\n  <input value.bind=\"firstName\"> \r\n  <input value.bind=\"lastName\"> \r\n  <button click.trigger=\"sayHello()\">Say Hello</button> \r\n</template>\r\n"; });
define('text!components/spinner/spinner.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./spinner.css\"></require>\r\n    <div if.bind=\"spinnerType==='spinner-circles'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner\">\r\n            <div class=\"double-bounce1\"></div>\r\n            <div class=\"double-bounce2\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-folding-cube'\">\r\n        <div if.bind=\"isRunning\" class=\"sk-folding-cube\">\r\n            <div class=\"sk-cube1 sk-cube\"></div>\r\n            <div class=\"sk-cube2 sk-cube\"></div>\r\n            <div class=\"sk-cube4 sk-cube\"></div>\r\n            <div class=\"sk-cube3 sk-cube\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-cube-grid'\">\r\n        <div if.bind=\"isRunning\" class=\"sk-cube-grid\">\r\n            <div class=\"sk-cube sk-cube1\"></div>\r\n            <div class=\"sk-cube sk-cube2\"></div>\r\n            <div class=\"sk-cube sk-cube3\"></div>\r\n            <div class=\"sk-cube sk-cube4\"></div>\r\n            <div class=\"sk-cube sk-cube5\"></div>\r\n            <div class=\"sk-cube sk-cube6\"></div>\r\n            <div class=\"sk-cube sk-cube7\"></div>\r\n            <div class=\"sk-cube sk-cube8\"></div>\r\n            <div class=\"sk-cube sk-cube9\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-circle'\">\r\n        <div if.bind=\"isRunning\" class=\"sk-circle\">\r\n            <div class=\"sk-circle1 sk-child\"></div>\r\n            <div class=\"sk-circle2 sk-child\"></div>\r\n            <div class=\"sk-circle3 sk-child\"></div>\r\n            <div class=\"sk-circle4 sk-child\"></div>\r\n            <div class=\"sk-circle5 sk-child\"></div>\r\n            <div class=\"sk-circle6 sk-child\"></div>\r\n            <div class=\"sk-circle7 sk-child\"></div>\r\n            <div class=\"sk-circle8 sk-child\"></div>\r\n            <div class=\"sk-circle9 sk-child\"></div>\r\n            <div class=\"sk-circle10 sk-child\"></div>\r\n            <div class=\"sk-circle11 sk-child\"></div>\r\n            <div class=\"sk-circle12 sk-child\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-rects'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner-rects\">\r\n            <div class=\"rect1\"></div>\r\n            <div class=\"rect2\"></div>\r\n            <div class=\"rect3\"></div>\r\n            <div class=\"rect4\"></div>\r\n            <div class=\"rect5\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-cubes'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner-cubes\">\r\n            <div class=\"cube1\"></div>\r\n            <div class=\"cube2\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-scaleout'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner-scaleout\"></div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-dots'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner-dots\">\r\n            <div class=\"dot1\"></div>\r\n            <div class=\"dot2\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-bounce'\">\r\n        <div if.bind=\"isRunning\" class=\"spinner-bounce\">\r\n            <div class=\"bounce1\"></div>\r\n            <div class=\"bounce2\"></div>\r\n            <div class=\"bounce3\"></div>\r\n        </div>\r\n    </div>\r\n    <div if.bind=\"spinnerType==='spinner-fading-circle'\">\r\n        <div if.bind=\"isRunning\" class=\"sk-fading-circle\">\r\n            <div class=\"sk-circle1 sk-circle\"></div>\r\n            <div class=\"sk-circle2 sk-circle\"></div>\r\n            <div class=\"sk-circle3 sk-circle\"></div>\r\n            <div class=\"sk-circle4 sk-circle\"></div>\r\n            <div class=\"sk-circle5 sk-circle\"></div>\r\n            <div class=\"sk-circle6 sk-circle\"></div>\r\n            <div class=\"sk-circle7 sk-circle\"></div>\r\n            <div class=\"sk-circle8 sk-circle\"></div>\r\n            <div class=\"sk-circle9 sk-circle\"></div>\r\n            <div class=\"sk-circle10 sk-circle\"></div>\r\n            <div class=\"sk-circle11 sk-circle\"></div>\r\n            <div class=\"sk-circle12 sk-circle\"></div>\r\n        </div>\r\n    </div>\r\n</template>\r\n"; });
define('text!views/data-view/data-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"../../components/data/data\"></require>\r\n    <data images.bind=\"images\" search.call=\"searchGifs($event)\"></data>\r\n</template>"; });
define('text!views/form-view/form-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"../../components/form/form\"></require>\r\n    <d-form></d-form>\r\n</template>"; });
define('text!views/hello-view/hello-view.html', ['module'], function(module) { module.exports = "<template>\r\n  <h2>${message}</h2>\r\n\r\n  <require from=\"../../components/hello/hello\"></require> \r\n  <say-hello></say-hello>\r\n\r\n</template>"; });
define('text!views/home-view/home-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <h2>Home</h2>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map