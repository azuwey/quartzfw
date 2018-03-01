"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var misc_1 = require("../misc");
function ControllerDecorator(baseEndpoint) {
    if (baseEndpoint === void 0) { baseEndpoint = ''; }
    return function (constructor) {
        var timer = setInterval(function () {
            var expressApp = Reflect
                .getMetadata(misc_1.APPLICATION_KEY, constructor);
            (expressApp) && (function () {
                clearInterval(timer);
                var events = [];
                Object.keys(misc_1.METHODS_KEYS).forEach(function (key) {
                    events.push.apply(events, Reflect.getMetadata(misc_1.METHODS_KEYS[key], constructor));
                });
                var baseUrl = (baseEndpoint === '' || baseEndpoint === '/')
                    ? '' : "/" + baseEndpoint;
                var _class = new constructor;
                events && events.forEach(function (event) { return event.method.toUpperCase() === 'PARAM'
                    ? expressApp[event.method.toLowerCase()](event.endpoint, event.callback.bind(_class))
                    : expressApp[event.method.toLowerCase()]("" + baseUrl + event.endpoint, event.callback.bind(_class)); });
            })();
        }, 0);
    };
}
exports.ControllerDecorator = ControllerDecorator;
//# sourceMappingURL=controller.decorator.js.map