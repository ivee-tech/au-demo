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
        aurelia_framework_1.customElement('say-hello')
    ], Hello);
    exports.Hello = Hello;
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n\n  <nav>\n    <ul>\n      <li repeat.for=\"row of router.navigation\">\n        <a href.bind=\"row.href\">${row.title}</a>\n      </li>\n    <ul>\n  </nav>\n\n  <router-view></router-view>\n</template>\n"; });
define('text!hello/hello.html', ['module'], function(module) { module.exports = "<template> \r\n  <input value.bind=\"firstName\"> \r\n  <input value.bind=\"lastName\"> \r\n  <button click.trigger=\"sayHello()\">Say Hello</button> \r\n</template>\r\n"; });
define('text!views/hello-view/hello-view.html', ['module'], function(module) { module.exports = "<template>\r\n  <h2>${message}</h2>\r\n\r\n  <require from=\"../../hello/hello\"></require> \r\n  <say-hello></say-hello>\r\n\r\n</template>"; });
define('text!views/home-view/home-view.html', ['module'], function(module) { module.exports = "<template>\r\n    <h2>Home</h2>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map