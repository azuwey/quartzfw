"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var misc_1 = require("../misc");
function ModuleDecorator(config) {
    return function (constructor) {
        setTimeout(function () {
            var metaData = Reflect.getMetadata(misc_1.APPLICATION_KEY, constructor);
            config.controllers && config.controllers.forEach(function (target) {
                return Reflect.defineMetadata(misc_1.APPLICATION_KEY, metaData, target);
            });
            config.gateways && (function () {
                var http = Reflect.getMetadata(misc_1.HTTP_KEY, constructor);
                var https = Reflect.getMetadata(misc_1.HTTPS_KEY, constructor);
                misc_1.SOCKET_SERVER_KEY;
                var wssed = https
                    ? misc_1.WsServerEventDispatcher.GetInstance(https)
                    : misc_1.WsServerEventDispatcher.GetInstance(http);
                config.gateways.forEach(function (target) {
                    Reflect.defineMetadata(misc_1.SOCKET_SERVER_KEY, wssed, target);
                    Reflect.defineMetadata(misc_1.APPLICATION_KEY, metaData, target);
                });
            })();
            new constructor;
        }, 0);
    };
}
exports.ModuleDecorator = ModuleDecorator;
//# sourceMappingURL=module.decorator.js.map