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
            .plugin('aurelia-router');
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('data/data',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
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
            var url = "http://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=dc6zaTOxFJmzC&limit=1&offset=0";
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
define('hello/hello',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
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
                    _this.images.push({ caption: d.caption, url: d.images.original.url });
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n\n  <nav>\n    <ul>\n      <li repeat.for=\"row of router.navigation\">\n        <a href.bind=\"row.href\">${row.title}</a>\n      </li>\n    <ul>\n  </nav>\n\n  <router-view></router-view>\n</template>\n"; });
define('text!data/data.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        <label>Search for GIFs</label>\r\n        <input type=\"text\" value.bind=\"searchText\" />\r\n        <button click.delegate=\"notifySearch()\" >Search</button>\r\n    </div>\r\n    <div repeat.for=\"image of images\">\r\n        <img src.bind=\"image.url\" />\r\n    </div>\r\n</template>"; });
define('text!hello/hello.html', ['module'], function(module) { module.exports = "<template> \r\n  <input value.bind=\"firstName\"> \r\n  <input value.bind=\"lastName\"> \r\n  <button click.trigger=\"sayHello()\">Say Hello</button> \r\n</template>\r\n"; });
define('text!views/data-view/data-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"../../data/data\"></require>\r\n    <data images.bind=\"images\" search.call=\"searchGifs($event)\"></data>\r\n</template>"; });
define('text!views/hello-view/hello-view.html', ['module'], function(module) { module.exports = "<template>\r\n  <h2>${message}</h2>\r\n\r\n  <require from=\"../../hello/hello\"></require> \r\n  <say-hello></say-hello>\r\n\r\n</template>"; });
define('text!views/home-view/home-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <h2>Home</h2>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map