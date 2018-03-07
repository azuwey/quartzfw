"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = require("../misc");
function GatewayDecorator(baseEndpoint) {
    if (baseEndpoint === void 0) { baseEndpoint = ''; }
    return function (constructor) {
        var timer = setInterval(function () {
            var expressApp = Reflect
                .getMetadata(misc_1.APPLICATION_KEY, constructor);
            expressApp && (function () {
                clearInterval(timer);
                var wssed = Reflect
                    .getMetadata(misc_1.SOCKET_SERVER_KEY, constructor);
                var events = Reflect.getMetadata(misc_1.INCOME_SOCKET_KEY, constructor);
                var _class = new constructor;
                events.forEach(function (event) { return wssed.add(event.endpoint, event.callback.bind(_class)); });
            })();
        }, 0);
    };
}
exports.GatewayDecorator = GatewayDecorator;
//# sourceMappingURL=gateway.decorator.js.map